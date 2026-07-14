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
