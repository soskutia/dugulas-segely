// main.js
document.addEventListener("DOMContentLoaded", () => {
  /* ========= Mobil navigáció ========= */
  const navToggle = document.getElementById("navToggle");
  const navIcon = document.getElementById("navIcon");
  const mobileMenu = document.getElementById("mobileMenu");

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("hidden");
      if (navIcon) {
        navIcon.textContent = isOpen ? "✕" : "☰";
      }
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        if (navIcon) navIcon.textContent = "☰";
      });
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
