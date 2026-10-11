/**
 * Main Application Logic & Interactive Experience
 * Mushfiqur Rahman Faiyaz (Mushfiq) — Founder of RanFy Inc.
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. INTRO CURTAIN & HANDWRITING ANIMATION
  // =========================================================================
  const introCurtain = document.getElementById('intro-curtain');
  const skipBtn = document.getElementById('intro-skip-btn');

  function dismissIntro() {
    if (!introCurtain) return;
    introCurtain.classList.add('hidden');
    sessionStorage.setItem('ranfy_intro_seen', 'true');
    setTimeout(() => {
      introCurtain.style.display = 'none';
    }, 750);
  }

  window.replayIntro = function () {
    if (!introCurtain) return;
    introCurtain.style.display = 'flex';
    introCurtain.classList.remove('hidden');
    // Re-trigger animation by re-cloning SVG
    const svg = introCurtain.querySelector('.intro-logo-svg');
    if (svg) {
      const clone = svg.cloneNode(true);
      svg.parentNode.replaceChild(clone, svg);
    }
    setTimeout(dismissIntro, 2600);
  };

  if (introCurtain) {
    const hasSeen = sessionStorage.getItem('ranfy_intro_seen');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeen || prefersReducedMotion) {
      introCurtain.style.display = 'none';
      introCurtain.classList.add('hidden');
    } else {
      // Auto dismiss after handwriting animation completes (2.5s)
      const timer = setTimeout(dismissIntro, 2600);
      if (skipBtn) {
        skipBtn.addEventListener('click', () => {
          clearTimeout(timer);
          dismissIntro();
        });
      }
    }
  }

  // =========================================================================
  // 2. HERO LETTER-BY-LETTER REVEAL
  // =========================================================================
  function initHeroTextReveal() {
    const nameEl = document.querySelector('.hero-name');
    if (!nameEl) return;

    const words = nameEl.innerText.trim().split(/\s+/);
    nameEl.innerHTML = '';
    let charIndex = 0;

    words.forEach((wordText, wordIdx) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'word';

      const chars = wordText.split('');
      chars.forEach((char) => {
        const charSpan = document.createElement('span');
        charSpan.className = 'char';
        charSpan.textContent = char;
        charSpan.style.animationDelay = `${0.2 + charIndex * 0.045}s`;
        wordSpan.appendChild(charSpan);
        charIndex++;
      });

      nameEl.appendChild(wordSpan);

      // Add space between words
      if (wordIdx < words.length - 1) {
        const spaceSpan = document.createElement('span');
        spaceSpan.innerHTML = '&nbsp;';
        nameEl.appendChild(spaceSpan);
      }
    });
  }
  initHeroTextReveal();

  // =========================================================================
  // 3. CURSOR MAGIC (Desktop only)
  // =========================================================================
  const cursorGlow = document.querySelector('.cursor-glow');
  const cursorDot = document.querySelector('.cursor-dot');

  if (cursorGlow && cursorDot && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    });

    function loopCursor() {
      glowX += (mouseX - glowX) * 0.15;
      glowY += (mouseY - glowY) * 0.15;
      cursorGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(loopCursor);
    }
    loopCursor();

    // 3D Tilt & Magnetic Physics on Cards
    const tiltCards = document.querySelectorAll('.app-card, .fact-card, .about-card, .project-detail-card');
    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Set radial reflection coordinates
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Compute 3D rotation angle (max 6 degrees)
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });

    // Magnetic pull for buttons
    const magneticBtns = document.querySelectorAll('.icon-btn, .btn-primary, .btn-share, .status-pill');
    magneticBtns.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        btn.style.transform = `translate3d(${x * 0.2}px, ${y * 0.2}px, 0)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate3d(0, 0, 0)';
      });
    });
  }

  // =========================================================================
  // 4. THEME TOGGLE (Dark / Light)
  // =========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('ranfy_theme', theme);

    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      // Update icon
      if (theme === 'light') {
        themeToggleBtn.innerHTML = `
          <svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
        `;
        themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
      } else {
        themeToggleBtn.innerHTML = `
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
        `;
        themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
      }
    }
  }

  // Initialize theme from storage or default to dark (RanFy Midnight Navy)
  const savedTheme = localStorage.getItem('ranfy_theme') || 'dark';
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') || 'dark';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      if (window.soundApp) window.soundApp.themeSwitch();
      showToast(`Switched to ${nextTheme === 'dark' ? 'Midnight Navy' : 'Daylight Pearl'} mode`);
    });
  }

  // =========================================================================
  // 5. SOUND SYSTEM & TOGGLE (Strictly OFF by default)
  // =========================================================================
  const soundToggleBtn = document.getElementById('sound-toggle-btn');

  function updateSoundIcon(enabled) {
    if (!soundToggleBtn) return;
    if (enabled) {
      soundToggleBtn.innerHTML = `
        <svg viewBox="0 0 24 24">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      `;
      soundToggleBtn.setAttribute('title', 'Sound effects: On (Click to mute)');
      soundToggleBtn.style.color = 'var(--accent-cyan)';
    } else {
      soundToggleBtn.innerHTML = `
        <svg viewBox="0 0 24 24">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      `;
      soundToggleBtn.setAttribute('title', 'Sound effects: Off (Click to enable)');
      soundToggleBtn.style.color = 'var(--text-muted)';
    }
  }

  if (window.soundApp) {
    updateSoundIcon(window.soundApp.isEnabled());
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      if (window.soundApp) {
        const isNowOn = window.soundApp.toggleSound();
        updateSoundIcon(isNowOn);
        showToast(isNowOn ? '🔊 Audio effects enabled' : '🔇 Audio effects muted');
      }
    });
  }

  // Attach hover and click sounds to interactive items
  const interactiveSelector = 'a, button, .app-card, .fact-card, .status-pill, .social-btn';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelector) && window.soundApp) {
      window.soundApp.hover();
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest(interactiveSelector) && window.soundApp) {
      window.soundApp.click();
    }
  });

  // =========================================================================
  // 6. "BUILDING IN PUBLIC" MODAL
  // =========================================================================
  const statusPills = document.querySelectorAll('.status-pill');
  const bipModal = document.getElementById('bip-modal-backdrop');
  const bipCloseBtn = document.getElementById('bip-close-btn');

  function openBipModal() {
    if (!bipModal) return;
    bipModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeBipModal() {
    if (!bipModal) return;
    bipModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  statusPills.forEach((pill) => {
    pill.addEventListener('click', openBipModal);
  });

  if (bipCloseBtn) bipCloseBtn.addEventListener('click', closeBipModal);

  if (bipModal) {
    bipModal.addEventListener('click', (e) => {
      if (e.target === bipModal) closeBipModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeBipModal();
  });

  // =========================================================================
  // 7. "SHARE PROFILE" & TOAST NOTIFICATION
  // =========================================================================
  const shareBtns = document.querySelectorAll('.btn-share');

  function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 6L9 17l-5-5"></path>
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-out');
      setTimeout(() => toast.remove(), 320);
    }, 3200);
  }

  shareBtns.forEach((btn) => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const shareData = {
        title: 'Mushfiqur Rahman Faiyaz | Founder of RanFy Inc.',
        text: 'A thinker who loves to solve daily problems. Founder of RanFy Inc.',
        url: window.location.href
      };

      if (navigator.share) {
        try {
          await navigator.share(shareData);
          showToast('Profile shared successfully!');
          return;
        } catch (err) {
          // Fall back to clipboard if user dismissed or unsupported
        }
      }

      // Clipboard fallback
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(window.location.href).then(() => {
          showToast('🔗 Portfolio link copied to clipboard!');
        }).catch(() => {
          showToast('Link: ' + window.location.href);
        });
      } else {
        showToast('Link: ' + window.location.href);
      }
    });
  });

  // =========================================================================
  // 8. EASTER EGG: 5 LOGO CLICKS CELEBRATION
  // =========================================================================
  const brandLinks = document.querySelectorAll('.brand-link');
  let clickCount = 0;
  let clickTimer = null;

  brandLinks.forEach((brand) => {
    brand.addEventListener('click', (e) => {
      // Don't prevent link if on projects page navigating home on single click
      clickCount++;
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => {
        clickCount = 0;
      }, 2500);

      if (clickCount >= 5) {
        e.preventDefault();
        clickCount = 0;
        triggerCelebration();
      }
    });
  });

  function triggerCelebration() {
    if (window.soundApp) window.soundApp.celebrate();
    showToast('🚀 Hey there! Thanks for exploring. Mushfiq here — keep building cool things!');

    // Spawn celebratory particles
    for (let i = 0; i < 30; i++) {
      createSparkle();
    }
  }

  function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = `${50 + (Math.random() - 0.5) * 40}vw`;
    sparkle.style.top = `${40 + (Math.random() - 0.5) * 40}vh`;
    sparkle.style.width = `${Math.random() * 8 + 4}px`;
    sparkle.style.height = sparkle.style.width;
    sparkle.style.borderRadius = '50%';
    sparkle.style.backgroundColor = ['#00f0ff', '#818cf8', '#fbbf24', '#10b981'][Math.floor(Math.random() * 4)];
    sparkle.style.boxShadow = `0 0 12px ${sparkle.style.backgroundColor}`;
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '10001';
    sparkle.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
    document.body.appendChild(sparkle);

    requestAnimationFrame(() => {
      const destX = (Math.random() - 0.5) * 300;
      const destY = -Math.random() * 250 - 50;
      sparkle.style.transform = `translate(${destX}px, ${destY}px) scale(0)`;
      sparkle.style.opacity = '0';
    });

    setTimeout(() => sparkle.remove(), 1050);
  }

  // =========================================================================
  // 9. SMOOTH PAGE TRANSITIONS (Between Home & Projects)
  // =========================================================================
  const wipeCurtain = document.getElementById('page-wipe-curtain');
  const pageNavLinks = document.querySelectorAll('a[href$=".html"], a[href="./"], a[href="/"]');

  pageNavLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || link.getAttribute('target') === '_blank') return;

    link.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey) return;
      e.preventDefault();

      if (wipeCurtain) {
        wipeCurtain.classList.add('wipe-active');
        setTimeout(() => {
          window.location.href = href;
        }, 380);
      } else {
        window.location.href = href;
      }
    });
  });

  // Dismiss wipe on page reveal if navigating back
  window.addEventListener('pageshow', () => {
    if (wipeCurtain) wipeCurtain.classList.remove('wipe-active');
  });

  // =========================================================================
  // 10. SCROLL REVEAL (IntersectionObserver)
  // =========================================================================
  const revealElements = document.querySelectorAll('.app-card, .fact-card, .about-card, .resume-quote-card, .project-detail-card');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      observer.observe(el);
    });
  }

})();
