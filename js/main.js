/* ============================================================
   PRIYA GOYAL — PORTFOLIO WEBSITE
   Main JavaScript — Animations, Scroll, Interactions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── LOADER ────────────────────────────────────────────────
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      // Trigger initial reveals after loader hides
      setTimeout(() => {
        revealElements();
      }, 300);
    }, 1600);
  });

  // ─── PARTICLES BACKGROUND ─────────────────────────────────
  const particlesContainer = document.getElementById('particles');
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.width = Math.random() * 3 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.animationDuration = Math.random() * 15 + 10 + 's';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particlesContainer.appendChild(particle);
  }

  // ─── NAVBAR SCROLL EFFECT ─────────────────────────────────
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  function handleScroll() {
    const scrollY = window.scrollY;

    // Navbar background
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Active nav highlighting
    updateActiveNav();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // Back to top click
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ─── ACTIVE NAV HIGHLIGHTING ──────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-links a, .mobile-menu a');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinksAll.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // ─── SMOOTH SCROLL ────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        const navHeight = navbar.offsetHeight;
        const targetPosition = targetEl.offsetTop - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }

      // Close mobile menu if open
      closeMobileMenu();
    });
  });

  // ─── MOBILE MENU ──────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');

  function openMobileMenu() {
    hamburger.classList.add('active');
    mobileMenu.classList.add('open');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', () => {
    if (mobileMenu.classList.contains('open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileOverlay.addEventListener('click', closeMobileMenu);

  // ─── TYPING EFFECT ────────────────────────────────────────
  const typingOutput = document.getElementById('typingOutput');
  const designations = [
    'Data Analytics Lead',
    'Business Intelligence',
    'Business Systems Analysis',
    'Quality Engineering'
  ];

  let designationIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function typeDesignation() {
    const current = designations[designationIndex];

    if (isDeleting) {
      typingOutput.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typingOutput.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === current.length) {
      // Pause at end of word
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      designationIndex = (designationIndex + 1) % designations.length;
      typingSpeed = 400;
    }

    setTimeout(typeDesignation, typingSpeed);
  }

  // Start typing after loader
  setTimeout(typeDesignation, 2200);

  // ─── SCROLL REVEAL (Intersection Observer) ────────────────
  const revealObserverOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Don't unobserve stagger-children so they can re-trigger if needed
        if (!entry.target.classList.contains('stagger-children')) {
          revealObserver.unobserve(entry.target);
        }
      }
    });
  }, revealObserverOptions);

  function revealElements() {
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');
    revealEls.forEach(el => {
      revealObserver.observe(el);
    });
  }

  // Initial reveal call (fallback if load event already fired)
  revealElements();

  // ─── SKILL BARS ANIMATION ─────────────────────────────────
  const skillsSection = document.getElementById('skillsGrid');
  let skillsAnimated = false;

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !skillsAnimated) {
        skillsAnimated = true;
        animateSkillBars();
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  if (skillsSection) {
    skillObserver.observe(skillsSection);
  }

  function animateSkillBars() {
    // Animate category bars
    const catFills = document.querySelectorAll('.skill-cat-fill');
    catFills.forEach((fill, index) => {
      setTimeout(() => {
        const targetWidth = fill.getAttribute('data-width');
        fill.style.width = targetWidth + '%';
      }, index * 100);
    });

    // Animate individual skill bars
    const skillFills = document.querySelectorAll('.skill-fill');
    skillFills.forEach((fill, index) => {
      setTimeout(() => {
        const targetWidth = fill.getAttribute('data-width');
        fill.style.width = targetWidth + '%';
      }, index * 50 + 300);
    });
  }

  // ─── COUNTER ANIMATION ────────────────────────────────────
  const statsSection = document.getElementById('statsSection');
  let countersAnimated = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        animateCounters();
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  if (statsSection) {
    counterObserver.observe(statsSection);
  }

  function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000; // 2 seconds
      const startTime = performance.now();

      function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out quad)
        const easedProgress = 1 - (1 - progress) * (1 - progress);

        const currentValue = Math.floor(easedProgress * target);
        counter.textContent = currentValue;

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      }

      requestAnimationFrame(updateCounter);
    });
  }

  // ─── CONTACT FORM HANDLING ─────────────────────────────────
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      // Basic validation
      if (!name || !email || !subject || !message) {
        showFormStatus('Please fill in all fields.', 'error');
        return;
      }

      if (!isValidEmail(email)) {
        showFormStatus('Please enter a valid email address.', 'error');
        return;
      }

      // Construct mailto link
      const mailtoSubject = encodeURIComponent(subject);
      const mailtoBody = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
      );
      const mailtoLink = `mailto:priyagoyalofficial@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

      window.location.href = mailtoLink;

      showFormStatus('Opening your email client...', 'success');

      // Reset form after a delay
      setTimeout(() => {
        contactForm.reset();
        formStatus.style.display = 'none';
      }, 3000);
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showFormStatus(message, type) {
    formStatus.textContent = message;
    formStatus.className = 'form-status ' + type;
    formStatus.style.display = 'block';
  }

  // ─── KEYBOARD NAVIGATION SUPPORT ──────────────────────────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });

  // ─── PERFORMANCE: Throttle scroll events ──────────────────
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

});
