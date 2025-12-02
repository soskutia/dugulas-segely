document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const navIcon = document.getElementById('navIcon');
  const header = document.getElementById('siteHeader');

  // Dinamikus év
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobil menü toggle
  if (navToggle && mobileMenu && navIcon) {
    navToggle.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.toggle('hidden');
      navIcon.textContent = isHidden ? '☰' : '✕';
    });

    // Menü bezárása linkre kattintáskor
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        navIcon.textContent = '☰';
      });
    });
  }

  // Scroll árnyék – kis perf-tuning requestAnimationFrame-fel
  if (header) {
    let lastKnownScrollY = 0;
    let ticking = false;

    const updateHeaderShadow = () => {
      if (lastKnownScrollY > 8) {
        header.classList.add('header-shadow');
      } else {
        header.classList.remove('header-shadow');
      }
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      lastKnownScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(updateHeaderShadow);
        ticking = true;
      }
    });

      // Összecsukható h3 + ul
  const collapsibleHeaders = document.querySelectorAll('.collapsible-header');

  collapsibleHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      if (!content) return;

      const indicator = header.querySelector('.indicator');
      const isHidden = content.classList.toggle('hidden');

      if (indicator) {
        indicator.textContent = isHidden ? '▸' : '▾';
      }
    });
  });
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
});
