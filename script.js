const tabs = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.menu-card');
const orderButtons = document.querySelectorAll('[data-order]');
const toast = document.querySelector('.toast');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

let toastTimer;

document.body.classList.add('motion-ready');

const revealTargets = document.querySelectorAll('.section-heading, .menu-card, .story-copy, .visit-heading, .info-block');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.14 });

revealTargets.forEach((element, index) => {
  element.classList.add('reveal');
  element.style.setProperty('--delay', `${Math.min(index * 70, 420)}ms`);
  revealObserver.observe(element);
});

window.setTimeout(() => {
  revealTargets.forEach((element) => element.classList.add('is-visible'));
}, 250);

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const filter = tab.dataset.filter;
    tabs.forEach((item) => {
      const selected = item === tab;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-selected', selected);
    });
    cards.forEach((card) => {
      const matches = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !matches);
    });
  });
});

orderButtons.forEach((button) => {
  button.addEventListener('click', () => {
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 3000);
  });
});

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});
