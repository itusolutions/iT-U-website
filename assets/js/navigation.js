document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  const megaTrigger = document.getElementById('mega-trigger');
  const servicesMega = document.getElementById('services-mega');

  // 1. Mobile Menu Toggle (Hamburger ⇄ X)
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      
      // Toggle icon between bars and X
      const icon = toggle.querySelector('i');
      if (icon) {
        if (isOpen) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  // 2. Services Mega Menu / Accordion Toggle (+ ⇄ -)
  if (megaTrigger && servicesMega) {
    megaTrigger.addEventListener('click', (e) => {
      // For mobile view, prevent default jump and toggle visibility
      if (window.innerWidth <= 900) {
        e.preventDefault();
        const isMegaOpen = servicesMega.classList.toggle('open');
        megaTrigger.setAttribute('aria-expanded', String(isMegaOpen));

        // Toggle icon between + and -
        const chevronIcon = megaTrigger.querySelector('.fa-chevron-down, .fa-plus, .fa-minus');
        if (chevronIcon) {
          if (isMegaOpen) {
            chevronIcon.classList.remove('fa-chevron-down', 'fa-plus');
            chevronIcon.classList.add('fa-minus');
          } else {
            chevronIcon.classList.remove('fa-minus');
            chevronIcon.classList.add('fa-plus');
          }
        }
      }
    });
  }
});
