(() => {
  'use strict';

  // ===== SETTINGS: fill these in before going live =====
  const CONFIG = {
    // Your WhatsApp number in international format, digits only. Example: '8801712345678'.
    // Leave empty to hide the WhatsApp button.
    whatsappNumber: '8801884810350',
    // Free access key from https://web3forms.com (enter your email there, the key arrives by email).
    // With a key, the form sends inquiries straight to your inbox.
    // Left empty, the form falls back to opening the visitor's email app.
    web3formsKey: 'be745639-fc4b-4b9a-a0d9-52a91002ebcb',
    contactEmail: 'muhammadhossain.27.2001@gmail.com'
  };
  // =====================================================

  const waText = encodeURIComponent('Hi ShuvroLabs! I found you on your website and want to discuss a project.');
  const waUrl = CONFIG.whatsappNumber ? `https://wa.me/${CONFIG.whatsappNumber}?text=${waText}` : '';
  if (waUrl) {
    document.querySelectorAll('[data-whatsapp]').forEach(el => { el.href = waUrl; el.hidden = false; });
    const floatChat = document.getElementById('float-chat');
    if (floatChat) { floatChat.href = waUrl; floatChat.lastChild.textContent = 'WhatsApp us'; }
  }
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  const date = document.getElementById('current-year');
  if (date) date.textContent = String(new Date().getFullYear());

  const closeMenu = () => {
    nav.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    document.body.classList.remove('menu-is-open');
  };
  toggle.addEventListener('click', () => {
    const opening = !nav.classList.contains('open');
    nav.classList.toggle('open', opening);
    toggle.classList.toggle('open', opening);
    toggle.setAttribute('aria-expanded', String(opening));
    toggle.setAttribute('aria-label', opening ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('menu-is-open', opening);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });
  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
  });
  const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 22);
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  const revealElements = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('revealed'); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.075, rootMargin: '0px 0px -20px 0px' });
    revealElements.forEach(el => observer.observe(el));
  } else revealElements.forEach(el => el.classList.add('revealed'));

  const filters = [...document.querySelectorAll('.filter-button')];
  const projects = [...document.querySelectorAll('.project-card')];
  filters.forEach(button => button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filters.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    projects.forEach(card => {
      const show = selected === 'all' || (card.dataset.category || '').split(' ').includes(selected);
      card.hidden = !show;
    });
  }));

  const serviceSelect = document.getElementById('service-select');
  document.querySelectorAll('.service-card, [data-service]').forEach(card => {
    card.addEventListener('click', () => {
      const service = card.dataset.service;
      if (serviceSelect && service) serviceSelect.value = service;
    });
  });

  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-feedback');
  const contactEmail = CONFIG.contactEmail;
  const submitButton = form.querySelector('.submit-button');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const name = String(values.get('name') || '').trim();
    const email = String(values.get('email') || '').trim();
    const service = String(values.get('service') || '').trim();
    const message = String(values.get('message') || '').trim();
    const phone = String(values.get('phone') || '').trim();
    if (values.get('botcheck')) return;
    if (!name || !email || !service || message.length < 10) {
      status.textContent = 'Please complete all required fields before continuing.';
      return;
    }
    const subject = `[ShuvroLabs Project Inquiry] ${service} — ${name}`;
    const body = `Hello ShuvroLabs,\n\nI'd like to discuss a new project.\n\nName: ${name}\nEmail: ${email}\nPhone/WhatsApp: ${phone || '-'}\nInterested in: ${service}\n\nProject details:\n${message}\n\nThank you,\n${name}`;
    if (CONFIG.web3formsKey) {
      submitButton.disabled = true;
      status.textContent = 'Sending your inquiry...';
      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ access_key: CONFIG.web3formsKey, subject, from_name: 'ShuvroLabs Website', name, email, phone, service, message })
        });
        const result = await response.json();
        if (!result.success) throw new Error(result.message || 'Send failed');
        form.reset();
        status.textContent = 'Thank you! Your inquiry has been sent. We will reply within 24 hours.';
      } catch (error) {
        status.textContent = `Sorry, the message could not be sent. Please email us at ${contactEmail}.`;
      } finally {
        submitButton.disabled = false;
      }
      return;
    }
    const url = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = 'Your email app should open with the inquiry prepared. Please press Send there to complete it. If nothing opens, email us directly using the address alongside this form.';
    window.location.href = url;
  });
})();
