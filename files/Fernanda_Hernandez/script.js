document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Mobile navbar
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links?.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      })
    );
  }

  // Lightbox
  const lb = document.querySelector('.lightbox');
  const lbImg = document.querySelector('.lightbox-img');
  const lbCap = document.getElementById('lbcap');
  const nextBtn = lb?.querySelector('.next');
  const prevBtn = lb?.querySelector('.prev');
  const closeBtn = lb?.querySelector('button[aria-label="Chiudi"]');

  let gallery = [], gIndex = 0;
  function render(){
    if(!gallery.length || !lbImg || !lbCap) return;
    lbImg.src = gallery[gIndex];
    lbCap.textContent = `${gIndex+1} / ${gallery.length}`;
  }
  function openGallery(imgs, start=0){
    gallery = imgs; gIndex = start;
    lb?.classList.add('open'); document.body.style.overflow='hidden';
    render();
  }
  function next(){ if(!gallery.length) return; gIndex=(gIndex+1)%gallery.length; render(); }
  function prev(){ if(!gallery.length) return; gIndex=(gIndex-1+gallery.length)%gallery.length; render(); }
  function close(){ if(!lb) return; lb.classList.remove('open'); if(lbImg) lbImg.src=''; document.body.style.overflow=''; gallery=[]; }

  nextBtn?.addEventListener('click', next);
  prevBtn?.addEventListener('click', prev);
  closeBtn?.addEventListener('click', close);
  lb?.addEventListener('click', e => { if (e.target === lb) close(); });
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
    if (lb?.classList.contains('open')) {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    }
  });

  // Fan collections: start from clicked thumb
  document.querySelectorAll('.fan-card').forEach(card => {
    const imgEls = [...card.querySelectorAll('.fan-stack img')];
    const urls = (card.dataset.images || '').split(',').map(s => s.trim()).filter(Boolean);
    card.addEventListener('click', e => {
      const targetImg = e.target.closest('img');
      const idx = targetImg ? imgEls.indexOf(targetImg) : 0;
      if (urls.length) openGallery(urls, Math.max(0, idx));
    });
    card.setAttribute('tabindex','0');
    card.addEventListener('keydown', e => { if (e.key === 'Enter') openGallery(urls, 0); });
  });

  // Lazy + reveal
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img').forEach(i => i.loading = 'lazy');
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.style.transition = 'transform .6s ease, opacity .6s ease';
        el.target.style.transform = 'translateY(0)';
        el.target.style.opacity = '1';
      }
    });
  }, { threshold: .1 });
  document.querySelectorAll('.fan-card,.card-simple').forEach(x => {
    x.style.transform = 'translateY(14px)';
    x.style.opacity = '.001';
    observer.observe(x);
  });
});

// Invio via mailto (senza backend)
const cf = document.getElementById('contact-form');
if (cf) {
  cf.addEventListener('submit', (e) => {
    e.preventDefault();
    const to = cf.dataset.mailto || 'dennisbottari@gmail.com';
    const nome = (cf.nome?.value || '').trim();
    const email = (cf.email?.value || '').trim();
    const oggetto = (cf.oggetto?.value || 'Nuovo contatto dal sito').trim();
    const messaggio = (cf.messaggio?.value || '').trim();

    const body = `Nome: ${nome}\nEmail: ${email}\n\nMessaggio:\n${messaggio}`;
    const mailto = `mailto:${to}?subject=${encodeURIComponent(oggetto)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
  });
}
// Overlay feedback: apri modale dal summary e disattiva toggle di <details>
const modal = document.getElementById('feedback-modal');
const modalTitle = document.getElementById('t-modal-title');
const modalBody = document.getElementById('t-modal-body');

function openFeedbackModal(title, html){
  modalTitle.textContent = title || 'Feedback';
  modalBody.innerHTML = html || '';
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
}
function closeFeedbackModal(){
  modal.hidden = true;
  document.body.style.overflow = '';
  modalTitle.textContent = '';
  modalBody.innerHTML = '';
}

document.querySelectorAll('#feedback .t-card > summary').forEach(summary=>{
  summary.addEventListener('click', (e)=>{
    // Evita che <details> cambi stato (niente “aprono tutti”)
    e.preventDefault();
    e.stopPropagation();
    const card = summary.parentElement;
    const title = card.querySelector('.t-head strong')?.textContent.trim() || 'Feedback';
    const bodyHTML = card.querySelector('.t-body')?.innerHTML || '';
    openFeedbackModal(title, bodyHTML);
    // Assicura che nessun <details> resti [open]
    document.querySelectorAll('#feedback .t-card[open]').forEach(d=>d.removeAttribute('open'));
  });
});

modal?.addEventListener('click', (e)=>{
  if(e.target.hasAttribute('data-close')) closeFeedbackModal();
});
window.addEventListener('keydown', (e)=>{
  if(!modal.hidden && e.key === 'Escape') closeFeedbackModal();
});
