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


// Audience-based pricing reveal
const pricingAudience = document.getElementById("pricingAudience");
const pricingGroups = document.querySelectorAll(".pricing-group");
const pricingEmptyState = document.getElementById("pricingEmptyState");
const pricingAddons = document.getElementById("pricingAddons");

function updatePricingDisplay(value) {
  let visibleCount = 0;

  pricingGroups.forEach((group) => {
    const audiences = (group.dataset.audience || "").split(/\s+/);
    const show = value === "all" || (value && audiences.includes(value));
    group.classList.toggle("is-visible", Boolean(show));
    if (show) visibleCount += 1;
  });

  if (pricingEmptyState) {
    pricingEmptyState.hidden = Boolean(value);
  }

  if (pricingAddons) {
    pricingAddons.classList.toggle("is-visible", Boolean(value));
  }
}

if (pricingAudience) {
  updatePricingDisplay(pricingAudience.value);
  pricingAudience.addEventListener("change", (event) => {
    updatePricingDisplay(event.target.value);
  });
}

// Service links can preselect the closest pricing audience.
const pricingAudienceMap = {
  "Monthly Business Growth Content": "business",
  "Sports Media Package": "sports",
  "Team / Program Content": "sports",
  "Team / Season Partnership": "sports",
  "Promotional Campaign": "events",
  "Real Estate Marketing": "real-estate",
  "Platform / YouTube Strategy": "creators",
  "Analytics / Content Insights": "creators",
  "Editing Services": "editing",
  "Photography": "photography"
};

document.querySelectorAll('a[href="#pricing"][data-service], a[href="#sports-pricing"], a[href="#real-estate-pricing"]').forEach((link) => {
  link.addEventListener("click", () => {
    let selection = pricingAudienceMap[link.dataset.service];

    if (link.getAttribute("href") === "#sports-pricing") selection = "sports";
    if (link.getAttribute("href") === "#real-estate-pricing") selection = "real-estate";

    if (pricingAudience && selection) {
      pricingAudience.value = selection;
      updatePricingDisplay(selection);
    }
  });
});
