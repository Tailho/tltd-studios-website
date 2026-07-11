document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('[data-nav-toggle]');
  const navLinks = document.querySelector('[data-nav-links]');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
  }

  document.querySelectorAll('[data-nav-links] a').forEach((link) => {
    link.addEventListener('click', () => navLinks?.classList.remove('is-open'));
  });

  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  reveals.forEach((element) => observer.observe(element));

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  const typingEl = document.getElementById('hero-typing');
  if (typingEl) {
    let phrases = [];
    try {
      phrases = JSON.parse(typingEl.dataset.phrases || '[]');
    } catch (e) {
      phrases = [typingEl.textContent.trim()];
    }
    let idx = 0;
    let char = 0;
    let deleting = false;
    const typeSpeed = 56;
    const pauseAfter = 1400;

    const tick = () => {
      const current = phrases[idx % phrases.length];
      if (!deleting) {
        char++;
        typingEl.textContent = current.slice(0, char);
        if (char === current.length) {
          deleting = true;
          typingEl.classList.add('blink');
          setTimeout(tick, pauseAfter);
          return;
        }
      } else {
        typingEl.classList.remove('blink');
        char--;
        typingEl.textContent = current.slice(0, char);
        if (char === 0) {
          deleting = false;
          idx++;
        }
      }
      setTimeout(tick, deleting ? typeSpeed / 2 : typeSpeed);
    };

    setTimeout(() => tick(), 700);
  }

  const heroVisual = document.querySelector('.orbital-stack');
  if (heroVisual) {
    window.addEventListener('pointermove', (event) => {
      const rect = heroVisual.getBoundingClientRect();
      const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
      const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
      heroVisual.style.transform = `perspective(1200px) rotateY(${offsetX}deg) rotateX(${-offsetY}deg)`;
    });

    window.addEventListener('pointerleave', () => {
      heroVisual.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)';
    });
  }
});
