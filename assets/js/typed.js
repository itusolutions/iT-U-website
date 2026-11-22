(function () {
  const DEFAULT_STRINGS = [
    "Computer Repairs · Polokwane",
    "Hardware Upgrades & Diagnostics",
    "Software & OS Installation",
    "Responsive Website Development"
  ];

  function prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function isElementVisible(el) {
    if (!el || !el.isConnected) return false;
    const style = window.getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden") return false;
    const rect = el.getBoundingClientRect();
    return rect.width > 0 || el.offsetParent !== null;
  }

  function parseStrings(el) {
    const raw = el.getAttribute("data-typed-strings");
    if (!raw) return DEFAULT_STRINGS.slice();

    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(String);
      }
    } catch (e) {
      const split = raw.split("|").map((s) => s.trim()).filter(Boolean);
      if (split.length > 0) return split;
    }

    return DEFAULT_STRINGS.slice();
  }

  function destroyExistingTyped(el) {
    if (el._typedInstance && typeof el._typedInstance.destroy === "function") {
      el._typedInstance.destroy();
      el._typedInstance = null;
    }
    el.dataset.typedInitialized = "false";
  }

  function mountTyped(el) {
    if (!el || el.dataset.typedInitialized === "true") return;

    const strings = parseStrings(el);

    if (prefersReducedMotion()) {
      el.dataset.typedInitialized = "true";
      el.textContent = strings[0] || "";
      return;
    }

    if (!isElementVisible(el)) {
      return;
    }

    if (typeof window.Typed === "function") {
      destroyExistingTyped(el);
      el.dataset.typedInitialized = "true";
      el.textContent = "";

      el._typedInstance = new window.Typed(el, {
        strings: strings,
        typeSpeed: Number(el.getAttribute("data-type-speed")) || 45,
        backSpeed: Number(el.getAttribute("data-back-speed")) || 25,
        backDelay: Number(el.getAttribute("data-back-delay")) || 1800,
        startDelay: Number(el.getAttribute("data-start-delay")) || 200,
        loop: el.getAttribute("data-loop") !== "false",
        smartBackspace: true
      });
    } else {
      el.textContent = strings[0] || "";
    }
  }

  function collectTargets() {
    const targets = new Set();
    document.querySelectorAll("#hero-typed, [data-typed]").forEach((el) => {
      targets.add(el);
    });
    return Array.from(targets);
  }

  function initTyped() {
    const targets = collectTargets();
    targets.forEach(mountTyped);
  }

  // Re-check on resize/orientation change (mobile <-> tablet <-> desktop)
  let resizeTimer = null;
  window.addEventListener("resize", function () {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(function () {
      collectTargets().forEach((el) => {
        if (el.dataset.typedInitialized !== "true") {
          mountTyped(el);
        }
      });
    }, 150);
  });

  // Retry briefly if Typed.js CDN finishes loading after this script
  let attempts = 0;
  const retryInterval = window.setInterval(function () {
    attempts += 1;
    const unmounted = collectTargets().filter(
      (el) => el.dataset.typedInitialized !== "true" && isElementVisible(el)
    );
    if (typeof window.Typed === "function" && unmounted.length > 0) {
      unmounted.forEach(mountTyped);
    }
    if (attempts >= 20 || (typeof window.Typed === "function" && unmounted.length === 0)) {
      window.clearInterval(retryInterval);
    }
  }, 250);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTyped);
  } else {
    initTyped();
  }

  window.addEventListener("load", initTyped);
})();
