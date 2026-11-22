(function () {
  const WHATSAPP_NUMBER = "27711405870";
  const DEFAULT_EMAIL = "info@it-u.co.za";

  function setStatus(container, message, isError) {
    if (!container) return;
    container.textContent = message;
    container.classList.remove("hidden", "text-red-700", "bg-red-50", "border-red-200", "text-green-800", "bg-green-50", "border-green-200");
    if (isError) {
      container.classList.add("text-red-700", "bg-red-50", "border-red-200");
    } else {
      container.classList.add("text-green-800", "bg-green-50", "border-green-200");
    }
  }

  function initContactForm() {
    const form = document.querySelector("#contact-form, [data-contact-form]");
    if (!form) return;

    const statusBox = form.querySelector("[data-form-status]") || document.getElementById("form-status");
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", function (event) {
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const service = String(data.get("service") || "General IT Enquiry").trim();
      const message = String(data.get("message") || "").trim();

      if (!name || (!email && !phone) || !message) {
        event.preventDefault();
        setStatus(
          statusBox,
          "Please provide your name, a contact email or phone number, and a brief description of what you need.",
          true
        );
        return;
      }

      const actionUrl = (form.getAttribute("action") || "").trim();
      const useWhatsApp = form.getAttribute("data-channel") === "whatsapp";

      if (useWhatsApp) {
        event.preventDefault();
        const text = encodeURIComponent(
          "Hello iTu Solutions,\nName: " + name +
          (phone ? "\nPhone: " + phone : "") +
          (email ? "\nEmail: " + email : "") +
          "\nService: " + service +
          "\nDetails: " + message
        );
        window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text, "_blank", "noopener,noreferrer");
        setStatus(statusBox, "Opening WhatsApp with your enquiry details...", false);
        return;
      }

      if (!actionUrl || actionUrl === "#") {
        event.preventDefault();
        const subject = encodeURIComponent("Website Enquiry (" + service + ") - " + name);
        const body = encodeURIComponent(
          "Name: " + name +
          "\nEmail: " + email +
          "\nPhone: " + phone +
          "\nService: " + service +
          "\n\n" + message
        );
        window.location.href = "mailto:" + DEFAULT_EMAIL + "?subject=" + subject + "&body=" + body;
        return;
      }

      if (window.fetch && form.getAttribute("data-ajax") === "true") {
        event.preventDefault();
        if (submitBtn) submitBtn.disabled = true;
        setStatus(statusBox, "Sending your enquiry...", false);

        fetch(actionUrl, {
          method: (form.getAttribute("method") || "POST").toUpperCase(),
          body: data,
          headers: { Accept: "application/json" }
        })
          .then(function (res) {
            if (!res.ok) throw new Error("Request failed");
            const redirectTo = form.getAttribute("data-redirect") || "/form/contact-form/thank-you/";
            window.location.href = redirectTo;
          })
          .catch(function () {
            if (submitBtn) submitBtn.disabled = false;
            setStatus(
              statusBox,
              "Could not submit automatically. Please try again or message us on WhatsApp.",
              true
            );
          });
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initContactForm);
  } else {
    initContactForm();
  }
})();
