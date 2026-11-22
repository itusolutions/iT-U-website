(function () {
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
  }

  function showFeedback(el, text, isError) {
    if (!el) return;
    el.textContent = text;
    el.classList.remove("hidden", "text-red-600", "text-green-600", "dark:text-red-400", "dark:text-green-400");
    if (isError) {
      el.classList.add("text-red-600", "dark:text-red-400");
    } else {
      el.classList.add("text-green-600", "dark:text-green-400");
    }
  }

  function initNewsletter() {
    const forms = Array.from(
      document.querySelectorAll("#newsletter-form, [data-newsletter-form]")
    );
    if (!forms.length) return;

    forms.forEach((form) => {
      const input = form.querySelector('input[type="email"]');
      const feedback =
        form.querySelector("[data-newsletter-feedback]") ||
        form.parentElement.querySelector("[data-newsletter-feedback]");

      form.addEventListener("submit", function (event) {
        event.preventDefault();
        const email = input ? input.value.trim() : "";

        if (!isValidEmail(email)) {
          showFeedback(feedback, "Please enter a valid email address.", true);
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
              showFeedback(feedback, "Subscribed! Thank you for joining iTu Solutions updates.", false);
              form.reset();
            })
            .catch(function () {
              showFeedback(feedback, "Subscription failed. Please try again shortly.", true);
            });
          return;
        }

        try {
          localStorage.setItem("itu-newsletter-email", email);
        } catch (e) {}
        showFeedback(feedback, "Subscribed! We have recorded " + email + " for IT tips and updates.", false);
        form.reset();
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNewsletter);
  } else {
    initNewsletter();
  }
})();
