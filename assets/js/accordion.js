(function () {
  function getPanel(trigger) {
    var controlsId = trigger.getAttribute("aria-controls");
    if (controlsId) {
      var byId = document.getElementById(controlsId);
      if (byId) return byId;
    }

    if (trigger.nextElementSibling && trigger.nextElementSibling.hasAttribute("data-accordion-panel")) {
      return trigger.nextElementSibling;
    }

    var parent = trigger.parentElement;
    return parent ? parent.querySelector("[data-accordion-panel]") : null;
  }

  function syncTriggerState(trigger, panel, isOpen) {
    trigger.setAttribute("aria-expanded", String(isOpen));
    if (panel) {
      panel.classList.toggle("hidden", !isOpen);
    }

    var chevron =
      trigger.querySelector("[data-accordion-chevron]") ||
      trigger.querySelector(".fa-chevron-down, .fa-chevron-up, .bx-chevron-down");
    if (chevron) {
      chevron.classList.toggle("rotate-180", isOpen);
    }
  }

  function initAccordions() {
    var triggers = Array.from(document.querySelectorAll("[data-accordion-trigger]"));
    if (!triggers.length) return;

    triggers.forEach(function (trigger) {
      if (trigger.dataset.accordionBound === "true") return;
      trigger.dataset.accordionBound = "true";

      var panel = getPanel(trigger);
      var initiallyOpen = trigger.getAttribute("aria-expanded") === "true";
      syncTriggerState(trigger, panel, initiallyOpen);

      trigger.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        var currentlyOpen = trigger.getAttribute("aria-expanded") === "true";
        var nextOpen = !currentlyOpen;
        var groupName = trigger.getAttribute("data-accordion-group");

        if (nextOpen && groupName) {
          triggers.forEach(function (otherTrigger) {
            if (
              otherTrigger !== trigger &&
              otherTrigger.getAttribute("data-accordion-group") === groupName
            ) {
              syncTriggerState(otherTrigger, getPanel(otherTrigger), false);
            }
          });
        }

        syncTriggerState(trigger, panel, nextOpen);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAccordions);
  } else {
    initAccordions();
  }
})();
