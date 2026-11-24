document.addEventListener('DOMContentLoaded', () => {
  const heroImages = [
    // it-support-and-networking (9 images)
    "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking/it-support-and-networking-01.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking/it-support-and-networking-02.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking/it-support-and-networking-03.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking/it-support-and-networking-04.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking/it-support-and-networking-05.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking/it-support-and-networking-06.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking/it-support-and-networking-07.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking/it-support-and-networking-08.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/it-support-and-networking/it-support-and-networking-09.jpg",

    // operating-systems-and-software (6 images)
    "https://www.it-u.co.za/assets/images/carousel-images/operating-systems-and-software/operating-systems-and-software-01.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/operating-systems-and-software/operating-systems-and-software-02.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/operating-systems-and-software/operating-systems-and-software-03.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/operating-systems-and-software/operating-systems-and-software-04.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/operating-systems-and-software/operating-systems-and-software-05.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/operating-systems-and-software/operating-systems-and-software-06.jpg",

    // website-design-and-development (10 images)
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development/website-design-and-development-01.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development/website-design-and-development-02.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development/website-design-and-development-03.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development/website-design-and-development-04.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development/website-design-and-development-05.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development/website-design-and-development-06.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development/website-design-and-development-07.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development/website-design-and-development-08.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development/website-design-and-development-09.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/website-design-and-development/website-design-and-development-10.jpg",

    // computer-repair-and-maintenance (10 images)
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance/computer-repair-and-maintenance-01.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance/computer-repair-and-maintenance-02.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance/computer-repair-and-maintenance-03.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance/computer-repair-and-maintenance-04.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance/computer-repair-and-maintenance-05.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance/computer-repair-and-maintenance-06.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance/computer-repair-and-maintenance-07.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance/computer-repair-and-maintenance-08.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance/computer-repair-and-maintenance-09.jpg",
    "https://www.it-u.co.za/assets/images/carousel-images/computer-repair-and-maintenance/computer-repair-and-maintenance-10.jpg"
  ];

  const heroSections = Array.from(
    document.querySelectorAll('#hero-section, [data-hero-section], .hero-section')
  );
  if (heroSections.length === 0 || heroImages.length === 0) return;

  const stopCallbacks = [];
  const startCallbacks = [];

  heroSections.forEach((heroSection) => {
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

    const intervalMs = parseInt(heroSection.getAttribute('data-interval'), 10) || 4000;
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

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopCallbacks.forEach((fn) => fn());
    } else {
      startCallbacks.forEach((fn) => fn());
    }
  });
});
