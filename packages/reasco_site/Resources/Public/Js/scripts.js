/**
 * Reasco Site Package – Main JavaScript
 */
(function () {
  'use strict';

  /* ─── Navigation scroll state ─────────────────────────────────────────── */
  const nav = document.querySelector('.site-nav');
  if (nav) {
    const onScroll = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── Mobile nav toggle ────────────────────────────────────────────────── */
  const hamburger = document.querySelector('.site-nav__hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    const closeBtn = mobileNav.querySelector('.mobile-nav__close');

    const openNav = () => {
      mobileNav.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    };

    const closeNav = () => {
      mobileNav.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', openNav);
    if (closeBtn) closeBtn.addEventListener('click', closeNav);

    mobileNav.addEventListener('click', (e) => {
      if (e.target === mobileNav) closeNav();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) closeNav();
    });
  }

  /* ─── Mobile nav sub-menu accordion ────────────────────────────────────── */
  document.querySelectorAll('.mobile-nav__item--has-children > a').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = link.parentElement;
      const isOpen = parent.classList.contains('is-open');
      document.querySelectorAll('.mobile-nav__item--has-children').forEach((el) =>
        el.classList.remove('is-open')
      );
      if (!isOpen) parent.classList.add('is-open');
    });
  });

  /* ─── Intersection Observer – reveal animations ────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ─── FAQ accordion ────────────────────────────────────────────────────── */
  document.querySelectorAll('.faq-item').forEach((item) => {
    const trigger = item.querySelector('.faq-item__question');
    const answer = item.querySelector('.faq-item__answer');
    if (!trigger || !answer) return;

    trigger.setAttribute('aria-expanded', 'false');
    answer.setAttribute('hidden', '');

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.faq-item').forEach((other) => {
        const t = other.querySelector('.faq-item__question');
        const a = other.querySelector('.faq-item__answer');
        if (t && a) {
          t.setAttribute('aria-expanded', 'false');
          a.setAttribute('hidden', '');
          other.classList.remove('is-open');
        }
      });

      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        answer.removeAttribute('hidden');
        item.classList.add('is-open');
      }
    });
  });

  /* ─── Contact form feedback ────────────────────────────────────────────── */
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      const btn = contactForm.querySelector('button[type="submit"]');
      if (!btn) return;

      const original = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Wird gesendet…';

      // If the form has a real action target, let it submit naturally.
      // For static previews without a backend, show a local success message.
      if (!contactForm.action || contactForm.action === window.location.href) {
        e.preventDefault();
        setTimeout(() => {
          contactForm.innerHTML =
            '<div class="contact-form__success" role="alert">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="48" height="48" aria-hidden="true">' +
            '<path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>' +
            '<polyline points="22 4 12 14.01 9 11.01"/>' +
            '</svg>' +
            '<h3>Nachricht gesendet!</h3>' +
            '<p>Vielen Dank für Ihre Anfrage. Wir melden uns innerhalb von 1–2 Werktagen bei Ihnen.</p>' +
            '</div>';
        }, 600);
      }
    });
  }

  /* ─── Smooth anchor scrolling ──────────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const navHeight = nav ? nav.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ─── Stats counter animation ──────────────────────────────────────────── */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length && 'IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 1400;
          const start = performance.now();

          const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          countObserver.unobserve(el);
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => countObserver.observe(el));
  }

  /* ─── Active nav link highlighting ────────────────────────────────────── */
  const currentPath = window.location.pathname;
  document.querySelectorAll('.site-nav__link, .mobile-nav__link').forEach((link) => {
    if (link.getAttribute('href') === currentPath) {
      link.setAttribute('aria-current', 'page');
      link.closest('li')?.classList.add('is-active');
    }
  });
})();
