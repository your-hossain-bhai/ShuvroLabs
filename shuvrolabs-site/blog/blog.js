(() => {
  'use strict';

  // ===== AFFILIATE LINKS: paste your own affiliate links here =====
  // Only programs that pay in Bangladesh via bKash / Nagad / Rocket.
  // After each program approves you, copy your tracking link from its
  // affiliate dashboard and replace the plain link below.
  // Every link on the blog with data-aff="KEY" uses the value for that KEY.
  const AFFILIATE = {
    datahostbd: 'https://www.datahostbd.com/?ref=MBSX4OVE',  // DataHost BD: bKash, Nagad, bank
    bdwebs: 'https://cp.bdwebs.com/s/regular-number-44/614',      // BDWebs web hosting (aff 614): bKash, Rocket, Nagad
    tenms: 'https://10ms.io/pXtusR',                           // 10 Minute School: bKash
    hostinger: 'https://www.hostinger.com/?REFERRALCODE=2N6MDHOSSQEW'  // Hostinger referral: PayPal / wire / Hostinger balance
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
