const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const button = form.querySelector('button[type="submit"]');
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = 'Sending…';
  status.textContent = '';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) throw new Error('Request failed');
    form.reset();
    status.textContent = 'Your project details were sent. Merrick will follow up soon.';
    button.textContent = 'Sent ✓';
  } catch (error) {
    status.textContent = 'The form did not send. Please DM @merrickspanes instead.';
    button.disabled = false;
    button.textContent = originalText;
    return;
  }

  setTimeout(() => {
    button.disabled = false;
    button.textContent = originalText;
  }, 3000);
});

// Preserve basic attribution data with every inquiry.
const landingPage = document.getElementById('landingPage');
const referrerField = document.getElementById('referrer');
if (landingPage) landingPage.value = window.location.href;
if (referrerField) referrerField.value = document.referrer || 'Direct / unknown';

// Preselect the relevant service when a visitor chooses an audience or audit CTA.
document.querySelectorAll('[data-service]').forEach(link => {
  link.addEventListener('click', () => {
    const select = document.getElementById('serviceSelect');
    if (!select) return;
    const requested = link.dataset.service;
    const exactOption = [...select.options].find(option => option.text === requested);
    if (exactOption) select.value = exactOption.text;
    else if (requested.includes('Business')) select.value = 'Monthly Content';
  });
});
