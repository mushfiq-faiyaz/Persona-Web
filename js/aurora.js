/**
 * Living Aurora Background & Floating Particles
 * High-performance 60fps canvas engine with smooth organic physics.
 */

(function () {
  const canvas = document.getElementById('aurora-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let animId = null;
  let mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  function initParticles() {
    particles = [];
    // Number of subtle floating dust particles (fewer on mobile for speed)
    const count = window.innerWidth < 768 ? 24 : 45;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.8 + 0.6,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.45 - 0.15, // float gently upwards
        alpha: Math.random() * 0.5 + 0.1,
        baseAlpha: Math.random() * 0.5 + 0.1,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  // Smooth mouse tracking
  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.targetX = -1000;
    mouse.targetY = -1000;
  });

  let time = 0;

  function render() {
    time += 0.006;

    // Smooth mouse lerp
    mouse.x += (mouse.targetX - mouse.x) * 0.08;
    mouse.y += (mouse.targetY - mouse.y) * 0.08;

    ctx.clearRect(0, 0, width, height);

    // 1. Draw Living Aurora Glowing Blobs
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';

    // Aurora blob 1 (Cyan / Ice light)
    const blob1X = width * 0.25 + Math.sin(time) * 140;
    const blob1Y = height * 0.35 + Math.cos(time * 0.8) * 90;
    const grad1 = ctx.createRadialGradient(blob1X, blob1Y, 10, blob1X, blob1Y, width * 0.55);
    grad1.addColorStop(0, isLight ? 'rgba(2, 132, 199, 0.08)' : 'rgba(0, 240, 255, 0.085)');
    grad1.addColorStop(0.6, isLight ? 'rgba(56, 189, 248, 0.03)' : 'rgba(14, 16, 85, 0.25)');
    grad1.addColorStop(1, 'transparent');
    ctx.fillStyle = grad1;
    ctx.fillRect(0, 0, width, height);

    // Aurora blob 2 (Indigo / Midnight pulse)
    const blob2X = width * 0.75 + Math.cos(time * 0.9) * 160;
    const blob2Y = height * 0.65 + Math.sin(time * 1.1) * 110;
    const grad2 = ctx.createRadialGradient(blob2X, blob2Y, 20, blob2X, blob2Y, width * 0.6);
    grad2.addColorStop(0, isLight ? 'rgba(99, 102, 241, 0.06)' : 'rgba(99, 102, 241, 0.075)');
    grad2.addColorStop(0.7, 'transparent');
    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, width, height);

    // 2. Floating Micro Particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.y += p.vy;
      p.x += p.vx + Math.sin(time * 2 + p.phase) * 0.2;

      // Mouse gentle repel
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        const force = (140 - dist) / 140;
        p.x += (dx / dist) * force * 1.8;
        p.y += (dy / dist) * force * 1.8;
        p.alpha = Math.min(0.85, p.baseAlpha + force * 0.4);
      } else {
        p.alpha += (p.baseAlpha - p.alpha) * 0.05;
      }

      // Wrap around bounds
      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      // Render particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = isLight
        ? `rgba(2, 132, 199, ${p.alpha * 0.7})`
        : `rgba(0, 240, 255, ${p.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = isLight ? 'rgba(2, 132, 199, 0.4)' : 'rgba(0, 240, 255, 0.6)';
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    animId = requestAnimationFrame(render);
  }

  window.addEventListener('resize', resize);
  resize();
  render();

  // Pause when document is hidden to conserve battery
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animId) cancelAnimationFrame(animId);
    } else {
      animId = requestAnimationFrame(render);
    }
  });
})();
