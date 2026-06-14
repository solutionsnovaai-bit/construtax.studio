/* ============================================================
   CONSTRUTAX STUDIO — GSAP SCROLL ANIMATIONS
   ScrollTrigger.batch() em grupos — GPU-only: transform + opacity.
   Só ativa em desktop (>768px) e respeita prefers-reduced-motion.
   Não conflita com o IntersectionObserver do .reveal (CSS-based).
   ============================================================ */

(function () {
  'use strict';

  /* ── Guard: sem GSAP ou reduced-motion → no-op ── */
  function shouldAnimate() {
    if (!window.gsap || !window.ScrollTrigger) return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return true;
  }

  /* ── Kill todos os triggers existentes ── */
  function killAll() {
    if (window.ScrollTrigger) {
      window.ScrollTrigger.getAll().forEach(t => t.kill());
      window.ScrollTrigger.clearMatchMedia();
    }
  }

  /* ── Aplica will-change antes + remove depois ── */
  function willChange(els, value) {
    (Array.isArray(els) ? els : [els]).forEach(el => {
      if (el && el.style) el.style.willChange = value;
    });
  }

  /* ── Configuração base ── */
  const BASE = { ease: 'power2.out', duration: 0.55 };

  /* ── Batch helper ── */
  function batch(selector, fromVars, toVars, opts) {
    const ST  = window.ScrollTrigger;
    const els = document.querySelectorAll(selector);
    if (!els.length) return;

    ST.batch(selector, {
      onEnter: batch => {
        willChange(batch, 'transform, opacity');
        window.gsap.fromTo(batch, fromVars, {
          ...BASE,
          ...toVars,
          stagger: opts.stagger || 0,
          onComplete: () => willChange(batch, 'auto'),
        });
      },
      once:  true,
      start: opts.start || 'top 88%',
    });
  }

  /* ── Animações por view ── */
  window.initViewAnimations = function (view) {
    if (!shouldAnimate()) return;
    if (window.innerWidth < 768) return; // mobile: CSS-only, keep it fast

    killAll();

    const gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);

    /* ── Dashboard ── */
    if (view === 'dashboard') {
      /* Próximos posts — fade + slide up leve */
      batch(
        '.post-preview-item',
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0,  duration: 0.42 },
        { stagger: 0.07, start: 'top 90%' }
      );

      /* Quick-action items */
      batch(
        '.content-area [style*="flex-direction: column"] > div[style]',
        { opacity: 0, x: -14 },
        { opacity: 1, x: 0,  duration: 0.38 },
        { stagger: 0.06, start: 'top 92%' }
      );
    }

    /* ── Calendar ── */
    if (view === 'calendar') {
      /* Dias do calendário — ondulação diagonal com stagger */
      batch(
        '.cal-day:not(.empty)',
        { opacity: 0, y: 16, scale: 0.96 },
        { opacity: 1, y: 0,  scale: 1, duration: 0.42, ease: 'power2.out' },
        { stagger: 0.012, start: 'top 90%' }
      );

      /* Legenda */
      batch(
        '.legend-item',
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0,  duration: 0.35 },
        { stagger: 0.05, start: 'top 95%' }
      );
    }

    /* ── Tasks ── */
    if (view === 'tasks') {
      batch(
        '.task-item',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
        { stagger: 0.055, start: 'top 90%' }
      );
    }

    /* ── Assistant: chips de atalho ── */
    if (view === 'assistant') {
      batch(
        '.quick-chip',
        { opacity: 0, y: 12, scale: 0.94 },
        { opacity: 1, y: 0,  scale: 1, duration: 0.35, ease: 'back.out(1.4)' },
        { stagger: 0.045, start: 'top 88%' }
      );
    }
  };

})();
