/* ════════════════════════════════════════════════
   Mes Mémoires — script.js (sans musique)
   ════════════════════════════════════════════════ */

'use strict';

// ════════════════════════════════════════════════
// 🔐 MOT DE PASSE
// ════════════════════════════════════════════════
const SECRET_PASSWORD = "memoires";

const PHOTOS = [
  'memories1.jpeg',
  'memories2.jpeg',
  'memories3.jpeg',
  'memories4.jpeg'
];

const CAPS = [
  'Un matin de lumière douce…',
  'Dans mes meilleurs jours…',
  'Un instant suspendu…',
  'Et le plus beau reste à venir…'
];

let lbIdx = 0;

/* ────────────────────────────────────────────────
   AFFICHAGE PHOTOS
   ──────────────────────────────────────────────── */
function renderAllPhotos() {
  PHOTOS.forEach((src, i) => {
    const wrap = document.getElementById('wrap-' + i);
    const ph   = document.getElementById('ph-' + i);
    
    if (!wrap || !ph) return;
    
    let img = wrap.querySelector('img.real-img');
    if (!img) {
      img = document.createElement('img');
      img.className = 'real-img';
      wrap.insertBefore(img, ph);
    }
    img.src = src;
    img.alt = CAPS[i];
    ph.style.display = 'none';
    wrap.classList.add('loaded');
  });
}

/* ────────────────────────────────────────────────
   LIGHTBOX
   ──────────────────────────────────────────────── */
function openLightbox(i) {
  lbIdx = i;
  updateLb();
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    const closeBtn = document.getElementById('lb-close');
    if (closeBtn) closeBtn.focus();
  }
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function navLb(dir) {
  lbIdx = (lbIdx + dir + PHOTOS.length) % PHOTOS.length;
  updateLb();
}

function updateLb() {
  const lbImg = document.getElementById('lb-img');
  const lbCaption = document.getElementById('lb-caption');
  const lbCounter = document.getElementById('lb-counter');
  if (lbImg) lbImg.src = PHOTOS[lbIdx];
  if (lbCaption) lbCaption.textContent = CAPS[lbIdx];
  if (lbCounter) lbCounter.textContent = (lbIdx + 1) + ' / ' + PHOTOS.length;
}

/* ────────────────────────────────────────────────
   MESSAGE SECRET
   ──────────────────────────────────────────────── */
function revealSecret() {
  const secretMsg = document.getElementById('secret-msg');
  if (secretMsg) secretMsg.classList.add('revealed');
}

/* ────────────────────────────────────────────────
   WELCOME AVEC MOT DE PASSE
   ──────────────────────────────────────────────── */
function checkPasswordAndEnter() {
  const passwordInput = document.getElementById('password-input');
  const errorEl = document.getElementById('password-error');
  const enteredPassword = passwordInput ? passwordInput.value : '';
  
  if (enteredPassword === SECRET_PASSWORD) {
    const w = document.getElementById('welcome');
    w.classList.add('hide');
    setTimeout(() => { w.style.display = 'none'; }, 1300);
    
    sessionStorage.setItem('memoires_access', 'granted');
    
    // Charger les photos après l'entrée
    setTimeout(() => {
      renderAllPhotos();
      setTimeout(revealSecret, 800);
      initScrollReveal();
      initEvents();
    }, 100);
  } else {
    if (errorEl) {
      errorEl.textContent = '❌ mot de passe incorrect';
      errorEl.classList.add('show');
      setTimeout(() => {
        errorEl.classList.remove('show');
      }, 2000);
    }
    if (passwordInput) {
      passwordInput.value = '';
      passwordInput.focus();
    }
  }
}

function checkExistingAccess() {
  if (sessionStorage.getItem('memoires_access') === 'granted') {
    const w = document.getElementById('welcome');
    w.classList.add('hide');
    setTimeout(() => { w.style.display = 'none'; }, 300);
    return true;
  }
  return false;
}

/* ────────────────────────────────────────────────
   SCROLL REVEAL
   ──────────────────────────────────────────────── */
function initScrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { 
        e.target.classList.add('visible'); 
        obs.unobserve(e.target); 
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.photo-wrap, #closing-line, #closing-sub')
    .forEach(el => { if (el) obs.observe(el); });
}

/* ────────────────────────────────────────────────
   INITIALISATION DES ÉVÉNEMENTS
   ──────────────────────────────────────────────── */
function initEvents() {
  // Clics sur les cadres → ouvre la lightbox
  PHOTOS.forEach((_, i) => {
    const wrap = document.getElementById('wrap-' + i);
    if (wrap) {
      wrap.addEventListener('click', () => openLightbox(i));
      wrap.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { 
          e.preventDefault(); 
          openLightbox(i); 
        }
      });
    }
  });
  
  // Lightbox
  const lbClose = document.getElementById('lb-close');
  const lbPrev = document.getElementById('lb-prev');
  const lbNext = document.getElementById('lb-next');
  const lightbox = document.getElementById('lightbox');
  
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev) lbPrev.addEventListener('click', () => navLb(-1));
  if (lbNext) lbNext.addEventListener('click', () => navLb(1));
  if (lightbox) {
    lightbox.addEventListener('click', function(e) {
      if (e.target === this) closeLightbox();
    });
  }
  
  // Clavier
  document.addEventListener('keydown', e => {
    const lightboxEl = document.getElementById('lightbox');
    if (!lightboxEl || !lightboxEl.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navLb(-1);
    if (e.key === 'ArrowRight') navLb(1);
  });
  
  // Swipe mobile
  let tx = 0;
  if (lightbox) {
    lightbox.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend', e => {
      const d = tx - e.changedTouches[0].clientX;
      if (Math.abs(d) > 50) navLb(d > 0 ? 1 : -1);
    }, { passive: true });
  }
}

/* ────────────────────────────────────────────────
   DOM CONTENT LOADED
   ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Événements du mot de passe
  const enterBtn = document.getElementById('enter-btn');
  const passwordInput = document.getElementById('password-input');
  
  if (enterBtn) {
    enterBtn.addEventListener('click', checkPasswordAndEnter);
  }
  
  if (passwordInput) {
    passwordInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        checkPasswordAndEnter();
      }
    });
  }
  
  // Vérifier si déjà connecté
  if (checkExistingAccess()) {
    renderAllPhotos();
    setTimeout(revealSecret, 800);
    initEvents();
    initScrollReveal();
  }
});