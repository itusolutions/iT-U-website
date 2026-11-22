(function () {
  var HERO_IMAGES = [
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(1).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(2).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(3).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(4).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(5).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(6).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(7).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(8).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(9).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(10).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking%20(1).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking%20(2).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking%20(3).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking%20(4).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking%20(5).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking%20(6).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking%20(7).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking%20(8).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking%20(9).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/operating-systems-and-software%20(1).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/operating-systems-and-software%20(2).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/operating-systems-and-software%20(3).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/operating-systems-and-software%20(4).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/operating-systems-and-software%20(5).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/operating-systems-and-software%20(6).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(1).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(2).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(3).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(4).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(5).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(6).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(7).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(8).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(9).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(10).jpg"
  ];

  function initHeroCarousel() {
    var container = document.querySelector("[data-hero-random-carousel]");
    if (!container) return;

    var slidesHost = container.querySelector("[data-hero-slides]");
    if (!slidesHost || HERO_IMAGES.length === 0) return;

    var isFixedScroll = container.hasAttribute("data-fixed-scroll");
    var intervalMs = parseInt(container.getAttribute("data-interval"), 10) || 4000;
    var counterEl = container.querySelector("[data-hero-counter]");
    var prevBtn = container.querySelector("[data-hero-prev]");
    var nextBtn = container.querySelector("[data-hero-next]");
    var activeIndex = Math.floor(Math.random() * HERO_IMAGES.length);
    var timerId = null;
    var rafId = null;

    if (isFixedScroll) {
      slidesHost.className =
        "pointer-events-none fixed inset-0 z-0 h-screen w-screen overflow-hidden transition-opacity duration-200";
    } else {
      slidesHost.className =
        "pointer-events-none absolute inset-0 -z-20 h-full w-full overflow-hidden";
    }

    var fragment = document.createDocumentFragment();
    var slideElements = HERO_IMAGES.map(function (src, index) {
      var img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.decoding = "async";
      img.loading = index === activeIndex ? "eager" : "lazy";
      img.className =
        "fixed inset-0 h-screen w-screen bg-fixed object-cover object-center transition-opacity duration-700 ease-in-out " +
        (index === activeIndex ? "opacity-100" : "opacity-0");
      fragment.appendChild(img);
      return img;
    });

    slidesHost.innerHTML = "";
    slidesHost.appendChild(fragment);

    function syncFixedScrollVisibility() {
      if (!isFixedScroll) return;
      var rect = container.getBoundingClientRect();
      var inView = rect.bottom > 0 && rect.top < window.innerHeight;
      slidesHost.style.opacity = inView ? "1" : "0";
      slidesHost.style.visibility = inView ? "visible" : "hidden";
    }

    function scheduleScrollSync() {
      if (!isFixedScroll || rafId !== null) return;
      rafId = window.requestAnimationFrame(function () {
        rafId = null;
        syncFixedScrollVisibility();
      });
    }

    function setActiveSlide(index) {
      activeIndex = ((index % slideElements.length) + slideElements.length) % slideElements.length;
      slideElements.forEach(function (img, i) {
        var isActive = i === activeIndex;
        if (isActive && img.loading === "lazy") {
          img.loading = "eager";
        }
        img.classList.toggle("opacity-100", isActive);
        img.classList.toggle("opacity-0", !isActive);
      });

      if (counterEl) {
        var current = String(activeIndex + 1).padStart(2, "0");
        var total = String(slideElements.length).padStart(2, "0");
        counterEl.textContent = current + " / " + total;
      }
    }

    function pickRandomIndex() {
      if (slideElements.length <= 1) return 0;
      var next = Math.floor(Math.random() * slideElements.length);
      if (next === activeIndex) {
        next = (activeIndex + 1) % slideElements.length;
      }
      return next;
    }

    function startTimer() {
      stopTimer();
      timerId = window.setInterval(function () {
        setActiveSlide(pickRandomIndex());
      }, intervalMs);
    }

    function stopTimer() {
      if (timerId !== null) {
        window.clearInterval(timerId);
        timerId = null;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        setActiveSlide(activeIndex - 1);
        startTimer();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        setActiveSlide(pickRandomIndex());
        startTimer();
      });
    }

    if (isFixedScroll) {
      window.addEventListener("scroll", scheduleScrollSync, { passive: true });
      window.addEventListener("resize", scheduleScrollSync, { passive: true });
      syncFixedScrollVisibility();
    }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stopTimer();
      } else {
        startTimer();
        syncFixedScrollVisibility();
      }
    });

    setActiveSlide(activeIndex);
    startTimer();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeroCarousel);
  } else {
    initHeroCarousel();
  }
})();
