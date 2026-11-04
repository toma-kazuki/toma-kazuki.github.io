// Slide order, keyboard navigation, page counter, and fit-to-window scaling.
const SLIDES = [
  // Conference main deck (~12 min) — visual DNA from legacy 01–05; modules packed
  "c01-title.html",
  "c02-motivation.html",
  "c03-objective.html",
  "c04-architecture.html",
  "c05-framework.html",
  "c06-sandbox.html",
  "c07-studies.html",
  "c08-detection.html",
  "c09-diagnosis.html",
  "c10-recovery.html",
  "c11-synthesis.html",
  // Backup index, then legacy research slides (unchanged)
  "backup-index.html",
  "01-title.html",
  "02-introduction.html",
  "03-objective.html",
  "04-architecture.html",
  "04b-demonstration.html",
  "05-framework.html",
  "06-hera.html",
  "07-case-study-setup.html",
  "08-playout.html",
  "09-evaluation.html",
  "10-results-overall.html",
  "11-results-scenarios.html",
  "12-recovery-method.html",
  "13-recovery-playout.html",
  "14-recovery-ordering.html",
  "15-recovery-overall.html",
  "16-recovery-scenarios.html",
  "17-recovery-tree.html",
  "18-lstm-model.html",
  "19-lstm-cell.html",
  "20-lstm-windows.html",
  "21-lstm-norm.html",
  "22-lstm-training.html",
  "23-lstm-onset.html",
  "24-lstm-playout.html",
  "25-lstm-scenarios.html",
  "26-lstm-noise-mc.html",
  "27-lstm-reflection.html",
  "28-discussion.html",
  "29-conclusion.html",
  "30-references.html",
  "31-backup.html",
  "b1-confidence-gate.html",
  "b2-validation-plan.html",
  "b3-results-example.html",
  "b4-decision-tree.html",
  "b5-lstm-classifier-model.html",
  "b6-lstm-classifier-cell.html",
  "b7-lstm-classifier-windows.html",
  "b8-lstm-classifier-norm.html",
  "b9-lstm-classifier-training.html",
  "b10-lstm-classifier-onset.html",
  "b11-lstm-classifier-playout.html",
  "b12-lstm-classifier-scenarios.html",
  "b13-lstm-classifier-reflection.html",
];
// Slides from the backup divider on are numbered B1, B2, … instead of n / total.
const BACKUP_START = SLIDES.indexOf("backup-index.html");





(function () {
  // Pathname only (no query/hash). Detail pages live under detail/ so basename alone is enough.
  const file = decodeURIComponent((location.pathname.split("/").pop() || SLIDES[0]).split("?")[0]);
  const index = SLIDES.indexOf(file);

  function go(i) {
    if (i < 0 || i >= SLIDES.length) return;
    // Always resolve relative to the slides/ directory, not detail/.
    const base = location.pathname.includes("/detail/") ? "../" : "";
    location.href = base + SLIDES[i];
  }

  // Scenario-detail backup pages link to each other through data-* attributes on <body>.
  const DETAIL_KEYS = {
    ArrowRight: "next", PageDown: "next", " ": "next", Enter: "next",
    ArrowLeft: "prev", PageUp: "prev",
    ArrowDown: "down", ArrowUp: "up",
    Escape: "back", Backspace: "back", o: "back", Home: "back", End: "back",
  };
  function detailLink(name) {
    if (index >= 0 || !document.body) return undefined;
    const value = document.body.dataset[name];
    return value || undefined;
  }

  document.addEventListener("keydown", (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    // Don't steal typing in form controls (interactive tree, etc.).
    const tag = (event.target && event.target.tagName) || "";
    if (["INPUT", "SELECT", "TEXTAREA", "BUTTON"].includes(tag)) return;

    const target = detailLink(DETAIL_KEYS[event.key]);
    if (target) {
      location.href = target;
      event.preventDefault();
      return;
    }
    if (index < 0) return;
    if (["ArrowRight", "PageDown", " ", "Enter"].includes(event.key)) go(index + 1);
    else if (["ArrowLeft", "PageUp", "Backspace"].includes(event.key)) go(index - 1);
    else if (event.key === "Home") go(0);
    else if (event.key === "End") go(BACKUP_START - 1);
    else if (event.key === "o" || event.key === "Escape") {
      location.href = location.pathname.includes("/detail/") ? "../index.html" : "index.html";
    }
    else return;
    event.preventDefault();
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest("a")) return;
    const target = detailLink(event.clientX > window.innerWidth / 2 ? "next" : "prev");
    if (target) {
      location.href = target;
      return;
    }
    if (index < 0) return;
    go(event.clientX > window.innerWidth / 2 ? index + 1 : index - 1);
  });

  function fit() {
    const stage = document.querySelector(".stage");
    if (!stage) return;
    const scale = Math.min(window.innerWidth / 1280, window.innerHeight / 720) * 0.98;
    stage.style.transform = `translate(-50%, -50%) scale(${scale})`;
  }
  function setPage() {
    const page = document.querySelector("[data-page]");
    if (!page || index < 0) return;
    page.textContent = index >= BACKUP_START
      ? `B${index - BACKUP_START + 1}`
      : `${index + 1} / ${BACKUP_START}`;
  }

  window.addEventListener("resize", fit);
  document.addEventListener("DOMContentLoaded", () => { fit(); setPage(); });
  // Script may load after DOMContentLoaded (cache) or before body exists.
  if (document.readyState !== "loading") { fit(); setPage(); }
})();
