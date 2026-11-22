(function () {
  var STORAGE_KEY = "itu-theme";
  var root = document.documentElement;

  function getSystemPrefersDark() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }

  function getSavedTheme() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "dark" || saved === "light") {
        return saved;
      }
    } catch (e) {}
    return null;
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {}
  }

  function syncToggleButtons(isDark) {
    var buttons = document.querySelectorAll(
      "#themeToggle, [data-theme-toggle], .theme-toggle"
    );

    buttons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(isDark));
      btn.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
      btn.setAttribute(
        "title",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );

      var lightIcon = btn.querySelector(".light-icon, .fa-sun");
      var darkIcon = btn.querySelector(".dark-icon, .fa-moon");

      if (lightIcon) {
        lightIcon.classList.toggle("hidden", isDark);
        lightIcon.style.display = isDark ? "none" : "inline-block";
      }

      if (darkIcon) {
        darkIcon.classList.toggle("hidden", !isDark);
        darkIcon.style.display = isDark ? "inline-block" : "none";
      }
    });
  }

  function applyTheme(theme, persist) {
    var isDark = theme === "dark";
    root.classList.toggle("dark", isDark);
    root.dataset.theme = isDark ? "dark" : "light";
    root.style.colorScheme = isDark ? "dark" : "light";

    if (persist) {
      saveTheme(isDark ? "dark" : "light");
    }

    syncToggleButtons(isDark);
  }

  function initThemeToggle() {
    var saved = getSavedTheme();
    var initialTheme = saved || (getSystemPrefersDark() ? "dark" : "light");
    applyTheme(initialTheme, false);

    var buttons = document.querySelectorAll(
      "#themeToggle, [data-theme-toggle], .theme-toggle"
    );

    buttons.forEach(function (btn) {
      if (btn.dataset.toggleBound === "true") return;
      btn.dataset.toggleBound = "true";

      btn.addEventListener("click", function (event) {
        event.preventDefault();
        var currentlyDark =
          root.classList.contains("dark") || root.dataset.theme === "dark";
        applyTheme(currentlyDark ? "light" : "dark", true);
      });
    });

    if (window.matchMedia) {
      var mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      var onSystemChange = function (e) {
        if (!getSavedTheme()) {
          applyTheme(e.matches ? "dark" : "light", false);
        }
      };

      if (typeof mediaQuery.addEventListener === "function") {
        mediaQuery.addEventListener("change", onSystemChange);
      } else if (typeof mediaQuery.addListener === "function") {
        mediaQuery.addListener(onSystemChange);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThemeToggle);
  } else {
    initThemeToggle();
  }
})();
