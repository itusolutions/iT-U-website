(() => {
  const heroImages = [
    // it-support-and-networking (9 images)
    "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking%20(1).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking%20(2).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking%20(3).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking%20(4).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking%20(5).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking%20(6).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking%20(7).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking%20(8).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking%20(9).jpg",

    // operating-systems-and-software (6 images)
    "https://www.it-u.co.za/assets/images/carousel-images/operating-systems-and-software%20(1).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/operating-systems-and-software%20(2).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/operating-systems-and-software%20(3).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/operating-systems-and-software%20(4).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/operating-systems-and-software%20(5).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/operating-systems-and-software%20(6).jpg",

    // website-design-and-development (10 images)
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(1).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(2).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(3).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(4).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(5).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(6).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(7).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(8).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(9).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development%20(10).jpg",

    // computer-repair-and-maintenance (10 images)
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(1).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(2).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(3).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(4).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(5).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(6).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(7).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(8).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(9).jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance%20(10).jpg"
  ];

  const stopCallbacks = [];
  const startCallbacks = [];

  function initHeroCarousels() {
    if (!Array.isArray(heroImages) || heroImages.length === 0) return;

    const heroSections = Array.from(
      document.querySelectorAll('#hero-section, [data-hero-section], .hero-section')
    );
    if (heroSections.length === 0) return;

    heroSections.forEach((heroSection) => {
      if (heroSection.dataset.carouselInitialized === 'true') return;
      heroSection.dataset.carouselInitialized = 'true';

      let carouselLayer =
        heroSection.querySelector('#hero-carousel-layer, [data-hero-slides]') ||
        document.getElementById('hero-carousel-layer');

      if (!carouselLayer) {
        carouselLayer = document.createElement('div');
        carouselLayer.setAttribute('data-hero-slides', '');
        carouselLayer.setAttribute('aria-hidden', 'true');
        carouselLayer.className = 'pointer-events-none absolute inset-0 h-full w-full z-0 overflow-hidden';
        heroSection.prepend(carouselLayer);
      }

      const rawInterval = parseInt(heroSection.getAttribute('data-interval') || '', 10);
      const intervalMs = Number.isFinite(rawInterval) && rawInterval >= 500 ? rawInterval : 4000;
      let activeIndex = Math.floor(Math.random() * heroImages.length);
      let slideTimer = null;

      const frag = document.createDocumentFragment();
      const slideDivs = heroImages.map((src, idx) => {
        const slide = document.createElement('div');
        slide.style.backgroundImage = `url("${src}")`;
        slide.className =
          'absolute inset-0 h-full w-full bg-cover bg-center bg-no-repeat bg-fixed transition-opacity duration-700 ease-in-out ' +
          (idx === activeIndex ? 'opacity-100' : 'opacity-0');
        frag.appendChild(slide);
        return slide;
      });

      carouselLayer.innerHTML = '';
      carouselLayer.appendChild(frag);

      function showSlide(index) {
        activeIndex = ((index % slideDivs.length) + slideDivs.length) % slideDivs.length;
        slideDivs.forEach((slide, i) => {
          const isCurrent = i === activeIndex;
          slide.classList.toggle('opacity-100', isCurrent);
          slide.classList.toggle('opacity-0', !isCurrent);
        });
      }

      function nextRandomIndex() {
        if (slideDivs.length <= 1) return 0;
        let candidate = Math.floor(Math.random() * slideDivs.length);
        if (candidate === activeIndex) candidate = (activeIndex + 1) % slideDivs.length;
        return candidate;
      }

      function startAutoplay() {
        stopAutoplay();
        if (document.hidden) return;
        slideTimer = window.setInterval(() => showSlide(nextRandomIndex()), intervalMs);
      }

      function stopAutoplay() {
        if (slideTimer !== null) {
          window.clearInterval(slideTimer);
          slideTimer = null;
        }
      }

      stopCallbacks.push(stopAutoplay);
      startCallbacks.push(startAutoplay);

      showSlide(activeIndex);
      startAutoplay();
    });
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopCallbacks.forEach((fn) => fn());
    } else {
      startCallbacks.forEach((fn) => fn());
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroCarousels, { once: true });
  } else {
    initHeroCarousels();
  }
})();
