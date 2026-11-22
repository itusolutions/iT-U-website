(function () {
  function normalize(str) {
    return (str || "").toLowerCase().trim();
  }

  function initSearch() {
    const inputs = Array.from(
      document.querySelectorAll('[data-search-input], #site-search, input[type="search"]')
    );
    const items = Array.from(document.querySelectorAll("[data-search-item]"));
    const categoryButtons = Array.from(document.querySelectorAll("[data-search-category]"));
    const emptyState = document.querySelector("[data-search-empty]");
    const countBadge = document.querySelector("[data-search-count]");

    if (!inputs.length || !items.length) return;

    let activeCategory = "all";
    let currentQuery = "";

    function applyFilter() {
      const q = normalize(currentQuery);
      let visibleCount = 0;

      items.forEach((item) => {
        const haystack = normalize(
          item.getAttribute("data-search-text") || item.textContent || ""
        );
        const itemCategory = normalize(item.getAttribute("data-category") || "all");

        const matchesQuery = !q || haystack.includes(q);
        const matchesCategory = activeCategory === "all" || itemCategory === activeCategory;
        const show = matchesQuery && matchesCategory;

        item.classList.toggle("hidden", !show);
        if (show) visibleCount += 1;
      });

      if (emptyState) {
        emptyState.classList.toggle("hidden", visibleCount > 0);
      }

      if (countBadge) {
        countBadge.textContent = String(visibleCount);
      }
    }

    inputs.forEach((input) => {
      input.addEventListener("input", function () {
        currentQuery = input.value;
        inputs.forEach((other) => {
          if (other !== input) other.value = currentQuery;
        });
        applyFilter();
      });

      const form = input.closest("form");
      if (form) {
        form.addEventListener("submit", function (event) {
          event.preventDefault();
          currentQuery = input.value;
          applyFilter();
        });
      }
    });

    categoryButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        activeCategory = normalize(btn.getAttribute("data-search-category") || "all");
        categoryButtons.forEach((b) => {
          const isSelected = normalize(b.getAttribute("data-search-category") || "all") === activeCategory;
          b.setAttribute("aria-pressed", String(isSelected));
          b.classList.toggle("bg-blue-600", isSelected);
          b.classList.toggle("text-white", isSelected);
        });
        applyFilter();
      });
    });

    applyFilter();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSearch);
  } else {
    initSearch();
  }
})();
