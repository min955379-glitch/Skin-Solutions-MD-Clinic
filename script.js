/* Tiny progressive enhancement: mobile-menu dismissal and accessible scroll reveals. */
document.documentElement.classList.add('js');

const mobileMenu = document.querySelector('.mobile-menu');
if (mobileMenu) {
  const menuToggle = mobileMenu.querySelector('summary');
  mobileMenu.addEventListener('toggle', () => {
    menuToggle.setAttribute('aria-label', mobileMenu.open ? 'Close navigation menu' : 'Open navigation menu');
  });
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => mobileMenu.removeAttribute('open'));
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileMenu.open) {
      mobileMenu.removeAttribute('open');
      menuToggle.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (mobileMenu.open && !mobileMenu.contains(event.target)) mobileMenu.removeAttribute('open');
  });
}

const revealItems = document.querySelectorAll('[data-reveal]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

  revealItems.forEach((item) => revealObserver.observe(item));
}
