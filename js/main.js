/* ============================================================
   Ambiance Painting Inc. — main.js
   ============================================================ */

// ── Mobile nav toggle ────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    mobileNav.setAttribute('aria-hidden', String(!isOpen));
    // Toggle tabindex on all links inside mobile nav
    mobileNav.querySelectorAll('a').forEach(a => {
      a.setAttribute('tabindex', isOpen ? '0' : '-1');
    });
  });

  // Close mobile nav on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      mobileNav.querySelectorAll('a').forEach(a => a.setAttribute('tabindex', '-1'));
    });
  });
}

// ── Header scroll shadow ──────────────────────────────────────
const header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ── Scroll reveal (IntersectionObserver) ─────────────────────
const revealEls = document.querySelectorAll('.fade-up, .fade-left, .fade-right');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => observer.observe(el));
} else {
  // Fallback: show all immediately
  revealEls.forEach(el => el.classList.add('visible'));
}

// ── Smooth scroll for anchor links ───────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = header ? header.offsetHeight : 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Formspree contact form ────────────────────────────────────
const form = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (form && formSuccess) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        form.hidden = true;
        formSuccess.hidden = false;
      } else {
        alert('There was an error sending your message. Please call us at (714) 833-6937.');
      }
    } catch {
      alert('There was an error sending your message. Please call us at (714) 833-6937.');
    }
  });
}
