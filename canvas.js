/* ============================================================
   CONSTRUTAX STUDIO — ATMOSPHERIC CANVAS v2
   Fine green dot particles + mouse parallax. Dark mode only.
   Canvas 2D leve — sem bibliotecas externas.
   ============================================================ */

(function () {
  'use strict';

  const DARK_COLORS  = ['#416f40','#2d6a3f','#4a7a48','#3a6039'];
  const LIGHT_COLORS = ['#2d5a2c','#3a6039','#335c32','#416f40'];

  function rand(a, b) { return a + Math.random() * (b - a); }

  function getCount() {
    if (window.innerWidth < 480) return 18;
    if (window.innerWidth < 768) return 28;
    return 55;
  }

  function makeParticle(W, H) {
    return {
      x:          rand(0, W),
      y:          rand(0, H),
      r:          rand(0.9, 2.8),
      baseOpacity:rand(0.12, 0.42),
      vx:         rand(-0.18, 0.18),
      vy:         rand(-0.22, -0.04),
      depth:      rand(0.25, 1.0),
      colorIdx:   Math.floor(Math.random() * 4),
      pulse:      rand(0, Math.PI * 2),
      pulseSpeed: rand(0.007, 0.016),
    };
  }

  window.initAtmosphericCanvas = function (canvasEl) {
    if (!canvasEl) return;

    const ctx = canvasEl.getContext('2d');
    let W = 0, H = 0;
    let particles = [];
    let mouseX = 0, mouseY = 0;
    let targetMX = 0, targetMY = 0;
    let animId = null;
    const PARALLAX_MAX = 22;

    function resize() {
      W = canvasEl.width  = window.innerWidth;
      H = canvasEl.height = window.innerHeight;
      const n = getCount();
      while (particles.length < n) particles.push(makeParticle(W, H));
      if (particles.length > n) particles.length = n;
    }

    function init() {
      resize();
      particles = Array.from({ length: getCount() }, () => makeParticle(W, H));
    }

    function tick() {
      const theme    = document.documentElement.getAttribute('data-theme') || 'dark';
      const isDark   = theme === 'dark';
      const colorArr = isDark ? DARK_COLORS : LIGHT_COLORS;
      /* Light mode: slightly higher base opacity so dots are visible on off-white */
      const opacityScale = isDark ? 1.0 : 1.35;
      const maxAlpha     = isDark ? 0.58 : 0.50;

      ctx.clearRect(0, 0, W, H);

      mouseX += (targetMX - mouseX) * 0.04;
      mouseY += (targetMY - mouseY) * 0.04;

      const mxNorm = (mouseX / W - 0.5);
      const myNorm = (mouseY / H - 0.5);

      /* Group by colorIdx for fewer fillStyle changes */
      const groups = [[], [], [], []];
      particles.forEach(p => groups[p.colorIdx % 4].push(p));

      groups.forEach((pts, ci) => {
        if (!pts.length) return;
        ctx.fillStyle = colorArr[ci % colorArr.length];
        pts.forEach(p => {
          p.pulse += p.pulseSpeed;
          const op = (p.baseOpacity + Math.sin(p.pulse) * 0.055) * opacityScale;
          const ox = p.depth * mxNorm * PARALLAX_MAX;
          const oy = p.depth * myNorm * PARALLAX_MAX * 0.6;

          ctx.globalAlpha = Math.max(0, Math.min(maxAlpha, op));
          ctx.beginPath();
          ctx.arc(p.x + ox, p.y + oy, p.r, 0, Math.PI * 2);
          ctx.fill();

          p.x += p.vx;
          p.y += p.vy;
          if (p.y < -p.r * 3)  p.y = H + p.r;
          if (p.y > H + p.r)   p.y = -p.r * 3;
          if (p.x < -p.r * 3)  p.x = W + p.r;
          if (p.x > W + p.r)   p.x = -p.r * 3;
        });
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(tick);
    }

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', e => { targetMX = e.clientX; targetMY = e.clientY; });
    window.addEventListener('touchmove', e => {
      if (e.touches.length) { targetMX = e.touches[0].clientX; targetMY = e.touches[0].clientY; }
    }, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { if (animId) { cancelAnimationFrame(animId); animId = null; } }
      else if (!animId) tick();
    });

    init();
    tick();
    return { stop: () => { if (animId) cancelAnimationFrame(animId); } };
  };
})();
