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






<script>
  document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('status') === 'success') {
      const formContainer = document.querySelector('.shadow-card');
      
      // Create Success Alert Banner
      const successBanner = document.createElement('div');
      successBanner.className = 'mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-3 animate-fade-in';
      successBanner.innerHTML = `
        <i class="fa-solid fa-circle-check text-lg shrink-0"></i>
        <div>
          <strong class="block font-bold">Unsubscribed Successfully</strong>
          <span>Your email address has been removed from our newsletter updates.</span>
        </div>
      `;
      
      // Insert alert at the top of the card container
      if (formContainer) {
        formContainer.insertBefore(successBanner, formContainer.firstChild);
      }

      // Cleanly remove ?status=success from the URL bar without reloading
      const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
    }
  });
</script>
