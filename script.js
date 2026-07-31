/* =========================================================
   ACADEMIA SOTE — script.js
   Menú, animaciones, lightbox, acordeón, botón volver arriba
   y simulacro de examen teórico interactivo.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Año automático en el footer ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  /* ---------- Header: sombra al hacer scroll ---------- */
  var header = document.getElementById('header');
  function onScrollHeader() {
    if (window.scrollY > 12) { header.classList.add('scrolled'); }
    else { header.classList.remove('scrolled'); }
  }
  window.addEventListener('scroll', onScrollHeader);
  onScrollHeader();

  /* ---------- Menú móvil ---------- */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', function () {
    var isOpen = mainNav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      mainNav.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });

  /* ---------- Animaciones al hacer scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(function (el) { revealObserver.observe(el); });

  /* ---------- Galería: Lightbox ---------- */
  var galleryItems = document.querySelectorAll('.gallery-item');
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  var lightboxPrev = document.getElementById('lightboxPrev');
  var lightboxNext = document.getElementById('lightboxNext');
  var galleryImages = Array.prototype.map.call(galleryItems, function (item) {
    return item.getAttribute('data-img');
  });
  var currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = galleryImages[currentIndex];
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  function showRelative(step) {
    currentIndex = (currentIndex + step + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex];
  }

  galleryItems.forEach(function (item, index) {
    item.addEventListener('click', function () { openLightbox(index); });
  });
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', function () { showRelative(-1); });
  lightboxNext.addEventListener('click', function () { showRelative(1); });
  lightbox.addEventListener('click', function (e) { if (e.target === lightbox) { closeLightbox(); } });
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) { return; }
    if (e.key === 'Escape') { closeLightbox(); }
    if (e.key === 'ArrowLeft') { showRelative(-1); }
    if (e.key === 'ArrowRight') { showRelative(1); }
  });

  /* ---------- Acordeón de preguntas frecuentes ---------- */
  var accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(function (item) {
    var trigger = item.querySelector('.accordion-trigger');
    var panel = item.querySelector('.accordion-panel');
    trigger.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      accordionItems.forEach(function (other) {
        other.classList.remove('open');
        other.querySelector('.accordion-panel').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        panel.style.maxHeight = panel.scrollHeight + 40 + 'px';
      }
    });
  });

  /* ---------- Botón volver arriba ---------- */
  var fabUp = document.getElementById('fabUp');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 600) { fabUp.classList.add('visible'); }
    else { fabUp.classList.remove('visible'); }
  });
  fabUp.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* El simulacro de examen teórico ahora es una app independiente
     (simulacro.html, con sus 40 preguntas e imágenes propias)
     incrustada mediante un iframe. No necesita JS acá. */

});
