// ---- year ----
document.getElementById('year').textContent = new Date().getFullYear();

// ---- nav scrolled state ----
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > window.innerHeight * 0.7);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ---- mobile menu ----
const burger = document.getElementById('burger');
const links = document.querySelector('.nav__links');
burger.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  burger.classList.toggle('x', open);
  burger.setAttribute('aria-expanded', open);
});
links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    links.classList.remove('open');
    burger.classList.remove('x');
    burger.setAttribute('aria-expanded', false);
  })
);

// ---- hero load-in (staggered) ----
window.addEventListener('load', () => {
  document.querySelectorAll('.reveal').forEach(el => {
    const d = (el.dataset.d || 0) * 110;
    setTimeout(() => el.classList.add('in'), d);
  });
});
// fallback if load already fired
document.querySelectorAll('.reveal').forEach(el => {
  const d = (el.dataset.d || 0) * 110;
  setTimeout(() => el.classList.add('in'), d + 60);
});

// ---- scroll reveal for .fade ----
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.fade').forEach(el => io.observe(el));

// ---- certificate lightbox ----
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCap = document.getElementById('lbCap');
const closeLb = () => { lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); };

document.addEventListener('click', (e) => {
  const btn = e.target.closest('.cert, .shot');
  if (!btn) return;
  lbImg.src = btn.dataset.img;
  lbImg.alt = btn.dataset.cap || '';
  lbCap.innerHTML = btn.dataset.cap || '';
  lb.classList.add('open');
  lb.setAttribute('aria-hidden', 'false');
});
document.getElementById('lbClose').addEventListener('click', closeLb);
lb.addEventListener('click', (e) => { if (e.target === lb) closeLb(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLb(); });
