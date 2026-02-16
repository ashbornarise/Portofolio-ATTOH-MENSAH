// ===== Portfolio Main Script =====

const STORAGE_KEY = 'portfolio_content';

// Default content (embedded for file:// and GitHub Pages compatibility)
const DEFAULT_CONTENT = {
  "hero": {
    "subtitle": "CREATIVE",
    "title": "PORTFOLIO",
    "name": "ATTOH-MENSAH Yao Pédro-Ebenezer",
    "tagline": "Étudiant en Génie Mécanique | Concepteur CAO | Formateur SolidWorks",
    "image": "Media/hero-photo.jpeg"
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
    "qualities": [
      "Leadership & Esprit d'équipe",
      "Pédagogie & Communication",
      "Rigueur & Précision",
      "Adaptabilité"
    ],
    "values": [
      "Excellence",
      "Partage du savoir",
      "Intégrité",
      "Travail bien fait"
    ]
  },
  "education": {
    "title": "ÉDUCATION",
    "items": [
      {
        "school": "ESIG Global Success",
        "degree": "Licence en Génie Mécanique",
        "year": "2024 - En cours",
        "description": "Formation approfondie en conception mécanique, automatisme et sciences de l'ingénieur au Togo."
      },
      {
        "school": "OPEM",
        "degree": "Formation initiale en techniques industrielles",
        "year": "Depuis la 6ème",
        "description": "Initiation précoce aux outils de conception assistée par ordinateur et aux techniques de fabrication."
      }
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

// Load content: localStorage (admin edits) first, then embedded defaults
function loadContent() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    return DEFAULT_CONTENT;
}

// Skill icons mapping
function getSkillIcon(category) {
    const icons = {
        'CAO': 'fa-drafting-compass',
        'Automatisme': 'fa-microchip',
        'Terrain': 'fa-wrench',
        'Leadership': 'fa-users'
    };
    return icons[category] || 'fa-cog';
}

// Get initials for inspiration avatars
function getInitials(name) {
    return name.split(' ').filter(w => w.length > 2).slice(0, 2).map(w => w[0]).join('');
}

// Populate the page with content
function render(data) {
    // Hero
    document.getElementById('hero-subtitle').textContent = data.hero.subtitle;
    document.getElementById('hero-title').textContent = data.hero.title;
    document.getElementById('hero-name').textContent = data.hero.name;
    document.getElementById('hero-tagline').textContent = data.hero.tagline;
    document.getElementById('hero-image').src = data.hero.image;

    // Introduction
    document.getElementById('intro-title').textContent = data.introduction.title;
    document.getElementById('intro-text').textContent = data.introduction.text;
    document.getElementById('intro-image').src = data.introduction.image;

    // About
    document.getElementById('about-title').textContent = data.about.title;
    document.getElementById('about-text').textContent = data.about.text;
    document.getElementById('about-image').src = data.about.image;

    const qualitiesList = document.getElementById('about-qualities');
    qualitiesList.innerHTML = data.about.qualities.map(q => `<li>${q}</li>`).join('');

    const valuesList = document.getElementById('about-values');
    valuesList.innerHTML = data.about.values.map(v => `<li>${v}</li>`).join('');

    // Education
    document.getElementById('education-title').textContent = data.education.title;
    document.getElementById('education-items').innerHTML = data.education.items.map(item => `
        <div class="timeline-item fade-in">
            <h3>${item.school}</h3>
            <div class="subtitle">${item.degree}</div>
            <span class="period">${item.year}</span>
            <p>${item.description}</p>
        </div>
    `).join('');

    // Skills
    document.getElementById('skills-title').textContent = data.skills.title;
    document.getElementById('skills-items').innerHTML = data.skills.items.map(skill => `
        <div class="skill-card fade-in">
            <div class="skill-icon"><i class="fas ${getSkillIcon(skill.category)}"></i></div>
            <h3>${skill.name}</h3>
            <div class="skill-category">${skill.category}</div>
            <p>${skill.description}</p>
        </div>
    `).join('');

    // Experience
    document.getElementById('experience-title').textContent = data.experience.title;
    document.getElementById('experience-items').innerHTML = data.experience.items.map(item => `
        <div class="timeline-item fade-in">
            <h3>${item.role}</h3>
            <div class="subtitle">${item.company}</div>
            <span class="period">${item.period}</span>
            <p>${item.description}</p>
        </div>
    `).join('');

    // Projects
    document.getElementById('projects-title').textContent = data.projects.title;
    document.getElementById('projects-items').innerHTML = data.projects.items.map(project => `
        <div class="project-card fade-in">
            <div class="project-card-image">
                <img src="${project.image}" alt="${project.name}">
            </div>
            <div class="project-card-body">
                <span class="badge">${project.category}</span>
                <h3>${project.name}</h3>
                <p>${project.description}</p>
            </div>
        </div>
    `).join('');

    // Roadmap
    document.getElementById('roadmap-title').textContent = data.roadmap.title;
    document.getElementById('roadmap-items').innerHTML = data.roadmap.items.map(item => `
        <div class="roadmap-card fade-in">
            <div class="roadmap-icon">${item.icon}</div>
            <div class="roadmap-date">${item.date}</div>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        </div>
    `).join('');

    // Inspirations
    document.getElementById('inspirations-title').textContent = data.inspirations.title;
    document.getElementById('inspirations-items').innerHTML = data.inspirations.items.map(item => `
        <div class="inspiration-card fade-in">
            <div class="inspiration-avatar">${getInitials(item.name)}</div>
            <h3>${item.name}</h3>
            <div class="inspiration-role">${item.role}</div>
            <p>${item.description}</p>
        </div>
    `).join('');

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

    // Init animations after rendering
    initAnimations();
}

// ===== Navbar scroll effect =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const toggle = document.getElementById('nav-toggle');
    const links = document.getElementById('nav-links');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    toggle.addEventListener('click', () => {
        links.classList.toggle('open');
    });

    // Close mobile menu on link click
    links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => links.classList.remove('open'));
    });

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const navLink = links.querySelector(`a[href="#${id}"]`);
            if (navLink) {
                navLink.classList.toggle('active', scrollY >= top && scrollY < top + height);
            }
        });
    });
}

// ===== Scroll animations =====
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ===== Contact form =====
function initContactForm() {
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.');
        e.target.reset();
    });
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    const data = loadContent();
    render(data);
    initNavbar();
    initContactForm();
});
