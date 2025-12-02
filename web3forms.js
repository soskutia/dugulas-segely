// web3forms.js
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");
  const submitBtn = document.getElementById("submitBtn");

  if (!contactForm || !formSuccess || !submitBtn) return;

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);

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
        headers: { Accept: "application/json" },
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Ismeretlen hiba történt.");
      }

      formSuccess.textContent = "Köszönjük! Hamarosan visszahívunk. 🚀";
      formSuccess.style.color = "#4ade80";
      contactForm.reset();
    } catch (error) {
      console.error("Web3Forms error:", error);
      formSuccess.textContent =
        "Hiba történt a küldés során. Próbáld újra, vagy hívj minket telefonon.";
      formSuccess.style.color = "#f97316";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Elküldés ✉️";
    }
  });
});
