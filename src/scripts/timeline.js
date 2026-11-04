/* Timeline layout: runs on wide screens. Narrow screens keep the plain list from CSS.
   Cards go on whichever side moves them least from their true date. Each period is a bar
   beside the axis, overlapping periods take separate lanes, and a line joins each start
   point to its card. */
var root = document.querySelector("[data-timeline]");

if (root) {
  var svg = root.querySelector(".tl-svg");
  var items = Array.prototype.slice.call(root.querySelectorAll(".tl-item"));
  var wide = window.matchMedia("(min-width: 861px)");
  var first = Number(root.dataset.first);
  var last = Number(root.dataset.last);

  /* Height of each year. The axis is labelled, so busy years can simply get more room. */
  var yearHeight = function (year) {
    if (year < 2021) return 64;
    return year < 2025 ? 200 : 96;
  };
  var TOP = 28;
  var CARD_GAP = 112; /* axis centre to card edge */
  var CARD_PAD = 14; /* between cards on one side */
  var LANE_START = 34; /* axis centre to first bar */
  var LANE_STEP = 11;
  var ANIMATE_MS = 480;

  var now = new Date();
  var nowIso = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0");
  var toY = function (iso) {
    var parts = iso.split("-").map(Number);
    var y = TOP;
    for (var year = first; year < parts[0]; year++) y += yearHeight(year);
    return y + ((parts[1] - 1) / 12) * yearHeight(parts[0]);
  };

  var placed = [];
  var raf = 0;
  var settleTimer = 0;

  var layout = function () {
    if (!wide.matches) {
      root.classList.remove("tl-on");
      root.style.height = "";
      svg.innerHTML = "";
      items.forEach(function (el) { el.style.width = ""; el.style.transform = ""; });
      return;
    }
    root.classList.add("tl-on");

    var width = root.clientWidth;
    var axis = width / 2;
    var cardWidth = Math.min(380, axis - CARD_GAP);
    var bottoms = { left: 0, right: 0 };
    var lanes = { left: [], right: [] };

    placed = items.filter(function (el) { return !el.hidden; }).map(function (el) {
      el.style.width = cardWidth + "px";
      var start = toY(el.dataset.start);
      var hasRange = el.dataset.end || el.dataset.type !== "award";
      var end = hasRange ? toY(el.dataset.end || nowIso) : start;
      var height = el.offsetHeight;

      var leftY = Math.max(start, bottoms.left + CARD_PAD);
      var rightY = Math.max(start, bottoms.right + CARD_PAD);
      var side = leftY <= rightY ? "left" : "right";
      var y = side === "left" ? leftY : rightY;
      bottoms[side] = y + height;

      var lane = 0;
      if (end > start) {
        while (lanes[side][lane] !== undefined && lanes[side][lane] > start) lane++;
        lanes[side][lane] = end;
      }
      var sign = side === "left" ? -1 : 1;
      el.style.transform = "translate(" + (side === "left" ? axis - CARD_GAP - cardWidth : axis + CARD_GAP) + "px," + y + "px)";

      return {
        el: el,
        side: side,
        start: start,
        end: end,
        x: end > start ? axis + sign * (LANE_START + lane * LANE_STEP) : axis,
        edge: side === "left" ? axis - CARD_GAP : axis + CARD_GAP,
        cardY: y,
      };
    });

    var height = Math.max(toY(last + "-01"), bottoms.left, bottoms.right) + 40;
    root.style.height = height + "px";
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    drawStatic(axis);
    follow();
    root.classList.add("tl-ready");
  };

  var staticMarkup = "";
  var drawStatic = function (axis) {
    var out = "";
    var axisEnd = toY(last + "-01");
    var nowY = toY(nowIso);
    out += '<line class="tl-axis" x1="' + axis + '" x2="' + axis + '" y1="' + TOP + '" y2="' + nowY + '"/>';
    out += '<line class="tl-axis future" x1="' + axis + '" x2="' + axis + '" y1="' + nowY + '" y2="' + axisEnd + '"/>';
    for (var year = first; year <= last; year++) {
      var y = toY(year + "-01");
      out += '<rect class="tl-year-bg" x="' + (axis - 24) + '" y="' + (y - 10) + '" width="48" height="20"/>';
      out += '<text class="tl-year" x="' + axis + '" y="' + (y + 4) + '">' + year + "</text>";
    }
    placed.forEach(function (p) {
      if (p.end > p.start) {
        var cls = "tl-bar " + p.el.dataset.type + (p.el.classList.contains("human") ? " human" : "");
        out += '<line class="' + cls + '" x1="' + p.x + '" x2="' + p.x + '" y1="' + p.start + '" y2="' + p.end + '"/>';
        out += '<line class="' + cls + ' cap" x1="' + (p.x - 4) + '" x2="' + (p.x + 4) + '" y1="' + p.end + '" y2="' + p.end + '"/>';
      }
    });
    staticMarkup = out;
  };

  /* While cards slide the lines read their live position; the last draw uses the final one. */
  var drawLinks = function (settled) {
    var box = root.getBoundingClientRect();
    var out = staticMarkup;
    placed.forEach(function (p) {
      var card = p.el.getBoundingClientRect();
      var edge = settled ? p.edge : (p.side === "left" ? card.right : card.left) - box.left;
      var y = (settled ? p.cardY : card.top - box.top) + 20;
      var bend = (edge - p.x) * 0.5;
      out += '<path class="tl-link ' + p.el.dataset.type + '" d="M' + p.x + "," + p.start + " C" + (p.x + bend) + "," + p.start + " " + (edge - bend) + "," + y + " " + edge + "," + y + '"/>';
      out += '<circle class="tl-node ' + p.el.dataset.type + (p.el.classList.contains("human") ? " human" : "") + '" cx="' + p.x + '" cy="' + p.start + '" r="5"/>';
    });
    svg.innerHTML = out;
  };

  /* Lines track the cards while they slide into place. */
  var follow = function () {
    cancelAnimationFrame(raf);
    clearTimeout(settleTimer);
    var frame = function () {
      drawLinks(false);
      raf = requestAnimationFrame(frame);
    };
    if (root.classList.contains("tl-ready")) raf = requestAnimationFrame(frame);
    settleTimer = setTimeout(function () {
      cancelAnimationFrame(raf);
      drawLinks(true);
    }, root.classList.contains("tl-ready") ? ANIMATE_MS : 0);
  };

  root.closest("[data-filter-scope]").addEventListener("filterchange", layout);
  wide.addEventListener("change", layout);
  var resizeTimer = 0;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(layout, 100);
  }, { passive: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
  layout();
}
