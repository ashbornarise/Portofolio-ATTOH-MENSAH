// ===== Portfolio Main Script =====

const STORAGE_KEY = 'portfolio_content';

// ===== i18n Translations =====
const i18n = {
  fr: {
    'nav.home': 'Accueil', 'nav.intro': 'Introduction', 'nav.about': 'À propos',
    'nav.skills': 'Compétences', 'nav.experience': 'Expérience', 'nav.projects': 'Projets',
    'nav.testimonials': 'Témoignages', 'nav.contact': 'Contact',
    'hero.contact': 'Me contacter', 'hero.cv': 'Télécharger mon CV',
    'about.qualities': 'Qualités', 'about.values': 'Valeurs',
    'testimonials.title': 'TÉMOIGNAGES', 'blog.title': 'BLOG & ARTICLES',
    'contact.name': 'Votre nom', 'contact.email': 'Votre email',
    'contact.message': 'Votre message', 'contact.send': 'Envoyer',
    'footer.rights': 'Tous droits réservés.'
  },
  en: {
    'nav.home': 'Home', 'nav.intro': 'Introduction', 'nav.about': 'About',
    'nav.skills': 'Skills', 'nav.experience': 'Experience', 'nav.projects': 'Projects',
    'nav.testimonials': 'Testimonials', 'nav.contact': 'Contact',
    'hero.contact': 'Contact me', 'hero.cv': 'Download my CV',
    'about.qualities': 'Qualities', 'about.values': 'Values',
    'testimonials.title': 'TESTIMONIALS', 'blog.title': 'BLOG & ARTICLES',
    'contact.name': 'Your name', 'contact.email': 'Your email',
    'contact.message': 'Your message', 'contact.send': 'Send',
    'footer.rights': 'All rights reserved.'
  }
};

let currentLang = 'fr';

function applyI18n(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (i18n[lang] && i18n[lang][key]) el.textContent = i18n[lang][key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (i18n[lang] && i18n[lang][key]) el.placeholder = i18n[lang][key];
  });
}

function initLang() {
  const stored = localStorage.getItem('portfolio_lang') || 'fr';
  applyI18n(stored);
  const btn = document.getElementById('lang-toggle');
  if (!btn) return;
  btn.textContent = stored === 'fr' ? 'FR | EN' : 'EN | FR';
  btn.addEventListener('click', () => {
    const newLang = currentLang === 'fr' ? 'en' : 'fr';
    localStorage.setItem('portfolio_lang', newLang);
    applyI18n(newLang);
    btn.textContent = newLang === 'fr' ? 'FR | EN' : 'EN | FR';
  });
}

