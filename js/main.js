/* =============================================
   MIGUEL OLIVEIRA — PORTFOLIO
   Main JavaScript
   ============================================= */

// ── Typewriter effect ──
const roles = [
  "Estudante de Sistemas de Informação",
  "Desenvolvedor Frontend Web",
  "Backend Java & Python",
  "Entusiasta de IA & Automação",
  "Modelador 3D",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeEl;

function typeWriter() {
  typeEl = typeEl || document.getElementById("typewriter-text");
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
  const nav = document.querySelector("nav");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 50);
  });

  toggle?.addEventListener("click", () => {
    links.classList.toggle("open");
  });

  links?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => links.classList.remove("open"));
  });

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 200) current = s.id;
    });
    navLinks.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  });
}

// ── Scroll reveal ──
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add("visible"), i * 80);
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

// ── Project screenshots slider ──
function initSliders() {
  document.querySelectorAll(".project-card").forEach((card) => {
    const track = card.querySelector(".screenshots-track");
    const dots = card.querySelectorAll(".dot");
    const prevBtn = card.querySelector(".screenshot-nav.prev");
    const nextBtn = card.querySelector(".screenshot-nav.next");

    if (!track || !track.children.length) return;

    let current = 0;
    const total = track.children.length;

    function goTo(idx) {
      current = (idx + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("active", i === current));
    }

    prevBtn?.addEventListener("click", () => goTo(current - 1));
    nextBtn?.addEventListener("click", () => goTo(current + 1));
    dots.forEach((d, i) => d.addEventListener("click", () => goTo(i)));

    let interval = setInterval(() => goTo(current + 1), 4000);
    card.addEventListener("mouseenter", () => clearInterval(interval));
    card.addEventListener("mouseleave", () => {
      interval = setInterval(() => goTo(current + 1), 4000);
    });
  });
}

// ── Certification image slider ──
function initCertSliders() {
  document.querySelectorAll(".cert-image-slider").forEach((slider) => {
    const track = slider.querySelector(".cert-slides-track");
    const dots = slider.querySelectorAll(".cert-dot");
    const prevBtn = slider.querySelector(".cert-nav.prev");
    const nextBtn = slider.querySelector(".cert-nav.next");

    if (!track || track.children.length <= 1) return;

    let current = 0;
    const total = track.children.length;

    function goTo(idx) {
      current = (idx + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("active", i === current));
    }

    prevBtn?.addEventListener("click", () => goTo(current - 1));
    nextBtn?.addEventListener("click", () => goTo(current + 1));
    dots.forEach((d, i) => d.addEventListener("click", () => goTo(i)));

    // Auto-advance every 3.5s, pause on hover
    let interval = setInterval(() => goTo(current + 1), 3500);
    slider
      .closest(".cert-card")
      ?.addEventListener("mouseenter", () => clearInterval(interval));
    slider.closest(".cert-card")?.addEventListener("mouseleave", () => {
      interval = setInterval(() => goTo(current + 1), 3500);
    });
  });
}

// ── 3D Model Modal ──
function initModelModal() {
  const openBtn = document.getElementById("open-models-btn");
  const modal = document.getElementById("models-modal");
  const closeBtn = modal?.querySelector(".modal-close");

  openBtn?.addEventListener("click", () => {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  });

  closeBtn?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

// ── Word cloud random slight rotation ──
function initWordCloud() {
  document.querySelectorAll(".skill-word").forEach((w) => {
    const rot = (Math.random() - 0.5) * 6;
    w.style.transform = `rotate(${rot}deg)`;
    w.addEventListener("mouseenter", () => {
      w.style.transform = `rotate(0deg) scale(1.1)`;
    });
    w.addEventListener("mouseleave", () => {
      w.style.transform = `rotate(${rot}deg)`;
    });
  });
}

// ── Cursor glow effect ──
function initCursorGlow() {
  const glow = document.createElement("div");
  glow.style.cssText = `
    position: fixed; width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%);
    pointer-events: none; z-index: 999; transform: translate(-50%, -50%);
    transition: all 0.15s ease; mix-blend-mode: screen;
  `;
  document.body.appendChild(glow);

  document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
  });
}

