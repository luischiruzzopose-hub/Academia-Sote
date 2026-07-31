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

  /* =========================================================
     SIMULACRO DE EXAMEN TEÓRICO
     Preguntas basadas en normativa de tránsito vigente en Uruguay.
     ========================================================= */
  var quizQuestions = [
    {
      q: "Sin señalización que indique lo contrario, ¿cuál es la velocidad máxima permitida en zona urbana?",
      options: ["30 km/h", "45 km/h", "60 km/h", "90 km/h"],
      correct: 1
    },
    {
      q: "Sin señalización que indique lo contrario, ¿cuál es la velocidad máxima permitida en ruta?",
      options: ["60 km/h", "75 km/h", "90 km/h", "120 km/h"],
      correct: 2
    },
    {
      q: "¿Cuál es la tasa de alcohol en sangre permitida para conducir en Uruguay?",
      options: ["0,0 g/l (tolerancia cero)", "0,3 g/l", "0,5 g/l", "0,8 g/l"],
      correct: 0
    },
    {
      q: "¿Quiénes deben usar cinturón de seguridad dentro del vehículo?",
      options: ["Solo el conductor", "Solo los asientos delanteros", "Todos los ocupantes, adelante y atrás", "Solo si hay control policial"],
      correct: 2
    },
    {
      q: "Al acercarte a un semáforo en amarillo, ¿qué corresponde hacer?",
      options: ["Acelerar para cruzar antes de que cambie", "Prepararte para detenerte", "Tocar bocina", "Girar en U"],
      correct: 1
    },
    {
      q: "Una señal de tránsito triangular con borde rojo, ¿qué tipo de mensaje transmite?",
      options: ["Prohibición", "Advertencia o peligro", "Información", "Servicio"],
      correct: 1
    },
    {
      q: "Una señal circular con borde rojo, ¿qué tipo de mensaje transmite?",
      options: ["Advertencia", "Prohibición", "Obligación de girar", "Información turística"],
      correct: 1
    },
    {
      q: "En un cruce sin semáforos ni señalización de prioridad, ¿quién tiene el paso?",
      options: ["El vehículo que va más rápido", "El vehículo más grande", "Quien viene por la derecha", "Quien toca bocina primero"],
      correct: 2
    },
    {
      q: "¿Es obligatorio el uso de casco para motociclistas?",
      options: ["Solo para el conductor", "Solo en rutas", "Sí, para conductor y acompañante", "No es obligatorio"],
      correct: 2
    },
    {
      q: "¿Qué corresponde hacer al aproximarte a una rotonda?",
      options: ["Acelerar para entrar primero", "Ceder el paso a quien ya está circulando dentro", "Tocar bocina y avanzar", "Detenerte siempre por completo"],
      correct: 1
    }
  ];

  var quizIntro = document.getElementById('quizIntro');
  var quizGame = document.getElementById('quizGame');
  var quizResult = document.getElementById('quizResult');
  var quizStart = document.getElementById('quizStart');
  var quizStep = document.getElementById('quizStep');
  var quizScoreLive = document.getElementById('quizScoreLive');
  var quizProgressFill = document.getElementById('quizProgressFill');
  var quizQuestionEl = document.getElementById('quizQuestion');
  var quizOptionsEl = document.getElementById('quizOptions');
  var quizFeedback = document.getElementById('quizFeedback');
  var quizNext = document.getElementById('quizNext');
  var quizFinalScore = document.getElementById('quizFinalScore');
  var quizFinalMessage = document.getElementById('quizFinalMessage');
  var quizRestart = document.getElementById('quizRestart');

  var currentQuestion = 0;
  var score = 0;
  var answered = false;

  function startQuiz() {
    currentQuestion = 0;
    score = 0;
    quizIntro.style.display = 'none';
    quizResult.style.display = 'none';
    quizGame.style.display = 'block';
    renderQuestion();
  }

  function renderQuestion() {
    answered = false;
    var data = quizQuestions[currentQuestion];
    quizStep.textContent = 'Pregunta ' + (currentQuestion + 1) + ' de ' + quizQuestions.length;
    quizScoreLive.textContent = score + ' correctas';
    quizProgressFill.style.width = ((currentQuestion) / quizQuestions.length * 100) + '%';
    quizQuestionEl.textContent = data.q;
    quizFeedback.textContent = '';
    quizNext.style.display = 'none';

    quizOptionsEl.innerHTML = '';
    data.options.forEach(function (optionText, index) {
      var btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = optionText;
      btn.addEventListener('click', function () { selectAnswer(index, btn); });
      quizOptionsEl.appendChild(btn);
    });
  }

  function selectAnswer(index, btnEl) {
    if (answered) { return; }
    answered = true;
    var data = quizQuestions[currentQuestion];
    var allOptions = quizOptionsEl.querySelectorAll('.quiz-option');

    allOptions.forEach(function (opt, i) {
      opt.disabled = true;
      if (i === data.correct) { opt.classList.add('correct'); }
    });

    if (index === data.correct) {
      score += 1;
      quizFeedback.textContent = '¡Correcto!';
    } else {
      btnEl.classList.add('incorrect');
      quizFeedback.textContent = 'La respuesta correcta era: ' + data.options[data.correct];
    }

    quizScoreLive.textContent = score + ' correctas';
    quizProgressFill.style.width = ((currentQuestion + 1) / quizQuestions.length * 100) + '%';
    quizNext.style.display = 'inline-flex';
  }

  function nextQuestion() {
    currentQuestion += 1;
    if (currentQuestion < quizQuestions.length) {
      renderQuestion();
    } else {
      finishQuiz();
    }
  }

  function finishQuiz() {
    quizGame.style.display = 'none';
    quizResult.style.display = 'block';
    quizFinalScore.textContent = score + '/' + quizQuestions.length;

    var message;
    if (score >= 9) {
      message = '¡Excelente! Estás muy bien preparado para el examen teórico.';
    } else if (score >= 7) {
      message = '¡Muy bien! Repasá algunos temas del manual y vas a estar listo.';
    } else if (score >= 5) {
      message = 'Vas por buen camino. Te conviene repasar un poco más el manual de conducción.';
    } else {
      message = 'Te recomendamos repasar el manual de conducción antes de seguir practicando.';
    }
    quizFinalMessage.textContent = message;
  }

  if (quizStart) {
    quizStart.addEventListener('click', startQuiz);
    quizNext.addEventListener('click', nextQuestion);
    quizRestart.addEventListener('click', function () {
      quizResult.style.display = 'none';
      quizIntro.style.display = 'block';
    });
  }

});
