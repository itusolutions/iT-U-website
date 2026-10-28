document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle (Hamburger ⇄ X)
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      
      const icon = toggle.querySelector('i');
      if (icon) {
        if (open) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-xmark');
        } else {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  // 2. Services Mega Menu Toggle (+ ⇄ -) & Group Handling
  document.querySelectorAll('.mega-trigger').forEach(btn => {
    const group = btn.closest('.nav-group');
    btn.addEventListener('click', () => {
      const open = group.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));

      // Toggle icon between chevron/plus/minus
      const icon = btn.querySelector('.fa-chevron-down, .fa-plus, .fa-minus');
      if (icon) {
        if (open) {
          icon.classList.remove('fa-chevron-down', 'fa-plus');
          icon.classList.add('fa-minus');
        } else {
          icon.classList.remove('fa-minus');
          icon.classList.add('fa-plus');
        }
      }
    });
  });

  // 3. Close on ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.nav-group.open').forEach(g => {
        g.classList.remove('open');
        const b = g.querySelector('.mega-trigger');
        if (b) {
          b.setAttribute('aria-expanded', 'false');
          const icon = b.querySelector('.fa-minus');
          if (icon) {
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
          }
        }
      });
      // Also close main mobile nav if open
      if (nav && nav.classList.contains('open')) {
        nav.classList.remove('open');
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
          const toggleIcon = toggle.querySelector('i');
          if (toggleIcon) {
            toggleIcon.classList.remove('fa-xmark');
            toggleIcon.classList.add('fa-bars');
          }
        }
      }
    }
  });

  // 4. Close on Click Outside
  document.addEventListener('click', e => {
    document.querySelectorAll('.nav-group.open').forEach(g => {
      if (!g.contains(e.target)) {
        g.classList.remove('open');
        const b = g.querySelector('.mega-trigger');
        if (b) {
          b.setAttribute('aria-expanded', 'false');
          const icon = b.querySelector('.fa-minus');
          if (icon) {
            icon.classList.remove('fa-minus');
            icon.classList.add('fa-plus');
          }
        }
      }
    });
  });
});
