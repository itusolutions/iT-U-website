// Reserved for this feature; implement and test before enabling.
(function () {
  const SCROLL_THRESHOLD = 320;

  function createDefaultButton() {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = "back-to-top";
    btn.setAttribute("data-back-to-top", "");
    btn.setAttribute("aria-label", "Back to top");
    btn.className =
      "no-print fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 translate-y-4 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-800 opacity-0 shadow-lg transition duration-200 hover:border-blue-500 hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300/50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-blue-500 dark:hover:bg-blue-600 dark:hover:text-white pointer-events-none";
    btn.innerHTML = '<i class="fa-solid fa-arrow-up text-sm" aria-hidden="true"></i>';
    document.body.appendChild(btn);
    return btn;
  }

  function initBackToTop() {
    const existing = document.querySelector("[data-back-to-top], #back-to-top");
    const button = existing || createDefaultButton();
    const prefersReducedMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let ticking = false;

    function updateVisibility() {
      const shouldShow = window.scrollY > SCROLL_THRESHOLD;
      button.classList.toggle("opacity-0", !shouldShow);
      button.classList.toggle("translate-y-4", !shouldShow);
      button.classList.toggle("pointer-events-none", !shouldShow);
      button.classList.toggle("opacity-100", shouldShow);
      button.classList.toggle("translate-y-0", shouldShow);
      button.classList.toggle("pointer-events-auto", shouldShow);
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateVisibility);
        ticking = true;
      }
    }

    button.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth"
      });
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    updateVisibility();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBackToTop);
  } else {
    initBackToTop();
  }
})();