// ===== Dark Mode =====
function initTheme() {
  const stored = localStorage.getItem('portfolio_theme') || 'light';
  setTheme(stored);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio_theme', theme);
  const icon = document.getElementById('theme-icon');
  if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ===== Typewriter Effect =====
function typewriter(elementId, text, speed) {
  speed = speed || 90;
  const el = document.getElementById(elementId);
  if (!el) return;
  el.textContent = '';
  el.classList.add('typewriter-active');
  let i = 0;
  const timer = setInterval(function() {
    if (i < text.length) {
      el.textContent += text[i++];
    } else {
      clearInterval(timer);
      el.classList.remove('typewriter-active');
      el.classList.add('typewriter-done');
    }
  }, speed);
}

// ===== Default Content =====
const DEFAULT_CONTENT = {
  "hero": {
    "subtitle": "CREATIVE",
    "title": "PORTFOLIO",
    "name": "ATTOH-MENSAH Yao Pédro-Ebenezer",
    "tagline": "Étudiant en Génie Mécanique | Concepteur CAO | Formateur SolidWorks",
    "image": "Media/hero-photo.jpeg",
    "cv": ""
  },
  "introduction": {
    "title": "INTRODUCTION",
    "text": "Je suis ATTOH-MENSAH Yao Pédro-Ebenezer, étudiant en Génie Mécanique à l'ESIG Global Success (Togo). Mon parcours est défini par une alliance entre la maîtrise des outils numériques et la réalité du terrain. Passionné par la conception mécanique et l'automatisme, je transforme les idées en solutions concrètes grâce à la CAO et à la fabrication.",
    "image": "Media/Intro.jpeg"
  },
  "about": {
    "title": "À PROPOS DE MOI",
    "text": "Initié dès la classe de 6ème à l'OPEM, j'ai développé une expertise solide en CAO et en Automatisme. Je maîtrise SolidWorks, AutoCAD et Fusion 360 de manière avancée. Je conçois et programme des systèmes via Arduino. Mon savoir-faire s'est consolidé à travers des missions concrètes en maintenance navale, installation industrielle et formation technique.",
    "image": "Media/IMG-20250213-WA0045.jpg.jpeg",
    "qualities": ["Leadership & Esprit d'équipe", "Pédagogie & Communication", "Rigueur & Précision", "Adaptabilité"],
    "values": ["Excellence", "Partage du savoir", "Intégrité", "Travail bien fait"]
  },
  "education": {
    "title": "ÉDUCATION",
    "items": [
      { "school": "ESIG Global Success", "degree": "Licence en Génie Mécanique", "year": "2024 - En cours", "description": "Formation approfondie en conception mécanique, automatisme et sciences de l'ingénieur au Togo." },
      { "school": "OPEM", "degree": "Formation initiale en techniques industrielles", "year": "Depuis la 6ème", "description": "Initiation précoce aux outils de conception assistée par ordinateur et aux techniques de fabrication." }
    ]
  },
  "skills": {
    "title": "COMPÉTENCES",
    "items": [
      { "name": "SolidWorks", "category": "CAO", "description": "Maîtrise avancée de la modélisation 3D, assemblages complexes et mise en plan industrielle." },
      { "name": "AutoCAD", "category": "CAO", "description": "Conception de plans 2D/3D professionnels pour l'industrie mécanique." },
      { "name": "Fusion 360", "category": "CAO", "description": "Modélisation paramétrique, simulation et fabrication assistée par ordinateur." },
      { "name": "Arduino", "category": "Automatisme", "description": "Conception et programmation de systèmes automatisés et de prototypes fonctionnels." },
      { "name": "Maintenance Industrielle", "category": "Terrain", "description": "Diagnostic, réparation et optimisation de systèmes mécaniques en environnement industriel." },
      { "name": "Gestion d'équipe", "category": "Leadership", "description": "Direction et coordination de groupes jusqu'à 30 personnes sur des projets techniques." }
    ]
  },
  "experience": {
    "title": "EXPÉRIENCE PROFESSIONNELLE",
    "items": [
      { "role": "Formateur SolidWorks", "company": "DEEZPRO.com", "period": "2024 - Présent", "description": "Transmission de connaissances en conception assistée par ordinateur. Création de contenus pédagogiques et formation d'étudiants aux logiciels de CAO." },
      { "role": "Technicien - Installation de ponts élévateurs", "company": "2CIT pour JETOUR", "period": "2024", "description": "Installation et mise en service de ponts élévateurs automobiles pour le compte du concessionnaire JETOUR." },
      { "role": "Stagiaire en Maintenance Navale", "company": "OTAM", "period": "2024", "description": "Maintenance et réparation de systèmes mécaniques navals. Diagnostic et optimisation des équipements portuaires." },
      { "role": "Chef d'équipe - Projet Table de Dessin", "company": "ESIG Global Success", "period": "2024", "description": "Gestion d'une équipe de 30 personnes pour la conception et fabrication d'une table de dessin industrielle." }
    ]
  },
  "projects": {
    "title": "MES PROJETS",
    "items": [
      { "name": "Feu Tricolore Automatisé", "category": "Réalisé", "description": "Conception et programmation d'un système de feux tricolores automatisé utilisant Arduino. Projet combinant électronique, programmation et design mécanique.", "image": "mes-projets/feu-tricolores.jpg.jpeg" },
      { "name": "Projet Mécanique Industriel", "category": "Réalisé", "description": "Réalisation d'un projet de conception mécanique intégrant la modélisation 3D et la fabrication. Application directe des compétences en CAO.", "image": "mes-projets/20240719_102714.jpg.jpeg" },
      { "name": "Conception et Fabrication", "category": "Réalisé", "description": "Projet technique alliant conception numérique sur SolidWorks et réalisation physique en atelier.", "image": "mes-projets/20240719_102946.jpg.jpeg" }
    ]
  },
  "testimonials": {
    "title": "TÉMOIGNAGES",
    "items": [
      { "author": "Dr. Alphonse GOGOLI", "role": "Co-fondateur DEEZPRO", "text": "Pédro est un formateur exceptionnel qui sait transmettre sa passion pour la CAO à ses étudiants avec une clarté remarquable.", "rating": 5, "avatar": "AG" },
      { "author": "Équipe JETOUR", "role": "Concessionnaire Automobile", "text": "Un technicien sérieux et compétent. L'installation des ponts élévateurs a été réalisée dans les délais avec un professionnalisme exemplaire.", "rating": 5, "avatar": "JT" },
      { "author": "Prof. Ayarema AFIO", "role": "Université de Lomé", "text": "Un étudiant brillant doté d'une curiosité intellectuelle rare. Son projet de table de dessin témoigne d'une maîtrise technique impressionnante.", "rating": 5, "avatar": "PA" }
    ]
  },
  "roadmap": {
    "title": "MA FEUILLE DE ROUTE",
    "items": [
      { "date": "Été 2026", "title": "Certification SOLIDWORKS", "description": "Passer la certification CSWA (Associate) et CSWP (Professional) de Dassault Systèmes pour une reconnaissance mondiale.", "icon": "🎯" },
      { "date": "Mai 2027", "title": "Stage en Maintenance Industrielle", "description": "Intégrer une entreprise industrielle pour parfaire mes compétences en diagnostic et optimisation des systèmes mécaniques.", "icon": "⚙️" },
      { "date": "Juin 2027", "title": "Soutenance de Licence", "description": "Réaliser un projet de fin d'études ambitieux répondant à une problématique industrielle réelle au Togo.", "icon": "🎓" },
      { "date": "2027-2029", "title": "Master à Sorbonne Paris Nord", "description": "Poursuivre en Master en sciences pour l'ingénieur à l'Institut Galilée pour approfondir la conception mécanique avancée.", "icon": "🌍" }
    ]
  },
  "inspirations": {
    "title": "MES MODÈLES D'INSPIRATION",
    "items": [
      { "name": "Professeur Mawussi Bernardin", "role": "Université Sorbonne Paris Nord", "description": "Un modèle de réussite dans le haut enseignement en France. Il incarne mon objectif de Master et l'excellence en sciences pour l'ingénieur." },
      { "name": "Docteur Alphonse GOGOLI", "role": "Co-fondateur DEEZPRO", "description": "Mon mentor dans l'entrepreneuriat numérique. Il m'a donné l'opportunité de transmettre mon savoir en CAO." },
      { "name": "Professeur Ayarema AFIO", "role": "Université de Lomé", "description": "Une référence de la recherche scientifique au Togo. Son parcours m'inspire la rigueur intellectuelle." }
    ]
  },
  "blog": {
    "title": "BLOG & ARTICLES",
    "items": [
      { "title": "Introduction à SolidWorks pour débutants", "date": "Janvier 2026", "tag": "CAO", "summary": "Découvrez les bases de SolidWorks : interface, premières esquisses et modélisation 3D simple. Un guide pratique pour démarrer la conception assistée par ordinateur." },
      { "title": "Arduino et automatisme : mon expérience", "date": "Novembre 2025", "tag": "Automatisme", "summary": "Retour d'expérience sur mon projet de feux tricolores automatisés : conception du circuit, programmation et intégration mécanique." },
      { "title": "La maintenance navale : un métier d'avenir", "date": "Septembre 2025", "tag": "Terrain", "summary": "Mon stage chez OTAM m'a ouvert les yeux sur la complexité de la maintenance des systèmes navals et les opportunités qu'offre ce secteur en Afrique." }
    ]
  },
  "objective": {
    "title": "MON OBJECTIF",
    "text": "Mon ambition ultime est de devenir un pionnier de l'ingénierie moderne en Afrique. Je souhaite créer des solutions industrielles 'Made in Togo' qui répondent aux besoins locaux, tout en bâtissant une structure capable de former les futurs experts technologiques du continent."
  },
  "contact": {
    "title": "CONTACTEZ-MOI",
    "subtitle": "Collaborons ensemble !",
    "email": "attohmensahyaopedroebenezer@gmail.com",
    "phone": "+228 99023602",
    "location": "Lomé, Baguida Monument",
    "instagram": "#",
    "linkedin": "#"
  }
};

// Load content: localStorage first, then defaults
function loadContent() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const parsed = JSON.parse(stored);
    // Merge new sections if missing (upgrade path)
    if (!parsed.testimonials) parsed.testimonials = DEFAULT_CONTENT.testimonials;
    if (!parsed.blog) parsed.blog = DEFAULT_CONTENT.blog;
    if (parsed.hero && parsed.hero.cv === undefined) parsed.hero.cv = '';
    return parsed;
  }
  return DEFAULT_CONTENT;
}

