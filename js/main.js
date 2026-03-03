/* =============================================
   MIGUEL OLIVEIRA — PORTFOLIO
   Main JavaScript
   ============================================= */

// ── Typewriter effect ──
const roles = [
  'Estudante de Sistemas de Informação',
  'Desenvolvedor Frontend Web',
  'Backend Java & Python',
  'Entusiasta de IA & Automação',
  'Modelador 3D',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeEl;

function typeWriter() {
  typeEl = typeEl || document.getElementById('typewriter-text');
  if (!typeEl) return;

  const current = roles[roleIndex];

  if (isDeleting) {
    typeEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typeEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let speed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === current.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 300;
  }

  setTimeout(typeWriter, speed);
}

// ── Navigation scroll ──
function initNav() {
  const nav = document.querySelector('nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  toggle?.addEventListener('click', () => {
    links.classList.toggle('open');
  });

  // Close on link click
  links?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  });
}

// ── Scroll reveal ──
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('visible'), i * 80);
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── Project screenshots slider ──
function initSliders() {
  document.querySelectorAll('.project-card').forEach(card => {
    const track = card.querySelector('.screenshots-track');
    const dots = card.querySelectorAll('.dot');
    const prevBtn = card.querySelector('.screenshot-nav.prev');
    const nextBtn = card.querySelector('.screenshot-nav.next');

    if (!track || !track.children.length) return;

    let current = 0;
    const total = track.children.length;

    function goTo(idx) {
      current = (idx + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    prevBtn?.addEventListener('click', () => goTo(current - 1));
    nextBtn?.addEventListener('click', () => goTo(current + 1));
    dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

    // Auto-advance
    let interval = setInterval(() => goTo(current + 1), 4000);
    card.addEventListener('mouseenter', () => clearInterval(interval));
    card.addEventListener('mouseleave', () => {
      interval = setInterval(() => goTo(current + 1), 4000);
    });
  });
}

// ── 3D Model Modal ──
function initModelModal() {
  const openBtn = document.getElementById('open-models-btn');
  const modal = document.getElementById('models-modal');
  const closeBtn = modal?.querySelector('.modal-close');

  openBtn?.addEventListener('click', () => {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  closeBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
}

// ── Word cloud random slight rotation ──
function initWordCloud() {
  document.querySelectorAll('.skill-word').forEach(w => {
    const rot = (Math.random() - 0.5) * 6;
    w.style.transform = `rotate(${rot}deg)`;
    w.addEventListener('mouseenter', () => {
      w.style.transform = `rotate(0deg) scale(1.1)`;
    });
    w.addEventListener('mouseleave', () => {
      w.style.transform = `rotate(${rot}deg)`;
    });
  });
}

// ── Cursor glow effect ──
function initCursorGlow() {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%);
    pointer-events: none; z-index: 999; transform: translate(-50%, -50%);
    transition: all 0.15s ease; mix-blend-mode: screen;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

// ── Init all ──
document.addEventListener('DOMContentLoaded', () => {
  typeWriter();
  initNav();
  initReveal();
  initSliders();
  initModelModal();
  initWordCloud();
  initCursorGlow();
});
