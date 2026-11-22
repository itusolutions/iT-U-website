(function () {
  const BASE_PATH = "/updated-i-tu";

  function stripBasePath(pathname) {
    let clean = (pathname || "/").split("?")[0].split("#")[0].toLowerCase();
    const base = BASE_PATH.toLowerCase();

    if (clean === base || clean === base + "/" || clean === base + "/index.html") {
      return "/";
    }

    if (clean.startsWith(base + "/")) {
      clean = clean.slice(base.length);
    }

    if (clean === "" || clean === "/" || clean === "/index.html") {
      return "/";
    }

    return clean.replace(/\/+$/, "") + "/";
  }

  function normalizePath(pathOrUrl) {
    if (!pathOrUrl) return "/";
    try {
      const parsed = new URL(pathOrUrl, window.location.origin);
      return stripBasePath(parsed.pathname);
    } catch (e) {
      return stripBasePath(pathOrUrl);
    }
  }

  function initMobileMenu() {
    const button = document.getElementById("mobile-menu-button");
    const menu = document.getElementById("mobile-menu");
    if (!button || !menu) return;

    function isMobileMenuOpen() {
      return !menu.classList.contains("hidden") && button.getAttribute("aria-expanded") === "true";
    }

    function setOpen(isOpen) {
      menu.classList.toggle("hidden", !isOpen);
      button.setAttribute("aria-expanded", String(isOpen));
      button.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
    }

    // Start closed on load without touching desktop navigation
    setOpen(false);

    button.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      setOpen(!isMobileMenuOpen());
    });

    menu.addEventListener("click", function (event) {
      const link = event.target.closest("a[href]");
      if (link) {
        setOpen(false);
      }
    });

    document.addEventListener("click", function (event) {
      if (!isMobileMenuOpen()) return;
      if (!menu.contains(event.target) && !button.contains(event.target)) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isMobileMenuOpen()) {
        setOpen(false);
        button.focus();
      }
    });

    const desktopMedia = window.matchMedia("(min-width: 768px)");
    const handleViewportChange = function (e) {
      if (e.matches) {
        setOpen(false);
      }
    };

    if (typeof desktopMedia.addEventListener === "function") {
      desktopMedia.addEventListener("change", handleViewportChange);
    } else if (typeof desktopMedia.addListener === "function") {
      desktopMedia.addListener(handleViewportChange);
    }
  }

  function highlightActiveLinks() {
    const currentPath = normalizePath(window.location.pathname);
    const navLinks = document.querySelectorAll(
      'header nav[aria-label="Main navigation"] a[href], #mobile-menu a[href]'
    );

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      let parsedUrl;
      try {
        parsedUrl = new URL(href, window.location.origin);
      } catch (e) {
        return;
      }

      if (parsedUrl.origin !== window.location.origin) return;

      const linkPath = normalizePath(parsedUrl.pathname);
      const isMatch = linkPath === currentPath;

      link.classList.remove(
        "bg-blue-50",
        "text-blue-700",
        "dark:bg-slate-900",
        "dark:text-blue-400"
      );

      if (isMatch) {
        link.setAttribute("aria-current", "page");
        link.classList.add(
          "bg-blue-50",
          "text-blue-700",
          "dark:bg-slate-900",
          "dark:text-blue-400"
        );
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  function initSamePageAnchors() {
    const prefersReducedMotion =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.addEventListener("click", function (event) {
      const link = event.target.closest('a[href^="#"]');
      if (!link) return;

      const targetId = link.getAttribute("href").slice(1);
      if (!targetId) return;

      const target = document.getElementById(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });

      if (history.pushState) {
        history.pushState(null, "", "#" + targetId);
      }
    });
  }

  function onReady() {
    initMobileMenu();
    highlightActiveLinks();
    initSamePageAnchors();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", onReady);
  } else {
    onReady();
  }
})();
