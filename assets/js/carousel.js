
/* ==========================================================================
   iTu Solutions - Responsive Carousel
   File: /assets/js/carousel.js
   ========================================================================== */

(() => {
  "use strict";

  const SELECTOR = "[data-itu-carousel]";
  const REDUCED_MOTION = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  class ItuCarousel {
    constructor(element) {
      this.element = element;
      this.track = element.querySelector("[data-carousel-track]");
      this.slides = Array.from(
        element.querySelectorAll("[data-carousel-slide]")
      );

      this.prevButton = element.querySelector("[data-carousel-prev]");
      this.nextButton = element.querySelector("[data-carousel-next]");
      this.dotsContainer = element.querySelector("[data-carousel-dots]");

      if (!this.track || this.slides.length === 0) return;

      this.index = 0;
      this.timer = null;
      this.startX = 0;
      this.endX = 0;
      this.isDragging = false;
      this.pauseReasons = new Set();

      this.autoplay = element.dataset.autoplay !== "false";
      this.interval = Math.max(
        2000,
        Number(element.dataset.interval) || 5000
      );

      this.loop = element.dataset.loop !== "false";
      this.transition = element.dataset.transition || "slide";

      this.init();
    }

    init() {
      this.createDots();
      this.bindEvents();
      this.update();

      if (this.autoplay && !REDUCED_MOTION.matches) {
        this.startAutoplay();
      }
    }

    createDots() {
      if (!this.dotsContainer) return;

      this.dotsContainer.innerHTML = "";

      this.slides.forEach((_, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "itu-carousel-dot";
        button.setAttribute(
          "aria-label",
          `Go to slide ${index + 1}`
        );
        button.setAttribute("aria-controls", this.track.id || "");

        button.addEventListener("click", () => {
          this.goTo(index);
        });

        this.dotsContainer.appendChild(button);
      });

      this.dots = Array.from(
        this.dotsContainer.querySelectorAll("button")
      );
    }

    bindEvents() {
      this.prevButton?.addEventListener("click", () => {
        this.previous();
      });

      this.nextButton?.addEventListener("click", () => {
        this.next();
      });

      this.element.addEventListener("mouseenter", () => {
        this.pause("hover");
      });

      this.element.addEventListener("mouseleave", () => {
        this.resume("hover");
      });

      this.element.addEventListener("focusin", () => {
        this.pause("focus");
      });

      this.element.addEventListener("focusout", event => {
        if (!this.element.contains(event.relatedTarget)) {
          this.resume("focus");
        }
      });

      this.element.addEventListener("keydown", event => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          this.previous();
        }

        if (event.key === "ArrowRight") {
          event.preventDefault();
          this.next();
        }
      });

      this.track.addEventListener(
        "touchstart",
        event => this.onTouchStart(event),
        { passive: true }
      );

      this.track.addEventListener(
        "touchend",
        event => this.onTouchEnd(event),
        { passive: true }
      );

      this.track.addEventListener(
        "pointerdown",
        event => this.onPointerDown(event)
      );

      this.track.addEventListener(
        "pointerup",
        event => this.onPointerUp(event)
      );

      this.track.addEventListener(
        "pointercancel",
        () => {
          this.isDragging = false;
        }
      );

      REDUCED_MOTION.addEventListener?.("change", event => {
        if (event.matches) {
          this.stopAutoplay();
        } else if (this.autoplay) {
          this.startAutoplay();
        }
      });

      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          this.pause("visibility");
        } else {
          this.resume("visibility");
        }
      });
    }

    update() {
      const slide = this.slides[this.index];

      if (!slide) return;

      if (this.transition === "fade") {
        this.slides.forEach((item, index) => {
          const active = index === this.index;

          item.style.opacity = active ? "1" : "0";
          item.style.visibility = active ? "visible" : "hidden";
          item.style.position = active ? "relative" : "absolute";
          item.style.inset = active ? "auto" : "0";

          item.setAttribute("aria-hidden", String(!active));
        });
      } else {
        const offset = slide.offsetLeft - this.track.offsetLeft;

        this.track.style.transform =
          `translate3d(-${offset}px, 0, 0)`;

        this.track.style.transition = REDUCED_MOTION.matches
          ? "none"
          : "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)";

        this.slides.forEach((item, index) => {
          item.setAttribute(
            "aria-hidden",
            String(index !== this.index)
          );
        });
      }

      this.dots?.forEach((dot, index) => {
        const active = index === this.index;

        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-current", active ? "true" : "false");
      });

      if (this.prevButton) {
        this.prevButton.disabled = !this.loop && this.index === 0;
      }

      if (this.nextButton) {
        this.nextButton.disabled =
          !this.loop && this.index === this.slides.length - 1;
      }

      this.element.dataset.activeSlide = String(this.index + 1);
    }

    goTo(index) {
      if (this.loop) {
        this.index =
          (index + this.slides.length) % this.slides.length;
      } else {
        this.index = Math.max(
          0,
          Math.min(index, this.slides.length - 1)
        );
      }

      this.update();
      this.restartAutoplay();
    }

    next() {
      if (!this.loop && this.index === this.slides.length - 1) {
        this.goTo(0);
      } else {
        this.goTo(this.index + 1);
      }
    }

    previous() {
      if (!this.loop && this.index === 0) {
        this.goTo(this.slides.length - 1);
      } else {
        this.goTo(this.index - 1);
      }
    }

    onTouchStart(event) {
      this.startX = event.changedTouches[0].clientX;
    }

    onTouchEnd(event) {
      this.endX = event.changedTouches[0].clientX;
      this.handleSwipe();
    }

    onPointerDown(event) {
      if (event.pointerType === "touch") return;

      this.startX = event.clientX;
      this.isDragging = true;
    }

    onPointerUp(event) {
      if (!this.isDragging) return;

      this.endX = event.clientX;
      this.isDragging = false;

      this.handleSwipe();
    }

    handleSwipe() {
      const distance = this.endX - this.startX;

      if (Math.abs(distance) < 50) return;

      if (distance < 0) {
        this.next();
      } else {
        this.previous();
      }
    }

    startAutoplay() {
      if (
        this.timer ||
        !this.autoplay ||
        this.slides.length < 2 ||
        REDUCED_MOTION.matches ||
        this.pauseReasons.size
      ) return;

      this.timer = window.setInterval(() => {
        this.next();
      }, this.interval);
    }

    stopAutoplay() {
      window.clearInterval(this.timer);
      this.timer = null;
    }

    restartAutoplay() {
      this.stopAutoplay();
      this.startAutoplay();
    }

    pause(reason) {
      this.pauseReasons.add(reason);
      this.stopAutoplay();
    }

    resume(reason) {
      this.pauseReasons.delete(reason);

      if (this.pauseReasons.size === 0) {
        this.startAutoplay();
      }
    }

    destroy() {
      this.stopAutoplay();
    }
  }

  const carousels = new Map();

  function initialiseCarousels() {
    document.querySelectorAll(SELECTOR).forEach(element => {
      if (carousels.has(element)) return;

      const carousel = new ItuCarousel(element);

      if (carousel.track && carousel.slides.length) {
        carousels.set(element, carousel);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", initialiseCarousels);

  // Support dynamically added carousel components.
  const observer = new MutationObserver(() => {
    initialiseCarousels();

    carousels.forEach((carousel, element) => {
      if (!element.isConnected) {
        carousel.destroy();
        carousels.delete(element);
      }
    });
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  window.I tuCarousel = undefined;
})();

