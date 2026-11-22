(function () {
  function initHamburgerMenu() {
    var button = document.getElementById("mobile-menu-button");
    var menu = document.getElementById("mobile-menu");

    if (!button || !menu) return;
    if (button.dataset.hamburgerBound === "true") return;
    button.dataset.hamburgerBound = "true";

    var icon = button.querySelector("i, svg");

    function isOpen() {
      return (
        !menu.classList.contains("hidden") &&
        button.getAttribute("aria-expanded") === "true"
      );
    }

    function syncIcon(open) {
      if (!icon) return;
      if (icon.classList.contains("bx")) {
        icon.classList.toggle("bx-menu", !open);
        icon.classList.toggle("bx-x", open);
      } else if (icon.classList.contains("fa-solid") || icon.classList.contains("fa")) {
        icon.classList.toggle("fa-bars", !open);
        icon.classList.toggle("fa-xmark", open);
      }
    }

    function setMenuState(open) {
      menu.classList.toggle("hidden", !open);
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute(
        "aria-label",
        open ? "Close navigation menu" : "Open navigation menu"
      );
      syncIcon(open);
    }

    // Start closed on initial load
    setMenuState(false);

    button.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      setMenuState(!isOpen());
    });

    // Close menu when a navigation link inside #mobile-menu is clicked
    menu.addEventListener("click", function (event) {
      var link = event.target.closest("a[href]");
      if (link) {
        setMenuState(false);
      }
    });

    // Close menu when clicking outside button and drawer
    document.addEventListener("click", function (event) {
      if (!isOpen()) return;
      if (!menu.contains(event.target) && !button.contains(event.target)) {
        setMenuState(false);
      }
    });

    // Close menu on Escape key and return focus to button
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) {
        setMenuState(false);
        button.focus();
      }
    });

    // Automatically close mobile drawer when resizing to desktop (md: 768px+)
    if (window.matchMedia) {
      var desktopQuery = window.matchMedia("(min-width: 768px)");
      var onViewportChange = function (e) {
        if (e.matches) {
          setMenuState(false);
        }
      };

      if (typeof desktopQuery.addEventListener === "function") {
        desktopQuery.addEventListener("change", onViewportChange);
      } else if (typeof desktopQuery.addListener === "function") {
        desktopQuery.addListener(onViewportChange);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHamburgerMenu);
  } else {
    initHamburgerMenu();
  }
})();
