/* ==========================================================================
   iTu Solutions - Parallax Effects
   File: /assets/js/parallax.js
   ========================================================================== */

(() => {
  "use strict";

  const SELECTOR = "[data-itu-parallax]";

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const isMobile = window.matchMedia("(max-width: 767px)");

  let elements = [];
  let ticking = false;

  let scrollY = window.scrollY;
  let previousScrollY = scrollY;

  function getSpeed(element) {
    const speed = Number(element.dataset.parallaxSpeed);

    return Number.isFinite(speed)
      ? Math.max(-1, Math.min(speed, 1))
      : 0.25;
  }

  function getDirection(element) {
    return element.dataset.parallaxDirection || "up";
  }

  function updateParallax() {
    ticking = false;

    if (reducedMotion.matches) return;

    scrollY = window.scrollY;

    const scrollingDown = scrollY >= previousScrollY;

    elements.forEach(element => {
      if (!element.isConnected) return;

      const rect = element.getBoundingClientRect();

      // Ignore elements outside the viewport.
      if (
        rect.bottom < -200 ||
        rect.top > window.innerHeight + 200
      ) return;

      const speed = getSpeed(element);
      const direction = getDirection(element);

      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = window.innerHeight / 2;

      const distance = elementCenter - viewportCenter;

      let movement = distance * speed;

      switch (direction) {
        case "down":
          movement *= -1;
          break;

        case "left":
          element.style.transform =
            `translate3d(${-movement * 0.35}px, 0, 0)`;
          return;

        case "right":
          element.style.transform =
            `translate3d(${movement * 0.35}px, 0, 0)`;
          return;

        case "up":
        default:
          break;
      }

      // Limit movement on smaller screens.
      const maxMovement = isMobile.matches ? 35 : 100;

      movement = Math.max(
        -maxMovement,
        Math.min(movement, maxMovement)
      );

      element.style.transform =
        `translate3d(0, ${-movement}px, 0)`;

      element.dataset.scrollDirection =
        scrollingDown ? "down" : "up";
    });

    previousScrollY = scrollY;
  }

  function requestUpdate() {
    if (ticking || reducedMotion.matches) return;

    ticking = true;
    window.requestAnimationFrame(updateParallax);
  }

  function initialiseParallax() {
    elements = Array.from(
      document.querySelectorAll(SELECTOR)
    );

    elements.forEach(element => {
      element.style.willChange = "transform";
    });

    requestUpdate();
  }

  /* Scroll events */
  window.addEventListener("scroll", requestUpdate, {
    passive: true
  });

  window.addEventListener("resize", requestUpdate, {
    passive: true
  });

  /* Mouse movement parallax */
  document.addEventListener("mousemove", event => {
    if (reducedMotion.matches || isMobile.matches) return;

    const mouseX =
      (event.clientX / window.innerWidth - 0.5) * 2;

    const mouseY =
      (event.clientY / window.innerHeight - 0.5) * 2;

    document.querySelectorAll("[data-parallax-mouse]").forEach(element => {
      const intensity = Number(
        element.dataset.parallaxMouse
      ) || 10;

      element.style.setProperty(
        "--parallax-mouse-x",
        `${mouseX * intensity}px`
      );

      element.style.setProperty(
        "--parallax-mouse-y",
        `${mouseY * intensity}px`
      );
    });
  }, { passive: true });

  /* Reduced-motion changes */
  reducedMotion.addEventListener?.("change", event => {
    if (event.matches) {
      elements.forEach(element => {
        element.style.transform = "none";
        element.style.willChange = "auto";
      });
    } else {
      initialiseParallax();
    }
  });

  /* Dynamic content support */
  const observer = new MutationObserver(() => {
    initialiseParallax();
  });

  document.addEventListener("DOMContentLoaded", () => {
    initialiseParallax();

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });

  window.addEventListener("load", requestUpdate);

  window.ItuParallax = {
    refresh: initialiseParallax,
    update: requestUpdate
  };

})();