// ── Theme Toggle ──
function initTheme() {
  const btn = document.getElementById("theme-toggle");
  const saved = localStorage.getItem("theme");

  if (saved === "light") document.body.classList.add("light");

  btn?.addEventListener("click", () => {
    document.body.classList.toggle("light");
    const isLight = document.body.classList.contains("light");
    localStorage.setItem("theme", isLight ? "light" : "dark");
  });
}

// ── Banner de novidades (clicável) ──
// Para resetar o banner (mostrar de novo para todos), altere BANNER_VERSION.
const BANNER_VERSION = "v1";

function initUpdateBanner() {
  const banner = document.getElementById("update-banner");
  const closeBtn = document.getElementById("close-banner");

  if (localStorage.getItem("banner-dismissed") === BANNER_VERSION) {
    banner?.classList.add("hidden");
    return;
  }

  // Torna cada item da lista clicável se tiver data-target
  banner?.querySelectorAll(".update-list li[data-target]").forEach((item) => {
    const target = item.getAttribute("data-target");
    item.classList.add("clickable");
    item.setAttribute("title", "Clique para ir até esta seção");

    item.addEventListener("click", () => {
      // Fecha o banner
      banner.classList.add("hidden");
      localStorage.setItem("banner-dismissed", BANNER_VERSION);

      // Navega suavemente para a seção
      const section = document.querySelector(target);
      if (section) {
        const offset = 80; // altura da navbar
        const top =
          section.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });

        // Pulsa a seção brevemente para destacá-la
        section.classList.add("section-highlight");
        setTimeout(() => section.classList.remove("section-highlight"), 1800);
      }
    });
  });

  closeBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    banner.classList.add("hidden");
    localStorage.setItem("banner-dismissed", BANNER_VERSION);
  });
}

// ── Render publications from publications.js ──
// ── initPublications ──
// Substitui a função initPublications() no seu main.js.
// Lê os posts do localStorage via window.__PUB (publications.js).

function renderPublications() {
  const container = document.getElementById("publications-list");
  if (!container) return;

  const pubs = window.__PUB?.getPubs() ?? [];

  if (!pubs.length) {
    container.innerHTML = `<p style="color:var(--white-dim);text-align:center;font-size:.85rem;padding:2rem 0;">Nenhuma publicação ainda.</p>`;
    return;
  }

  container.innerHTML = pubs
    .slice(0, 3)
    .map(
      (post, i) => `
      <div class="pub-card reveal">
        <div class="pub-number">0${i + 1}</div>
        <div class="pub-content">
          <p class="pub-title">${escHtml(post.title)}</p>
          <p class="pub-desc">${escHtml(post.desc)}</p>
          <div class="pub-meta">
            ${post.tags
              .map((t) => `<span class="pub-tag">${escHtml(t)}</span>`)
              .join("")}
            <span class="pub-tag">${escHtml(post.date)}</span>
            ${
              post.url
                ? `<a href="${escHtml(
                    post.url
                  )}" target="_blank" rel="noopener" class="pub-tag pub-tag-link">Ver no LinkedIn ↗</a>`
                : ""
            }
          </div>
        </div>
      </div>
    `
    )
    .join("");

  // Re-observa .reveal recém criados
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e, idx) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add("visible"), idx * 100);
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  container.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

// Expõe globalmente para o admin.js poder chamar ao salvar
window.renderPublications = renderPublications;

function initPublications() {
  renderPublications();
}

function escHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ── Init all ──
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initUpdateBanner();
  initPublications();
  typeWriter();
  initNav();
  initReveal();
  initSliders();
  initCertSliders();
  initModelModal();
  initWordCloud();
  initCursorGlow();
});
