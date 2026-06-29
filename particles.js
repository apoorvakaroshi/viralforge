// ═══════════════════════════════════════════════════════════════
// VIRALFORGE — Particle System
// ═══════════════════════════════════════════════════════════════

class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.connections = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.animationId = null;
    this.config = {
      count: 80,
      maxDist: 120,
      speed: 0.5,
      size: { min: 1, max: 3 },
      colors: ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4', '#f59e0b'],
      mouse: { radius: 150, force: 0.5 }
    };
    this.init();
    this.bindEvents();
    this.animate();
  }

  init() {
    this.resize();
    this.particles = [];
    for (let i = 0; i < this.config.count; i++) {
      this.particles.push(this.createParticle());
    }
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticle(x, y) {
    const cfg = this.config;
    return {
      x: x || Math.random() * this.canvas.width,
      y: y || Math.random() * this.canvas.height,
      vx: (Math.random() - 0.5) * cfg.speed,
      vy: (Math.random() - 0.5) * cfg.speed,
      size: Math.random() * (cfg.size.max - cfg.size.min) + cfg.size.min,
      color: cfg.colors[Math.floor(Math.random() * cfg.colors.length)],
      alpha: Math.random() * 0.6 + 0.2,
      life: 1,
      decay: Math.random() * 0.002 + 0.001,
      pulse: Math.random() * Math.PI * 2
    };
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });
    this.canvas.addEventListener('click', (e) => {
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const p = this.createParticle(e.clientX, e.clientY);
        p.vx = Math.cos(angle) * 2;
        p.vy = Math.sin(angle) * 2;
        p.size = 3;
        this.particles.push(p);
      }
    });
  }

  update() {
    this.particles.forEach((p, idx) => {
      // Mouse interaction
      const dx = this.mouseX - p.x;
      const dy = this.mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < this.config.mouse.radius) {
        const force = (1 - dist / this.config.mouse.radius) * this.config.mouse.force;
        p.vx -= (dx / dist) * force * 0.05;
        p.vy -= (dy / dist) * force * 0.05;
      }

      // Pulse
      p.pulse += 0.02;
      const pSize = p.size + Math.sin(p.pulse) * 0.5;

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Friction
      p.vx *= 0.99;
      p.vy *= 0.99;

      // Bounds
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

      p.x = Math.max(0, Math.min(this.canvas.width, p.x));
      p.y = Math.max(0, Math.min(this.canvas.height, p.y));
    });
  }

  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw connections
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const p1 = this.particles[i];
        const p2 = this.particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.config.maxDist) {
          const alpha = (1 - dist / this.config.maxDist) * 0.15;
          ctx.strokeStyle = `rgba(99,102,241,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    // Draw particles
    this.particles.forEach(p => {
      const pSize = p.size + Math.sin(p.pulse) * 0.5;
      ctx.beginPath();
      ctx.arc(p.x, p.y, pSize, 0, Math.PI * 2);

      // Gradient fill
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pSize * 2);
      grad.addColorStop(0, p.color + 'ff');
      grad.addColorStop(1, p.color + '00');
      ctx.fillStyle = grad;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    });
  }

  animate() {
    this.update();
    this.draw();
    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

window.particleSystem = null;

// Initialize when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Skip particles on mobile — saves CPU and avoids touch issues
  const isMobile = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  if (!isMobile) {
    window.particleSystem = new ParticleSystem('particleCanvas');
  } else {
    // Hide canvas entirely on mobile
    const canvas = document.getElementById('particleCanvas');
    if (canvas) canvas.style.display = 'none';
  }
});