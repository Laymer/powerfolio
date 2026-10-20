/* Igor Kopestenski — Portfolio
   Lightweight interactivity: theme, nav, scroll reveals
*/

(() => {
  'use strict';

  /* ---------- Theme ---------- */
  const root = document.documentElement;
  const themeKey = 'ik-theme';
  let stored;
  try { stored = localStorage.getItem(themeKey); } catch { /* Storage is optional. */ }
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  if (stored === 'light' || (!stored && prefersLight)) {
    root.setAttribute('data-theme', 'light');
  }

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) themeToggle.hidden = false;
  const updateThemeLabel = () => {
    const light = root.getAttribute('data-theme') === 'light';
    themeToggle?.setAttribute('aria-label', `Switch to ${light ? 'dark' : 'light'} theme`);
  };
  updateThemeLabel();
  themeToggle?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    if (current === 'light') {
      root.removeAttribute('data-theme');
      try { localStorage.setItem(themeKey, 'dark'); } catch { /* Storage is optional. */ }
    } else {
      root.setAttribute('data-theme', 'light');
      try { localStorage.setItem(themeKey, 'light'); } catch { /* Storage is optional. */ }
    }
    updateThemeLabel();
  });

  /* ---------- Nav scroll state + mobile menu ---------- */
  const nav = document.getElementById('nav');
  const navLinks = document.querySelector('.nav-links');
  const menuToggle = document.getElementById('menu-toggle');
  root.classList.add('has-js');
  if (menuToggle) menuToggle.hidden = false;
  const closeMenu = () => {
    navLinks?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  };

  const handleScroll = () => {
    if (window.scrollY > 12) nav?.classList.add('scrolled');
    else nav?.classList.remove('scrolled');
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  menuToggle?.addEventListener('click', () => {
    const open = navLinks?.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(!!open));
  });

  navLinks?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navLinks?.classList.contains('open')) {
      closeMenu();
      menuToggle?.focus();
    }
  });
  window.matchMedia('(min-width: 1061px)').addEventListener('change', closeMenu);

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.02, rootMargin: '0px 0px -20px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
