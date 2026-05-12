/* Igor Kopestenski — Portfolio
   Lightweight interactivity: theme, nav, scroll reveals
*/

(() => {
  'use strict';

  /* ---------- Theme ---------- */
  const root = document.documentElement;
  const themeKey = 'ik-theme';
  const stored = localStorage.getItem(themeKey);
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  if (stored === 'light' || (!stored && prefersLight)) {
    root.setAttribute('data-theme', 'light');
  }

  const themeToggle = document.getElementById('theme-toggle');
  themeToggle?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    if (current === 'light') {
      root.removeAttribute('data-theme');
      localStorage.setItem(themeKey, 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem(themeKey, 'light');
    }
  });

  /* ---------- Nav scroll state + mobile menu ---------- */
  const nav = document.getElementById('nav');
  const navLinks = document.querySelector('.nav-links');
  const menuToggle = document.getElementById('menu-toggle');

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
      navLinks.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