// ===== Helpers =====
function getSkillIcon(category) {
  const icons = { 'CAO': 'fa-drafting-compass', 'Automatisme': 'fa-microchip', 'Terrain': 'fa-wrench', 'Leadership': 'fa-users' };
  return icons[category] || 'fa-cog';
}

function getInitials(name) {
  return name.split(' ').filter(function(w) { return w.length > 2; }).slice(0, 2).map(function(w) { return w[0]; }).join('');
}

function starsHtml(rating) {
  var html = '';
  for (var i = 1; i <= 5; i++) {
    html += '<i class="fas fa-star' + (i <= rating ? '' : ' empty') + '"></i>';
  }
  return html;
}

// ===== Render =====
function render(data) {
  // Hero
  document.getElementById('hero-subtitle').textContent = data.hero.subtitle;
  document.getElementById('hero-name').textContent = data.hero.name;
  document.getElementById('hero-tagline').textContent = data.hero.tagline;
  document.getElementById('hero-image').src = data.hero.image;

  // CV button
  const cvBtn = document.getElementById('hero-cv-btn');
  if (cvBtn) {
    if (data.hero.cv) {
      cvBtn.href = data.hero.cv;
      cvBtn.style.display = 'inline-flex';
    } else {
      cvBtn.style.display = 'none';
    }
  }

  // Introduction
  document.getElementById('intro-title').textContent = data.introduction.title;
  document.getElementById('intro-text').textContent = data.introduction.text;
  document.getElementById('intro-image').src = data.introduction.image;

  // About
  document.getElementById('about-title').textContent = data.about.title;
  document.getElementById('about-text').textContent = data.about.text;
  document.getElementById('about-image').src = data.about.image;
  document.getElementById('about-qualities').innerHTML = data.about.qualities.map(function(q) { return '<li>' + q + '</li>'; }).join('');
  document.getElementById('about-values').innerHTML = data.about.values.map(function(v) { return '<li>' + v + '</li>'; }).join('');

  // Education
  document.getElementById('education-title').textContent = data.education.title;
  document.getElementById('education-items').innerHTML = data.education.items.map(function(item) {
    return '<div class="timeline-item fade-in"><h3>' + item.school + '</h3><div class="subtitle">' + item.degree + '</div><span class="period">' + item.year + '</span><p>' + item.description + '</p></div>';
  }).join('');

  // Skills
  document.getElementById('skills-title').textContent = data.skills.title;
  document.getElementById('skills-items').innerHTML = data.skills.items.map(function(skill) {
    return '<div class="skill-card fade-in"><div class="skill-icon"><i class="fas ' + getSkillIcon(skill.category) + '"></i></div><h3>' + skill.name + '</h3><div class="skill-category">' + skill.category + '</div><p>' + skill.description + '</p></div>';
  }).join('');

  // Experience
  document.getElementById('experience-title').textContent = data.experience.title;
  document.getElementById('experience-items').innerHTML = data.experience.items.map(function(item) {
    return '<div class="timeline-item fade-in"><h3>' + item.role + '</h3><div class="subtitle">' + item.company + '</div><span class="period">' + item.period + '</span><p>' + item.description + '</p></div>';
  }).join('');

  // Projects
  document.getElementById('projects-title').textContent = data.projects.title;
  document.getElementById('projects-items').innerHTML = data.projects.items.map(function(project) {
    return '<div class="project-card fade-in"><div class="project-card-image"><img src="' + project.image + '" alt="' + project.name + '"></div><div class="project-card-body"><span class="badge">' + project.category + '</span><h3>' + project.name + '</h3><p>' + project.description + '</p></div></div>';
  }).join('');

  // Testimonials
  if (data.testimonials) {
    document.getElementById('testimonials-title').textContent = data.testimonials.title;
    document.getElementById('testimonials-items').innerHTML = data.testimonials.items.map(function(t) {
      return '<div class="testimonial-card fade-in"><div class="testimonial-stars">' + starsHtml(t.rating) + '</div><p class="testimonial-text">&ldquo;' + t.text + '&rdquo;</p><div class="testimonial-author"><div class="testimonial-avatar">' + (t.avatar || getInitials(t.author)) + '</div><div><div class="testimonial-name">' + t.author + '</div><div class="testimonial-role">' + t.role + '</div></div></div></div>';
    }).join('');
  }

  // Roadmap
  document.getElementById('roadmap-title').textContent = data.roadmap.title;
  document.getElementById('roadmap-items').innerHTML = data.roadmap.items.map(function(item) {
    return '<div class="roadmap-card fade-in"><div class="roadmap-icon">' + item.icon + '</div><div class="roadmap-date">' + item.date + '</div><h3>' + item.title + '</h3><p>' + item.description + '</p></div>';
  }).join('');

  // Inspirations
  document.getElementById('inspirations-title').textContent = data.inspirations.title;
  document.getElementById('inspirations-items').innerHTML = data.inspirations.items.map(function(item) {
    return '<div class="inspiration-card fade-in"><div class="inspiration-avatar">' + getInitials(item.name) + '</div><h3>' + item.name + '</h3><div class="inspiration-role">' + item.role + '</div><p>' + item.description + '</p></div>';
  }).join('');

  // Blog
  if (data.blog) {
    document.getElementById('blog-title').textContent = data.blog.title;
    document.getElementById('blog-items').innerHTML = data.blog.items.map(function(post) {
      return '<div class="blog-card fade-in"><div class="blog-card-header"><span class="blog-tag">' + post.tag + '</span><span class="blog-date">' + post.date + '</span></div><h3>' + post.title + '</h3><p>' + post.summary + '</p></div>';
    }).join('');
  }

  // Objective
  document.getElementById('objective-title').textContent = data.objective.title;
  document.getElementById('objective-text').textContent = data.objective.text;

  // Contact
  document.getElementById('contact-title').textContent = data.contact.title;
  document.getElementById('contact-subtitle').textContent = data.contact.subtitle;
  document.getElementById('contact-email').textContent = data.contact.email;
  document.getElementById('contact-phone').textContent = data.contact.phone;
  document.getElementById('contact-location').textContent = data.contact.location;
  document.getElementById('contact-instagram').href = data.contact.instagram;
  document.getElementById('contact-linkedin').href = data.contact.linkedin;
  document.getElementById('contact-email-link').href = 'mailto:' + data.contact.email;

  // Typewriter on hero title after short delay
  setTimeout(function() { typewriter('hero-title', data.hero.title, 100); }, 400);

  // Scroll animations
  initAnimations();
}

// ===== Navbar =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  window.addEventListener('scroll', function() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  toggle.addEventListener('click', function() {
    links.classList.toggle('open');
  });

  links.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() { links.classList.remove('open'); });
  });

  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', function() {
    const scrollY = window.scrollY + 100;
    sections.forEach(function(section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const navLink = links.querySelector('a[href="#' + id + '"]');
      if (navLink) navLink.classList.toggle('active', scrollY >= top && scrollY < top + height);
    });
  });
}

// ===== Scroll Animations =====
function initAnimations() {
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(function(el) { observer.observe(el); });
}

// ===== Contact Form =====
function initContactForm() {
  document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
    e.target.reset();
  });
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', function() {
  const data = loadContent();
  render(data);
  initNavbar();
  initContactForm();
  initTheme();
  initLang();
});