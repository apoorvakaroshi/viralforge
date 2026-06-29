// ═══════════════════════════════════════════════════════════════
// VIRALFORGE — Animations & Effects
// ═══════════════════════════════════════════════════════════════

// ─── Custom Cursor (desktop only) ───────────────────────────
const isTouchDevice = () => window.matchMedia('(hover: none), (pointer: coarse)').matches;

const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');
let cursorX = 0, cursorY = 0;
let trailX = 0, trailY = 0;

if (!isTouchDevice()) {
document.addEventListener('mousemove', (e) => {
  cursorX = e.clientX;
  cursorY = e.clientY;
  if (cursor) {
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
  }
});
}

function animateTrail() {
  if (!isTouchDevice()) {
    trailX += (cursorX - trailX) * 0.15;
    trailY += (cursorY - trailY) * 0.15;
    if (cursorTrail) {
      cursorTrail.style.left = trailX + 'px';
      cursorTrail.style.top = trailY + 'px';
    }
  }
  requestAnimationFrame(animateTrail);
}
animateTrail();

if (!isTouchDevice()) {
document.addEventListener('mousedown', () => {
  if (cursor) {
    cursor.style.width = '20px';
    cursor.style.height = '20px';
  }
});
document.addEventListener('mouseup', () => {
  if (cursor) {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
  }
});

// Hover effects on interactive elements
document.addEventListener('mouseover', (e) => {
  if (e.target.matches('button, a, .campaign-card, .type-card, .vote-btn')) {
    if (cursor) { cursor.style.width = '20px'; cursor.style.height = '20px'; cursor.style.background = '#8b5cf6'; }
    if (cursorTrail) { cursorTrail.style.width = '50px'; cursorTrail.style.height = '50px'; cursorTrail.style.borderColor = '#8b5cf6'; }
  }
});

document.addEventListener('mouseout', (e) => {
  if (e.target.matches('button, a, .campaign-card, .type-card, .vote-btn')) {
    if (cursor) { cursor.style.width = '12px'; cursor.style.height = '12px'; cursor.style.background = 'var(--primary)'; }
    if (cursorTrail) { cursorTrail.style.width = '36px'; cursorTrail.style.height = '36px'; cursorTrail.style.borderColor = 'var(--primary)'; }
  }
});
}

// ─── Ripple Effect ───────────────────────────────────────────
function addRipple(e) {
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;
  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  btn.style.position = 'relative';
  btn.style.overflow = 'hidden';
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
}

document.addEventListener('click', (e) => {
  if (e.target.closest('button')) {
    addRipple({ currentTarget: e.target.closest('button'), clientX: e.clientX, clientY: e.clientY });
  }
});

// ─── Number Counter Animation ─────────────────────────────────
function animateCounter(el, target, duration = 2000) {
  const start = performance.now();
  const isLarge = target > 9999;
  el.style.opacity = '0';
  el.style.transform = 'translateY(10px)';
  setTimeout(() => {
    el.style.transition = 'opacity 0.5s, transform 0.5s';
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, 100);

  function update(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4); // Ease out quart
    const current = Math.floor(eased * target);
    el.textContent = isLarge ? current.toLocaleString() : current.toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString();
  }
  requestAnimationFrame(update);
}

// ─── Typed Text Effect ────────────────────────────────────────
const phrases = [
  'Stop',
  'React',
  'Share',
  'Viral',
  'Care'
];

let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
let typedTimeout;

function typeText() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const phrase = phrases[phraseIdx];

  if (!isDeleting && charIdx <= phrase.length) {
    el.textContent = phrase.slice(0, charIdx);
    charIdx++;
    typedTimeout = setTimeout(typeText, 120);
  } else if (!isDeleting && charIdx > phrase.length) {
    isDeleting = true;
    typedTimeout = setTimeout(typeText, 2000);
  } else if (isDeleting && charIdx >= 0) {
    el.textContent = phrase.slice(0, charIdx);
    charIdx--;
    typedTimeout = setTimeout(typeText, 60);
  } else {
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % phrases.length;
    charIdx = 0;
    typedTimeout = setTimeout(typeText, 200);
  }
}

// ─── Scroll Animations ────────────────────────────────────────
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Counter animation
      if (entry.target.hasAttribute('data-target')) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }

      // Stagger children
      const children = entry.target.querySelectorAll('.step-card, .type-card, .analytics-card');
      children.forEach((child, i) => {
        child.style.animationDelay = `${i * 0.1}s`;
        child.classList.add('animate-in');
      });
    }
  });
}, observerOptions);

// ─── Navbar Scroll Effect ─────────────────────────────────────
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  const scrollY = window.scrollY;

  if (navbar) {
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  lastScrollY = scrollY;
});

