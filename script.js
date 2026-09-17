const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const walletModal = document.querySelector('#wallet-modal');
const lightbox = document.querySelector('#lightbox');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

document.querySelectorAll('.js-wallet').forEach(button => {
  button.addEventListener('click', () => walletModal?.showModal());
});

document.querySelector('.modal-close')?.addEventListener('click', () => walletModal?.close());
document.querySelector('.modal-dismiss')?.addEventListener('click', () => walletModal?.close());

walletModal?.addEventListener('click', event => {
  if (event.target === walletModal) walletModal.close();
});

document.querySelector('.storyboard')?.addEventListener('click', () => lightbox?.showModal());
document.querySelector('.lightbox-close')?.addEventListener('click', () => lightbox?.close());
lightbox?.addEventListener('click', event => {
  if (event.target === lightbox) lightbox.close();
});

document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const target = document.querySelector(button.dataset.copy);
    if (!target) return;
    try {
      await navigator.clipboard.writeText(target.textContent.trim());
      const oldText = button.textContent;
      button.textContent = 'Copied';
      setTimeout(() => button.textContent = oldText, 1600);
    } catch {
      button.textContent = 'Select text';
    }
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();
