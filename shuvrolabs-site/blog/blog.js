(() => {
  'use strict';

  // ===== AFFILIATE LINKS: paste your own affiliate links here =====
  // Only programs that pay in Bangladesh via bKash / Nagad / Rocket.
  // After each program approves you, copy your tracking link from its
  // affiliate dashboard and replace the plain link below.
  // Every link on the blog with data-aff="KEY" uses the value for that KEY.
  const AFFILIATE = {
    datahostbd: 'https://www.datahostbd.com/',  // DataHost BD: bKash, Nagad, bank
    bdwebs: 'https://www.bdwebs.com/',          // BDWebs: bKash, Rocket, Nagad
    bdshop: 'https://www.bdshop.com/',          // BD Shop: bKash, Rocket, bank
    tenms: 'https://10minuteschool.com/'        // 10 Minute School: bKash
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
