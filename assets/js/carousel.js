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

    var intervalMs = parseInt(container.getAttribute("data-interval"), 10) || 4000;
    var activeIndex = Math.floor(Math.random() * HERO_IMAGES.length);
    var timerId = null;
    var rafId = null;
    var heroInView = true;

    var fragment = document.createDocumentFragment();
    var slideElements = HERO_IMAGES.map(function (src, index) {
      var img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.decoding = "async";
      img.loading = index === activeIndex ? "eager" : "lazy";
      img.className =
        "absolute -inset-y-12 inset-x-0 h-[calc(100%+6rem)] w-full object-cover object-center will-change-transform transition-opacity duration-700 ease-in-out " +
        (index === activeIndex ? "opacity-100" : "opacity-0");
      fragment.appendChild(img);
      return img;
    });

    slidesHost.innerHTML = "";
    slidesHost.appendChild(fragment);

    function updateHeroFixedScroll() {
      rafId = null;
      if (!heroInView) return;

      var rect = container.getBoundingClientRect();
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight || 800;
      var totalTravel = rect.height + viewportHeight;
      if (totalTravel <= 0) return;

      // Progress from 0 (entering bottom) to 1 (exiting top), anchored around center
      var progress = (viewportHeight - rect.top) / totalTravel;
      var offsetPx = Math.round((progress - 0.5) * 72);

      slidesHost.style.transform = "translate3d(0, " + offsetPx + "px, 0)";
    }

    function scheduleScrollUpdate() {
      if (rafId === null && heroInView) {
        rafId = window.requestAnimationFrame(updateHeroFixedScroll);
      }
    }

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            heroInView = entry.isIntersecting;
            if (heroInView) {
              scheduleScrollUpdate();
            }
          });
        },
        { threshold: 0 }
      );
      observer.observe(container);
    }

    window.addEventListener("scroll", scheduleScrollUpdate, { passive: true });
    window.addEventListener("resize", scheduleScrollUpdate, { passive: true });

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

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stopTimer();
      } else {
        startTimer();
        scheduleScrollUpdate();
      }
    });

    setActiveSlide(activeIndex);
    updateHeroFixedScroll();
    startTimer();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeroCarousel);
  } else {
    initHeroCarousel();
  }
})();
