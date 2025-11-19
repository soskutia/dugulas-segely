// Mobil menü toggle
const navToggle = document.querySelector(".nav__toggle");
const navLinks = document.querySelector(".nav__links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("nav__links--open");
    navToggle.classList.toggle("nav__toggle--open", isOpen);
  });

  // Linkre kattintva csukjuk össze
  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A" && window.innerWidth < 768) {
      navLinks.classList.remove("nav__links--open");
      navToggle.classList.remove("nav__toggle--open");
    }
  });
}

// Hero / section scroll-in animáció (IntersectionObserver)
const fadeIns = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

fadeIns.forEach((el) => observer.observe(el));

// Footer év
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
// Web3Forms backend submit
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");
const submitBtn = document.getElementById("submitBtn");

if (contactForm && formSuccess && submitBtn) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);

    // Kliens oldali minimális validáció
    const name = formData.get("name")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const area = formData.get("area")?.toString().trim();

    if (!name || name.length < 3) {
      formSuccess.textContent = "Kérjük, adj meg érvényes nevet.";
      formSuccess.style.color = "#f97316";
      return;
    }

    if (!phone || phone.length < 7) {
      formSuccess.textContent = "Kérjük, adj meg érvényes telefonszámot.";
      formSuccess.style.color = "#f97316";
      return;
    }

    if (!area || area.length < 2) {
      formSuccess.textContent = "Kérjük, add meg a települést vagy kerületet.";
      formSuccess.style.color = "#f97316";
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Küldés folyamatban...";
    formSuccess.textContent = "";
    formSuccess.style.color = "#4ade80";

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Ismeretlen hiba történt.");
      }

      // Siker
      formSuccess.textContent = "Köszönjük! Hamarosan visszahívunk. 🚀";
      formSuccess.style.color = "#4ade80";
      contactForm.reset();

    } catch (error) {
      formSuccess.textContent =
        "Hiba történt a küldés során. Próbáld újra, vagy hívj minket telefonon.";
      formSuccess.style.color = "#f97316";
      console.error("Web3Forms error:", error);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Elküldés ✉️";
    }
  });
}
