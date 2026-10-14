// mobil menyu
const header = document.querySelector('.header');
const burger = document.querySelector('.burger');

burger.onclick = () => header.classList.toggle('open');

// linkka bosilsa menyu yopiladi
document.querySelectorAll('.menu a').forEach(a => {
  a.onclick = () => header.classList.remove('open');
});


// accordion - bir vaqtda bittasi ochiq turadi
const faqs = document.querySelectorAll('.faq-item');

faqs.forEach(item => {
  item.querySelector('.faq-q').onclick = () => {
    const wasOpen = item.classList.contains('open');
    faqs.forEach(f => f.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  };
});


// scroll qilganda bloklar chiqadi
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      observer.unobserve(e.target);
    }
  });
}, { rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


// hero raqamlari 0 dan sanab chiqadi
document.querySelectorAll('.stats b').forEach(el => {
  const text = el.textContent; // 500+
  const num = parseInt(text);
  const end = text.replace(num, '');
  let start;

  function step(t) {
    if (!start) start = t;
    let p = Math.min((t - start) / 1400, 1);
    p = 1 - Math.pow(1 - p, 3); // oxirida sekinlashadi
    el.textContent = Math.round(num * p) + end;
    if (p < 1) requestAnimationFrame(step);
  }

  el.textContent = '0' + end;
  setTimeout(() => requestAnimationFrame(step), 300);
});


// forma
const form = document.querySelector('.contact-form');

form.onsubmit = e => {
  e.preventDefault();
  const name = form.elements.name.value.trim().split(' ')[0];
  form.querySelector('.msg').textContent = 'Thanks, ' + name + '! We will get back to you soon.';
  form.reset();
};
