// Marina Ruiz Rodriguez — Portfolio interactions

document.getElementById('year').textContent = new Date().getFullYear();

// ---- Scroll reveal ----
const revealEls = document.querySelectorAll('.reveal, .reveal-up, .exp-col, .lang-item');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => io.observe(el));

// Safety net: if IntersectionObserver never fires (unsupported engine,
// odd embedding context), don't leave real content permanently hidden.
setTimeout(() => {
  revealEls.forEach(el => el.classList.add('in-view'));
}, 4000);

// ---- Stat counters ----
const counters = document.querySelectorAll('.stat-num');
const counterIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const start = performance.now();
    function tick(now){
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterIO.unobserve(el);
  });
}, { threshold: 0.5 });
counters.forEach(el => counterIO.observe(el));

// ---- Mobile nav ----
const burger = document.getElementById('burger');
const nav = document.getElementById('mainNav');
burger?.addEventListener('click', () => {
  nav.classList.toggle('nav-open');
  burger.classList.toggle('is-open');
});
document.querySelectorAll('.main-nav a').forEach(a => {
  a.addEventListener('click', () => nav.classList.remove('nav-open'));
});

// ---- Cursor dot (desktop only) ----
const cursorDot = document.getElementById('cursorDot');
const isFinePointer = window.matchMedia('(pointer: fine)').matches;
if (isFinePointer && cursorDot){
  window.addEventListener('mousemove', (e) => {
    cursorDot.style.opacity = '1';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursorDot.style.transform = 'translate(-50%,-50%) scale(2.4)');
    el.addEventListener('mouseleave', () => cursorDot.style.transform = 'translate(-50%,-50%) scale(1)');
  });
}
