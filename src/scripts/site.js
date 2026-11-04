/* Site behaviour. Every page works without this file; it only adds motion and filters. */
(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Theme toggle */
  var themeBtn = document.querySelector("[data-theme-toggle]");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var current = root.getAttribute("data-theme");
      if (!current) current = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      var next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  /* Mobile menu */
  var navToggle = document.querySelector("[data-nav-toggle]");
  var navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }

  /* Scroll reveal */
  var revealed = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    revealed.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealed.forEach(function (el) { el.classList.add("in"); });
  }

  /* "Now" marker on the career chart */
  var spanRows = document.querySelector("[data-now]");
  if (spanRows) {
    var today = new Date();
    var nowPct = (today.getFullYear() + today.getMonth() / 12 - Number(spanRows.dataset.now)) / Number(spanRows.dataset.nowYears) * 100;
    var nowLine = document.createElement("div");
    nowLine.className = "span-now";
    nowLine.style.left = nowPct.toFixed(2) + "%";
    spanRows.appendChild(nowLine);
  }

  /* Hero porthole drifts toward the pointer */
  var porthole = document.querySelector(".porthole");
  if (porthole && !reduceMotion && window.matchMedia("(min-width: 901px) and (pointer: fine)").matches) {
    document.querySelector(".hero").addEventListener("pointermove", function (e) {
      var x = (e.clientX / window.innerWidth - 0.5) * -22;
      var y = (e.clientY / window.innerHeight - 0.5) * -22;
      porthole.style.setProperty("--px", x.toFixed(1) + "px");
      porthole.style.setProperty("--py", y.toFixed(1) + "px");
    });
  }

  /* Mission image parallax */
  var band = document.querySelector(".mission-band");
  if (band && !reduceMotion) {
    var bandImg = band.querySelector("img");
    var ticking = false;
    var updateBand = function () {
      var rect = band.getBoundingClientRect();
      /* the image is scaled 1.08, so it can shift 4% of its height before an edge shows */
      var limit = rect.height * 0.035;
      var shift = Math.max(-limit, Math.min(limit, rect.top * -0.06));
      bandImg.style.setProperty("--scroll", shift.toFixed(1) + "px");
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(updateBand); }
    }, { passive: true });
    updateBand();
  }

  /* Contents highlight */
  var tocLinks = document.querySelectorAll(".toc a");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var byId = {};
    tocLinks.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var tocObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          tocLinks.forEach(function (a) { a.classList.remove("active"); });
          byId[entry.target.id].classList.add("active");
        }
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) tocObserver.observe(section);
    });
  }

  /* Lightbox for figures */
  var lightbox = document.createElement("dialog");
  lightbox.className = "lightbox";
  lightbox.innerHTML =
    '<div class="lightbox-bar"><p></p><button class="icon-btn" type="button" aria-label="Close">' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 5l14 14M19 5L5 19"/></svg></button></div><img alt="">';
  document.body.appendChild(lightbox);
  lightbox.querySelector("button").addEventListener("click", function () { lightbox.close(); });
  lightbox.addEventListener("click", function (e) { if (e.target === lightbox) lightbox.close(); });

  document.addEventListener("click", function (e) {
    var link = e.target.closest ? e.target.closest("a.plate-frame") : null;
    if (!link || typeof lightbox.showModal !== "function") return;
    e.preventDefault();
    var img = link.querySelector("img");
    var lbImg = lightbox.querySelector("img");
    lbImg.src = link.href;
    lbImg.alt = img.alt;
    var caption = link.parentNode.querySelector("figcaption");
    lightbox.querySelector("p").textContent = caption ? caption.textContent : img.alt;
    lightbox.showModal();
  });

  /* Filters (Publications, Research, Timeline). Each chip group matches the data
     attribute of the same name on the items, and the choice is kept in the URL. */
  var filterScope = document.querySelector("[data-filter-scope]");
  if (filterScope) {
    var filterChips = Array.prototype.slice.call(filterScope.querySelectorAll(".chip"));
    var filterItems = filterScope.querySelectorAll("[data-filter-item]");
    var filterSections = filterScope.querySelectorAll("[data-filter-section]");
    var filterEmpty = filterScope.querySelector("[data-filter-empty]");
    var filterState = {};
    var params = new URLSearchParams(location.search);

    var applyFilters = function () {
      filterChips.forEach(function (c) {
        c.setAttribute("aria-pressed", String(filterState[c.dataset.group] === c.dataset.value));
      });
      var shown = 0;
      filterItems.forEach(function (item) {
        item.hidden = !Object.keys(filterState).every(function (group) {
          return filterState[group] === "all" || (item.dataset[group] || "").split(" ").indexOf(filterState[group]) !== -1;
        });
        if (!item.hidden) { shown++; item.classList.add("in"); }
      });
      filterSections.forEach(function (section) {
        section.hidden = !section.querySelector("[data-filter-item]:not([hidden])");
      });
      if (filterEmpty) filterEmpty.hidden = shown > 0;
      filterScope.dispatchEvent(new CustomEvent("filterchange"));
    };

    filterChips.forEach(function (c) {
      var wanted = params.get(c.dataset.group);
      if (!(c.dataset.group in filterState)) filterState[c.dataset.group] = "all";
      if (wanted === c.dataset.value) filterState[c.dataset.group] = wanted;
    });

    filterScope.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;
      filterState[chip.dataset.group] = chip.dataset.value;
      var query = new URLSearchParams();
      Object.keys(filterState).forEach(function (group) {
        if (filterState[group] !== "all") query.set(group, filterState[group]);
      });
      var text = query.toString();
      history.replaceState(null, "", location.pathname + (text ? "?" + text : ""));
      applyFilters();
    });

    if (location.search) applyFilters();
  }

  /* Print button on the CV */
  var printBtn = document.querySelector("[data-print]");
  if (printBtn) printBtn.addEventListener("click", function () { window.print(); });

  /* Closed-loop explorer */
  var loop = document.querySelector(".loop");
  if (loop) {
    var nodes = Array.prototype.slice.call(loop.querySelectorAll(".stage-node"));
    var panels = Array.prototype.slice.call(loop.querySelectorAll("[data-stage-panel]"));
    var autoTimer = null;

    var select = function (index, focus) {
      nodes.forEach(function (node, i) {
        node.setAttribute("aria-selected", String(i === index));
        node.setAttribute("tabindex", i === index ? "0" : "-1");
      });
      panels.forEach(function (panel, i) { panel.hidden = i !== index; });
      if (focus) nodes[index].focus();
    };
    var stopAuto = function () { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } };

    nodes.forEach(function (node, i) {
      node.addEventListener("click", function () { stopAuto(); select(i); });
      node.addEventListener("keydown", function (e) {
        var step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (step) {
          e.preventDefault();
          stopAuto();
          select((i + step + nodes.length) % nodes.length, true);
        } else if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          stopAuto();
          select(i);
        }
      });
    });
    loop.querySelector("[data-stage-panels]").addEventListener("click", stopAuto);

    select(0);
    if (!reduceMotion && "IntersectionObserver" in window) {
      new IntersectionObserver(function (entries, observer) {
        if (entries[0].isIntersecting) {
          var current = 0;
          autoTimer = setInterval(function () {
            current = (current + 1) % nodes.length;
            select(current);
          }, 4500);
          observer.disconnect();
        }
      }, { threshold: 0.4 }).observe(loop);
    }
  }
})();
