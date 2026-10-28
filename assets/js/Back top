const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.remove('hidden');
      backToTopBtn.classList.add('grid');
    } else {
      backToTopBtn.classList.add('hidden');
      backToTopBtn.classList.remove('grid');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
