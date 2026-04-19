/* ============================================================
   ArbCut — script.js
   Sections: header scroll state | active nav | mobile nav |
             hero reveal | scroll reveal | gallery lightbox |
             inquiry modal | sticky call btn
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     HEADER: .is-scrolled when hero is 80% scrolled past
     Transitions header from transparent/photo to cream/dark
     ---------------------------------------------------------- */
  const header = document.querySelector('.site-header');
  const heroSection = document.getElementById('hero');

  function updateHeader() {
    if (!header) return;
    const threshold = heroSection ? heroSection.offsetHeight * 0.8 : 200;
    header.classList.toggle('is-scrolled', window.scrollY > threshold);
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();


  /* ----------------------------------------------------------
     ACTIVE NAV: rust underline on the link whose section is
     most visible in the viewport
     ---------------------------------------------------------- */
  const navLinks = document.querySelectorAll('.site-nav__link[href^="#"]');

  if (navLinks.length) {
    const sectionIds = Array.from(navLinks).map(l => l.getAttribute('href').slice(1));
    const sections   = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          navLinks.forEach(l => l.classList.remove('is-active'));
          const link = document.querySelector(`.site-nav__link[href="#${entry.target.id}"]`);
          link && link.classList.add('is-active');
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach(s => navObserver.observe(s));
  }


  /* ----------------------------------------------------------
     MOBILE NAV
     ---------------------------------------------------------- */
  const hamburger   = document.querySelector('.hamburger');
  const mobileMenu  = document.getElementById('mobile-menu');
  const closeBtn    = document.querySelector('.mobile-menu__close');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link, .mobile-menu__cta');

  function openMenu() {
    mobileMenu.hidden = false;
    mobileMenu.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    mobileMenu.querySelector('.mobile-menu__link') && mobileMenu.querySelector('.mobile-menu__link').focus();
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    mobileMenu.hidden = true;
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    hamburger && hamburger.focus();
  }

  hamburger && hamburger.addEventListener('click', () => {
    mobileMenu.hidden ? openMenu() : closeMenu();
  });
  closeBtn  && closeBtn.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && !mobileMenu.hidden) closeMenu();
  });

  mobileMenu && mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMenu();
  });


  /* ----------------------------------------------------------
     HERO REVEAL: staggered fade-up on load
     ---------------------------------------------------------- */
  function revealHero() {
    const items = document.querySelectorAll('.hero .js-reveal');
    setTimeout(() => items.forEach(el => el.classList.add('is-visible')), 80);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', revealHero);
  } else {
    revealHero();
  }


  /* ----------------------------------------------------------
     SCROLL REVEAL: IntersectionObserver for .js-reveal-scroll
     ---------------------------------------------------------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.js-reveal-scroll').forEach(el => {
    revealObserver.observe(el);
  });


  /* ----------------------------------------------------------
     GALLERY LIGHTBOX
     ---------------------------------------------------------- */
  const lightbox    = document.getElementById('lightbox');
  const lbImg       = lightbox && lightbox.querySelector('.lightbox__img');
  const lbCaption   = lightbox && lightbox.querySelector('.lightbox__caption');
  const lbClose     = lightbox && lightbox.querySelector('.lightbox__close');
  const lbPrev      = lightbox && lightbox.querySelector('.lightbox__prev');
  const lbNext      = lightbox && lightbox.querySelector('.lightbox__next');
  const galleryItems = Array.from(document.querySelectorAll('.gallery__item'));

  let currentIndex = 0;

  function openLightbox(index) {
    if (!lightbox) return;
    currentIndex = index;
    const item = galleryItems[index];
    lbImg.src = item.dataset.src;
    lbImg.alt = item.querySelector('img').alt;
    lbCaption.textContent = item.dataset.caption || '';
    lightbox.hidden = false;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    lbClose && lbClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.hidden = true;
    document.body.style.overflow = '';
    // Return focus to the triggering gallery item
    galleryItems[currentIndex] && galleryItems[currentIndex].focus();
  }

  function navigate(dir) {
    const next = (currentIndex + dir + galleryItems.length) % galleryItems.length;
    openLightbox(next);
  }

  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  lbClose && lbClose.addEventListener('click', closeLightbox);
  lbPrev  && lbPrev.addEventListener('click', () => navigate(-1));
  lbNext  && lbNext.addEventListener('click', () => navigate(1));

  // Keyboard nav inside lightbox
  document.addEventListener('keydown', (e) => {
    if (!lightbox || lightbox.hidden) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });

  // Close on backdrop click
  lightbox && lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Swipe support for mobile lightbox
  let touchStartX = 0;
  lightbox && lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  lightbox && lightbox.addEventListener('touchend', (e) => {
    const delta = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(delta) > 50) navigate(delta < 0 ? 1 : -1);
  }, { passive: true });


  /* ----------------------------------------------------------
     INQUIRY MODAL: open/close, focus trap, Esc, backdrop click
     ---------------------------------------------------------- */
  const inquiryModal  = document.getElementById('inquiry-modal');
  const modalBackdrop = inquiryModal && inquiryModal.querySelector('.inquiry-modal__backdrop');
  const modalCloseBtn = inquiryModal && inquiryModal.querySelector('.inquiry-modal__close');
  const modalForm     = document.getElementById('modal-contact-form');

  let modalTriggerEl = null;

  function openModal(triggerEl) {
    if (!inquiryModal) return;
    modalTriggerEl = triggerEl || null;
    inquiryModal.hidden = false;
    document.body.style.overflow = 'hidden';
    if (mobileMenu && !mobileMenu.hidden) closeMenu();
    const firstInput = inquiryModal.querySelector(
      'input:not([type="hidden"]):not([name="botcheck"])'
    );
    firstInput && setTimeout(() => firstInput.focus(), 40);
  }

  function closeModal() {
    if (!inquiryModal) return;
    inquiryModal.hidden = true;
    document.body.style.overflow = '';
    modalTriggerEl && modalTriggerEl.focus();
    modalTriggerEl = null;
  }

  document.querySelectorAll('[data-modal-trigger]').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn));
  });

  modalCloseBtn && modalCloseBtn.addEventListener('click', closeModal);
  modalBackdrop && modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && inquiryModal && !inquiryModal.hidden) closeModal();
  });

  if (inquiryModal) {
    inquiryModal.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const focusable = Array.from(inquiryModal.querySelectorAll(
        'button:not([disabled]), input:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      )).filter(el => !el.closest('[hidden]'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    });
  }

  modalForm && modalForm.addEventListener('submit', () => {
    modalForm.classList.add('is-submitting');
  });


  /* ----------------------------------------------------------
     CONTACT FORM: loading state while submitting
     ---------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  contactForm && contactForm.addEventListener('submit', () => {
    contactForm.classList.add('is-submitting');
  });


  /* ----------------------------------------------------------
     STICKY CALL BUTTON: hide when form or footer is in view
     ---------------------------------------------------------- */
  const stickyCall = document.getElementById('sticky-call');
  const hideAnchors = [
    document.getElementById('kontaktai'),
    document.querySelector('.site-footer'),
  ].filter(Boolean);

  if (stickyCall && hideAnchors.length) {
    const callObserver = new IntersectionObserver(
      (entries) => {
        stickyCall.classList.toggle('is-hidden', entries.some(e => e.isIntersecting));
      },
      { threshold: 0.05 }
    );
    hideAnchors.forEach(el => callObserver.observe(el));
  }


  /* ----------------------------------------------------------
     SMOOTH SCROLL for anchor links
     ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      if (id === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();
