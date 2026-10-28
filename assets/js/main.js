document.addEventListener('DOMContentLoaded', () => {
  // Set dynamic current year in footer
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // Dark Mode Toggle
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
    });
  }

  // Mobile Navigation Toggle (Hamburger ⇄ X)
  const menuToggleBtn = document.getElementById('menu-toggle');
  const primaryNav = document.getElementById('primary-nav');
  if (menuToggleBtn && primaryNav) {
    menuToggleBtn.addEventListener('click', () => {
      const isExpanded = menuToggleBtn.getAttribute('aria-expanded') === 'true';
      menuToggleBtn.setAttribute('aria-expanded', !isExpanded);
      primaryNav.classList.toggle('hidden');
      primaryNav.classList.toggle('flex');

      // Toggle icon between bars and X
      const icon = menuToggleBtn.querySelector('i');
      if (icon) {
        if (!isExpanded) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  // Mobile Mega Menu Toggle (Services + ⇄ -)
  const megaTrigger = document.getElementById('mega-trigger');
  const megaMenu = document.getElementById('services-mega');
  if (megaTrigger && megaMenu) {
    megaTrigger.addEventListener('click', () => {
      const isExpanded = megaTrigger.getAttribute('aria-expanded') === 'true';
      megaTrigger.setAttribute('aria-expanded', !isExpanded);
      megaMenu.classList.toggle('hidden');
      megaMenu.classList.toggle('grid');

      // Toggle icon between chevron/plus/minus
      const icon = megaTrigger.querySelector('.fa-chevron-down, .fa-plus, .fa-minus');
      if (icon) {
        if (!isExpanded) {
          icon.classList.remove('fa-chevron-down', 'fa-plus');
          icon.classList.add('fa-minus');
        } else {
          icon.classList.remove('fa-minus');
          icon.classList.add('fa-chevron-down');
        }
      }
    });
  }
});
