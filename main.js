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

  }
});
