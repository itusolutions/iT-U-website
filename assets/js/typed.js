// --- Typed.js Initialization ---
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof Typed !== 'undefined') {
      new Typed('#typed-text', {
        strings: [
          'works for you.',
          'drives your business.',
          'simplifies IT maintenance.',
          'powers custom websites.'
        ],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 2000,
        loop: true
      });
    }
  });
