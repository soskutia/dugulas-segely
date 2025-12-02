// main.js
document.addEventListener("DOMContentLoaded", () => {
  /* ========= Mobil navigáció ========= */
  const navToggle = document.getElementById("navToggle");
  const navIcon = document.getElementById("navIcon");
  const mobileMenu = document.getElementById("mobileMenu");

  if (navToggle && mobileMenu) {
    const setMenuState = (open) => {
      mobileMenu.classList.toggle("hidden", !open);
      if (navIcon) {
        navIcon.textContent = open ? "\u2715" : "\u2630";
      }
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    };

    setMenuState(false);

    navToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = !mobileMenu.classList.contains("hidden");
      setMenuState(!isOpen);
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        setMenuState(false);
      });
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (
        !mobileMenu.classList.contains("hidden") &&
        !mobileMenu.contains(target) &&
        !navToggle.contains(target)
      ) {
        setMenuState(false);
      }
    });
  }

  /* ========= Lábléc év ========= */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ========= Összecsukható területi listák ========= */
  const collapsibleHeaders = document.querySelectorAll(".collapsible-header");

  collapsibleHeaders.forEach((header) => {
    const content = header.nextElementSibling;
    if (!content) return;

    const indicator = header.querySelector(".indicator");
    const initHidden = content.classList.contains("hidden");
    if (indicator) {
      indicator.textContent = initHidden ? "▸" : "▾";
    }

    header.addEventListener("click", () => {
      const isHidden = content.classList.toggle("hidden");
      if (indicator) {
        indicator.textContent = isHidden ? "▸" : "▾";
      }
    });
  });
});
