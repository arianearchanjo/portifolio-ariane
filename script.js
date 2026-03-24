/* ============================================================
   ARIANE ARCHANJO — PORTFOLIO
   script.js
   ============================================================ */

"use strict";

/* ──────────────────────────────────────────────
   1. CURSOR PERSONALIZADO
   ────────────────────────────────────────────── */
(function initCursor() {
  const cursor = document.getElementById("cursor");
  const follower = document.getElementById("cursorFollower");
  if (!cursor || !follower) return;

  let mouseX = 0,
    mouseY = 0;
  let followerX = 0,
    followerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + "px";
    cursor.style.top = mouseY + "px";
  });

  // Segue suavemente com RAF
  (function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + "px";
    follower.style.top = followerY + "px";
    requestAnimationFrame(animateFollower);
  })();

  // Efeito hover em links/botões
  const hoverTargets = document.querySelectorAll(
    "a, button, .project-card, .cert-card, .contact-card",
  );
  hoverTargets.forEach((el) => {
    el.addEventListener("mouseenter", () => follower.classList.add("hovered"));
    el.addEventListener("mouseleave", () =>
      follower.classList.remove("hovered"),
    );
  });
})();

/* ──────────────────────────────────────────────
   2. NAVBAR: scroll + highlight ativo + mobile
   ────────────────────────────────────────────── */
(function initNavbar() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const allLinks = document.querySelectorAll(".nav-link");

  // Scroll: adiciona classe .scrolled
  window.addEventListener(
    "scroll",
    () => {
      navbar.classList.toggle("scrolled", window.scrollY > 50);
      updateActiveLink();
      updateBackTop();
    },
    { passive: true },
  );

  // Menu mobile toggle
  hamburger.addEventListener("click", () => {
    const open = hamburger.classList.toggle("open");
    navLinks.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  });

  // Fechar menu ao clicar em link
  allLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  // Highlight de seção ativa
  function updateActiveLink() {
    const sections = document.querySelectorAll("section[id]");
    let currentId = "";

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        currentId = section.id;
      }
    });

    allLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + currentId,
      );
    });
  }
})();

/* ──────────────────────────────────────────────
   3. DARK / LIGHT MODE
   ────────────────────────────────────────────── */
(function initTheme() {
  const toggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const html = document.documentElement;

  // Recupera preferência salva
  const saved = localStorage.getItem("theme");
  if (saved) {
    html.setAttribute("data-theme", saved);
    updateIcon(saved);
  }

  toggle.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    html.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateIcon(next);
  });

  function updateIcon(theme) {
    themeIcon.className = theme === "dark" ? "fas fa-moon" : "fas fa-sun";
  }
})();

/* ──────────────────────────────────────────────
   4. ANIMAÇÃO REVEAL AO ROLAR (Intersection Observer)
   ────────────────────────────────────────────── */
(function initReveal() {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger entre filhos da mesma linha
          const delay = Array.from(entry.target.parentElement.children)
            .filter((c) => c.classList.contains("reveal"))
            .indexOf(entry.target);

          entry.target.style.transitionDelay =
            Math.min(delay * 0.08, 0.4) + "s";
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  elements.forEach((el) => observer.observe(el));
})();

/* ──────────────────────────────────────────────
   5. BARRAS DE SKILL (anima quando visível)
   ────────────────────────────────────────────── */
(function initSkillBars() {
  const fills = document.querySelectorAll(".skill-fill");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const w = target.getAttribute("data-w") || "0";
          setTimeout(() => {
            target.style.width = w + "%";
          }, 200);
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.5 },
  );

  fills.forEach((fill) => observer.observe(fill));
})();

/* ──────────────────────────────────────────────
   6. CONTADOR DE STATS (Hero)
   ────────────────────────────────────────────── */
(function initCounters() {
  const nums = document.querySelectorAll(".stat-num[data-target]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute("data-target"), 10);
          const duration = 1200;
          const start = performance.now();

          function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Easing: ease-out quart
            const eased = 1 - Math.pow(1 - progress, 4);
            el.textContent = Math.round(eased * target);
            if (progress < 1) requestAnimationFrame(update);
          }

          requestAnimationFrame(update);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 },
  );

  nums.forEach((n) => observer.observe(n));
})();

/* ──────────────────────────────────────────────
   7. TYPED TEXT (Hero)
   ────────────────────────────────────────────── */
(function initTyped() {
  const el = document.getElementById("typedText");
  if (!el) return;

  const phrases = [
    "Front-End Developer",
    "Software Engineering Student",
    "Next.js · React · PostgreSQL",
    "Sistemas para gestão pública",
    "Código limpo. Impacto real.",
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPausing = false;

  function type() {
    const current = phrases[phraseIndex];

    if (isPausing) return;

    if (!isDeleting) {
      // Digitar
      charIndex++;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        isPausing = true;
        setTimeout(() => {
          isPausing = false;
          isDeleting = true;
          setTimeout(type, 60);
        }, 2000);
        return;
      }
      setTimeout(type, 65);
    } else {
      // Apagar
      charIndex--;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 35);
    }
  }

  setTimeout(type, 800);
})();

/* ──────────────────────────────────────────────
   8. BACK TO TOP
   ────────────────────────────────────────────── */
(function initBackTop() {
  const btn = document.getElementById("backTop");
  if (!btn) return;

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

function updateBackTop() {
  const btn = document.getElementById("backTop");
  if (!btn) return;
  btn.classList.toggle("visible", window.scrollY > 400);
}

/* ──────────────────────────────────────────────
   9. ANO NO FOOTER
   ────────────────────────────────────────────── */
(function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
})();

/* ──────────────────────────────────────────────
   10. SMOOTH SCROLL PARA ÂNCORAS
   ────────────────────────────────────────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href === "#") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 72; // altura da navbar
        const top =
          target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });
})();

/* ──────────────────────────────────────────────
   11. EFEITO TILT NOS CARDS DE PROJETO (desktop)
   ────────────────────────────────────────────── */
(function initCardTilt() {
  if (window.matchMedia("(hover: none)").matches) return; // ignora touch

  const cards = document.querySelectorAll(".project-card:not(.project-soon)");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const rotX = -dy * 6;
      const rotY = dx * 6;
      card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
})();
