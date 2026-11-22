// Reserved for this feature; impl(function () {
  const STORAGE_KEY = "itu-theme";
  const root = document.documentElement;

  function getSystemTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function getSavedTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === "dark" || saved === "light" ? saved : null;
    } catch (e) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // Ignore storage access errors in restricted contexts
    }
  }

  function syncThemeColorMeta(isDark) {
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (!metaTheme) return;

    if (!metaTheme.dataset.lightColor) {
      metaTheme.dataset.lightColor = metaTheme.getAttribute("content") || "#2563EB";
    }
    metaTheme.setAttribute("content", isDark ? "#020617" : metaTheme.dataset.lightColor);
  }

  function syncToggleButtons(isDark) {
    const buttons = document.querySelectorAll("[data-theme-toggle], #theme-toggle");
    buttons.forEach((btn) => {
      btn.setAttribute("aria-pressed", String(isDark));
      btn.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode"
      );
    });
  }

  function applyTheme(theme, persist) {
    const isDark = theme === "dark";
    root.classList.toggle("dark", isDark);
    root.dataset.theme = isDark ? "dark" : "light";

    if (persist) {
      saveTheme(isDark ? "dark" : "light");
    }

    syncThemeColorMeta(isDark);
    syncToggleButtons(isDark);

    window.dispatchEvent(
      new CustomEvent("themechange", {
        detail: { theme: isDark ? "dark" : "light", isDark }
      })
    );
  }

  // 1. Apply initial theme immediately so elements see the current state right away
  const initialTheme = getSavedTheme() || getSystemTheme();
  applyTheme(initialTheme, false);

  // 2. Bind toggle buttons and system preference changes once DOM is ready
  function initThemeControls() {
    syncToggleButtons(root.classList.contains("dark"));

    document.addEventListener("click", function (event) {
      const toggle = event.target.closest("[data-theme-toggle], #theme-toggle");
      if (!toggle) return;

      event.preventDefault();
      const nextTheme = root.classList.contains("dark") ? "light" : "dark";
      applyTheme(nextTheme, true);
    });

    if (window.matchMedia) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleSystemChange = function (e) {
        if (!getSavedTheme()) {
          applyTheme(e.matches ? "dark" : "light", false);
        }
      };

      if (typeof mediaQuery.addEventListener === "function") {
        mediaQuery.addEventListener("change", handleSystemChange);
      } else if (typeof mediaQuery.addListener === "function") {
        mediaQuery.addListener(handleSystemChange);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initThemeControls);
  } else {
    initThemeControls();
  }

  // Expose optional helper on window if other scripts need it
  window.iTuTheme = {
    set: function (theme) {
      applyTheme(theme === "dark" ? "dark" : "light", true);
    },
    toggle: function () {
      const nextTheme = root.classList.contains("dark") ? "light" : "dark";
      applyTheme(nextTheme, true);
    },
    current: function () {
      return root.classList.contains("dark") ? "dark" : "light";
    }
  };
})();ement and test before enabling.
