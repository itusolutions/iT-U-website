(function () {
  function prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function initAOS() {
    if (typeof window.AOS === "undefined") return;
    window.AOS.init({
      once: true,
      duration: prefersReducedMotion() ? 0 : 600,
      disable: prefersReducedMotion()
    });
  }

  function initYearPlaceholders() {
    const year = String(new Date().getFullYear());
    document.querySelectorAll("[data-current-year]").forEach((el) => {
      el.textContent = year;
    });
  }

  function initExternalLinks() {
    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
      const currentRel = (link.getAttribute("rel") || "").split(/\s+/).filter(Boolean);
      if (!currentRel.includes("noopener")) currentRel.push("noopener");
      if (!currentRel.includes("noreferrer")) currentRel.push("noreferrer");
      link.setAttribute("rel", currentRel.join(" "));
    });
  }

  function initCopyButtons() {
    document.addEventListener("click", function (event) {
      const btn = event.target.closest("[data-copy]");
      if (!btn) return;

      const textToCopy = btn.getAttribute("data-copy") || "";
      if (!textToCopy) return;

      const originalHtml = btn.innerHTML;
      const showCopiedState = function () {
        btn.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i> <span>Copied</span>';
        window.setTimeout(function () {
          btn.innerHTML = originalHtml;
        }, 1800);
      };

      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        navigator.clipboard.writeText(textToCopy).then(showCopiedState).catch(function () {});
      } else {
        const helper = document.createElement("textarea");
        helper.value = textToCopy;
        helper.setAttribute("readonly", "");
        helper.style.position = "fixed";
        helper.style.opacity = "0";
        document.body.appendChild(helper);
        helper.select();
        try {
          document.execCommand("copy");
          showCopiedState();
        } catch (e) {}
        document.body.removeChild(helper);
      }
    });
  }

  function onReady() {
    initAOS();
    initYearPlaceholders();
    initExternalLinks();
    initCopyButtons();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady);
  } else {
    onReady();
  }
})();











/* ==========================================================================
   iTu Solutions - Scroll Reveal
   Replays entrance animations when scrolling down and up.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".itu-reveal");

  if (!revealElements.length) return;

  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    revealElements.forEach(element => {
      element.classList.add("is-visible");
    });
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          entry.target.classList.remove("is-visible");
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach(element => {
    observer.observe(element);
  });
});

