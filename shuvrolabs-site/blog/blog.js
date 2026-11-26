(() => {
  'use strict';

  // ===== AFFILIATE LINKS: paste your own affiliate links here =====
  // After Star Tech / Daraz / Hostinger approve you, copy your tracking link
  // from their affiliate dashboard and replace the plain link below.
  // Every link on the blog with data-aff="KEY" uses the value for that KEY.
  const AFFILIATE = {
    startechLaptops: 'https://www.startech.com.bd/laptop-notebook',
    darazLaptops: 'https://www.daraz.com.bd/laptops/',
    hostinger: 'https://www.hostinger.com/bd'
  };
  // ================================================================

  document.querySelectorAll('[data-aff]').forEach(link => {
    const url = AFFILIATE[link.dataset.aff];
    if (url) link.href = url;
    link.rel = 'sponsored noopener noreferrer';
    link.target = '_blank';
  });

  const header = document.getElementById('site-header');
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  if (toggle && nav) {
    const closeMenu = () => {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-is-open');
    };
    toggle.addEventListener('click', () => {
      const opening = !nav.classList.contains('open');
      nav.classList.toggle('open', opening);
      toggle.classList.toggle('open', opening);
      toggle.setAttribute('aria-expanded', String(opening));
      document.body.classList.toggle('menu-is-open', opening);
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  }
  if (header) {
    const update = () => header.classList.toggle('scrolled', window.scrollY > 22);
    window.addEventListener('scroll', update, { passive: true });
    update();
  }
})();
