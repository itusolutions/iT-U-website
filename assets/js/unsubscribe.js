(function () {
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
  }

  function showStatus(el, message, isError) {
    if (!el) return;
    el.textContent = message;
    el.classList.remove("hidden", "text-red-600", "text-green-600", "dark:text-red-400", "dark:text-green-400");
    if (isError) {
      el.classList.add("text-red-600", "dark:text-red-400");
    } else {
      el.classList.add("text-green-600", "dark:text-green-400");
    }
  }

  function initUnsubscribe() {
    const form = document.querySelector("#unsubscribe-form, [data-unsubscribe-form]");
    if (!form) return;

    const input = form.querySelector('input[type="email"]');
    const statusEl =
      form.querySelector("[data-unsubscribe-status]") ||
      form.parentElement.querySelector("[data-unsubscribe-status]");

    try {
      const params = new URLSearchParams(window.location.search);
      const queryEmail = params.get("email");
      if (queryEmail && input && !input.value) {
        input.value = queryEmail;
      }
    } catch (e) {}

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const email = input ? input.value.trim() : "";

      if (!isValidEmail(email)) {
        showStatus(statusEl, "Please enter a valid email address to unsubscribe.", true);
        if (input) input.focus();
        return;
      }

      const actionUrl = (form.getAttribute("action") || "").trim();
      if (actionUrl && actionUrl !== "#" && window.fetch) {
        fetch(actionUrl, {
          method: (form.getAttribute("method") || "POST").toUpperCase(),
          body: new FormData(form),
          headers: { Accept: "application/json" }
        })
          .then(function (res) {
            if (!res.ok) throw new Error("Failed");
            showStatus(statusEl, email + " has been unsubscribed from iTu Solutions updates.", false);
            form.reset();
          })
          .catch(function () {
            showStatus(statusEl, "Could not complete request right now. Please try again.", true);
          });
        return;
      }

      try {
        if (localStorage.getItem("itu-newsletter-email") === email) {
          localStorage.removeItem("itu-newsletter-email");
        }
      } catch (e) {}
      showStatus(statusEl, email + " has been removed from our newsletter list.", false);
      form.reset();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initUnsubscribe);
  } else {
    initUnsubscribe();
  }
})();
