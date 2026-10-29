// Starter file. Add functionality when the corresponding feature is implemented.
document.addEventListener('DOMContentLoaded', () => {
  const newsletterForm = document.getElementById('newsletter-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = document.getElementById('subscriber-email').value.trim();
      
      if (!emailInput) return;

      // Update button state to show loading
      const originalButtonContent = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Subscribing...';
      formStatus.textContent = '';

      // Simulate client-side processing (or replace with your EmailJS/API endpoint call)
      setTimeout(() => {
        // Success state
        formStatus.textContent = 'Thank you! You have successfully subscribed to iTu Solutions updates.';
        formStatus.className = 'mt-4 text-xs font-semibold text-emerald-600 dark:text-emerald-400';
        
        newsletterForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalButtonContent;
      }, 1000);
    });
  }
});
