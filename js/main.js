/* ============================================
   ADVATECH RESOURCE — main.js
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- STICKY NAV ---- */
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        header.style.background = 'rgba(13,13,13,0.97)';
      } else {
        header.style.background = 'rgba(13,13,13,0.92)';
      }
    });
  }

  /* ---- HAMBURGER ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
  }

  /* ---- HERO SLIDER ---- */
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  let current = 0;
  let autoSlide;

  function goToSlide(n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startAuto() {
    autoSlide = setInterval(() => goToSlide(current + 1), 5500);
  }

  function resetAuto() {
    clearInterval(autoSlide);
    startAuto();
  }

  if (slides.length > 0) {
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goToSlide(i); resetAuto(); });
    });
    if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(current - 1); resetAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(current + 1); resetAuto(); });
    startAuto();
  }

  /* ---- PRODUCT CATEGORY TABS ---- */
  const catBtns = document.querySelectorAll('.prod-cat-btn');
  const prodSections = document.querySelectorAll('.prod-section');

  if (catBtns.length > 0) {
    catBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;

        catBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        prodSections.forEach(sec => sec.classList.remove('active'));
        const targetSec = document.getElementById(target);
        if (targetSec) {
          targetSec.classList.add('active');
          // smooth scroll to section
          setTimeout(() => {
            targetSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 50);
        }
      });
    });

    // Handle URL hash on load (e.g. products.html#fiberoptics)
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const matchBtn = document.querySelector(`.prod-cat-btn[data-target="${hash}"]`);
      const matchSec = document.getElementById(hash);
      if (matchBtn && matchSec) {
        catBtns.forEach(b => b.classList.remove('active'));
        prodSections.forEach(s => s.classList.remove('active'));
        matchBtn.classList.add('active');
        matchSec.classList.add('active');
        setTimeout(() => matchSec.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
      }
    }
  }

  /* ---- CONTACT FORM ---- */
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Basic validation
      const requiredFields = form.querySelectorAll('[required]');
      let valid = true;
      requiredFields.forEach(field => {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = '#c0392b';
          valid = false;
        }
      });
      if (!valid) return;

      // Simulate submission
      const submitBtn = form.querySelector('.form-submit');
      submitBtn.textContent = 'Sending…';
      submitBtn.style.opacity = '0.6';
      setTimeout(() => {
        submitBtn.style.display = 'none';
        if (successMsg) successMsg.style.display = 'flex';
        form.reset();
      }, 1200);
    });
  }

  /* ---- SCROLL REVEAL ---- */
  const revealEls = document.querySelectorAll(
    '.about-grid, .cat-card, .pillar, .subprod-card, .contact-detail-item, .prod-intro-block, .stat-item, .subprod-group'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(el => observer.observe(el));

});