// ─── Page Transition ─────────────────────────────────────────
function pageTransition(callback) {
  const app = document.getElementById('app');
  if (app) {
    app.style.opacity = '0.7';
    app.style.transform = 'translateY(6px)';
    app.style.transition = 'opacity 0.15s, transform 0.15s';
    setTimeout(() => {
      callback();
      app.style.opacity = '1';
      app.style.transform = 'translateY(0)';
    }, 150);
  } else {
    callback();
  }
}

// ─── Confetti ─────────────────────────────────────────────────
function launchConfetti() {
  const colors = ['#6366f1', '#f59e0b', '#ef4444', '#10b981', '#ec4899', '#06b6d4'];
  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: fixed;
        width: ${Math.random() * 10 + 5}px;
        height: ${Math.random() * 10 + 5}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        top: -20px;
        left: ${Math.random() * 100}vw;
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        pointer-events: none;
        z-index: 9999;
        animation: confettiFall ${Math.random() * 2 + 1.5}s ease-in forwards;
        transform: rotate(${Math.random() * 360}deg);
      `;
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 4000);
    }, i * 30);
  }

  // Add confetti CSS if not exists
  if (!document.getElementById('confettiStyle')) {
    const style = document.createElement('style');
    style.id = 'confettiStyle';
    style.textContent = `
      @keyframes confettiFall {
        to {
          top: 110vh;
          transform: rotate(${Math.random() * 720}deg) translateX(${(Math.random() - 0.5) * 200}px);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// ─── Hover Sound (visual feedback) ───────────────────────────
function addHoverShake(el) {
  el.addEventListener('mouseenter', () => {
    el.style.animation = 'none';
    requestAnimationFrame(() => {
      el.style.animation = '';
    });
  });
}

// ─── Bar Chart Renderer ───────────────────────────────────────
function renderBarChart(containerId, data, maxVal) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  container.classList.add('bar-chart');

  data.forEach(item => {
    const pct = maxVal ? (item.value / maxVal) * 100 : item.value;
    container.innerHTML += `
      <div class="bar-item">
        <div class="bar-value">${item.value}</div>
        <div class="bar-fill" style="height:0" data-height="${Math.max(pct, 2)}%"></div>
        <div class="bar-label">${item.label}</div>
      </div>
    `;
  });

  // Animate bars after render
  setTimeout(() => {
    container.querySelectorAll('.bar-fill').forEach(bar => {
      bar.style.transition = 'height 1s cubic-bezier(0.4,0,0.2,1)';
      bar.style.height = bar.getAttribute('data-height');
    });
  }, 100);
}

// ─── Donut Chart ─────────────────────────────────────────────
function renderDonutChart(containerId, data) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const colors = ['#6366f1', '#f59e0b', '#ef4444', '#10b981'];
  const total = data.reduce((s, d) => s + d.value, 0);
  let angle = 0;
  const segments = data.map((d, i) => {
    const pct = (d.value / total) * 360;
    const start = angle;
    angle += pct;
    return { ...d, start, pct, color: colors[i] };
  });

  const gradStr = segments.map(s => `${s.color} ${s.start}deg ${s.start + s.pct}deg`).join(', ');

  container.innerHTML = `
    <div class="donut-chart">
      <div class="donut-ring" style="background:conic-gradient(${gradStr})"></div>
      <div class="donut-legend">
        ${segments.map(s => `
          <div class="legend-item">
            <div class="legend-dot" style="background:${s.color}"></div>
            <span>${s.label}: <strong>${s.value}</strong></span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ─── Heatmap ─────────────────────────────────────────────────
function renderHeatmap(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  const hours = Array.from({ length: 24 }, (_, i) => {
    const val = Math.floor(Math.random() * 100);
    return { hour: i, value: val };
  });

  hours.forEach(h => {
    const intensity = h.value / 100;
    const r = Math.floor(99 + (intensity * 156));
    const g = Math.floor(102 - (intensity * 60));
    const b = Math.floor(241 - (intensity * 150));
    const label = h.hour === 0 ? '12a' : h.hour < 12 ? `${h.hour}a` : h.hour === 12 ? '12p' : `${h.hour - 12}p`;

    const col = document.createElement('div');
    col.classList.add('heatmap-col');
    col.innerHTML = `
      <div class="heatmap-cell" 
           style="background:rgba(${r},${g},${b},${0.2 + intensity * 0.8})"
           title="${h.value} votes at ${label}">
      </div>
      <div class="heatmap-label">${label}</div>
    `;
    container.appendChild(col);
  });
}

// ─── Export ───────────────────────────────────────────────────
window.Animations = {
  typeText,
  animateCounter,
  launchConfetti,
  renderBarChart,
  renderDonutChart,
  renderHeatmap,
  pageTransition
};