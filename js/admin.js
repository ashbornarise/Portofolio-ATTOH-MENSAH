// ===== Admin Panel Script =====

const STORAGE_KEY = 'portfolio_content';
const AUTH_KEY = 'portfolio_admin_auth';
const PASSWORD = 'admin2026';

let contentData = null;
let currentSection = 'hero';

// ===== Authentication =====
function checkAuth() {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
}

function initLogin() {
    if (checkAuth()) {
        showAdmin();
        return;
    }
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const pwd = document.getElementById('login-password').value;
        if (pwd === PASSWORD) {
            sessionStorage.setItem(AUTH_KEY, 'true');
            showAdmin();
        } else {
            showToast('Mot de passe incorrect', true);
        }
    });
}

function showAdmin() {
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('admin-app').style.display = 'flex';
    loadData();
}

// Default content (same as main.js, embedded for file:// compatibility)
const DEFAULT_CONTENT = {
  "hero": { "subtitle": "CREATIVE", "title": "PORTFOLIO", "name": "ATTOH-MENSAH Yao Pédro-Ebenezer", "tagline": "Étudiant en Génie Mécanique | Concepteur CAO | Formateur SolidWorks", "image": "Media/hero-photo.jpeg", "cv": "" },
  "introduction": { "title": "INTRODUCTION", "text": "Je suis ATTOH-MENSAH Yao Pédro-Ebenezer, étudiant en Génie Mécanique à l'ESIG Global Success (Togo). Mon parcours est défini par une alliance entre la maîtrise des outils numériques et la réalité du terrain. Passionné par la conception mécanique et l'automatisme, je transforme les idées en solutions concrètes grâce à la CAO et à la fabrication.", "image": "Media/Intro.jpeg" },
  "about": { "title": "À PROPOS DE MOI", "text": "Initié dès la classe de 6ème à l'OPEM, j'ai développé une expertise solide en CAO et en Automatisme. Je maîtrise SolidWorks, AutoCAD et Fusion 360 de manière avancée. Je conçois et programme des systèmes via Arduino. Mon savoir-faire s'est consolidé à travers des missions concrètes en maintenance navale, installation industrielle et formation technique.", "image": "Media/IMG-20250213-WA0045.jpg.jpeg", "qualities": ["Leadership & Esprit d'équipe", "Pédagogie & Communication", "Rigueur & Précision", "Adaptabilité"], "values": ["Excellence", "Partage du savoir", "Intégrité", "Travail bien fait"] },
  "education": { "title": "ÉDUCATION", "items": [{ "school": "ESIG Global Success", "degree": "Licence en Génie Mécanique", "year": "2024 - En cours", "description": "Formation approfondie en conception mécanique, automatisme et sciences de l'ingénieur au Togo." }, { "school": "OPEM", "degree": "Formation initiale en techniques industrielles", "year": "Depuis la 6ème", "description": "Initiation précoce aux outils de conception assistée par ordinateur et aux techniques de fabrication." }] },
  "skills": { "title": "COMPÉTENCES", "items": [{ "name": "SolidWorks", "category": "CAO", "description": "Maîtrise avancée de la modélisation 3D, assemblages complexes et mise en plan industrielle." }, { "name": "AutoCAD", "category": "CAO", "description": "Conception de plans 2D/3D professionnels pour l'industrie mécanique." }, { "name": "Fusion 360", "category": "CAO", "description": "Modélisation paramétrique, simulation et fabrication assistée par ordinateur." }, { "name": "Arduino", "category": "Automatisme", "description": "Conception et programmation de systèmes automatisés et de prototypes fonctionnels." }, { "name": "Maintenance Industrielle", "category": "Terrain", "description": "Diagnostic, réparation et optimisation de systèmes mécaniques en environnement industriel." }, { "name": "Gestion d'équipe", "category": "Leadership", "description": "Direction et coordination de groupes jusqu'à 30 personnes sur des projets techniques." }] },
  "experience": { "title": "EXPÉRIENCE PROFESSIONNELLE", "items": [{ "role": "Formateur SolidWorks", "company": "DEEZPRO.com", "period": "2024 - Présent", "description": "Transmission de connaissances en conception assistée par ordinateur." }, { "role": "Technicien - Installation de ponts élévateurs", "company": "2CIT pour JETOUR", "period": "2024", "description": "Installation et mise en service de ponts élévateurs automobiles." }, { "role": "Stagiaire en Maintenance Navale", "company": "OTAM", "period": "2024", "description": "Maintenance et réparation de systèmes mécaniques navals." }, { "role": "Chef d'équipe - Projet Table de Dessin", "company": "ESIG Global Success", "period": "2024", "description": "Gestion d'une équipe de 30 personnes pour la conception d'une table de dessin industrielle." }] },
  "projects": { "title": "MES PROJETS", "items": [{ "name": "Feu Tricolore Automatisé", "category": "Réalisé", "description": "Conception et programmation d'un système de feux tricolores automatisé utilisant Arduino.", "image": "mes-projets/feu-tricolores.jpg.jpeg" }, { "name": "Projet Mécanique Industriel", "category": "Réalisé", "description": "Réalisation d'un projet de conception mécanique intégrant la modélisation 3D et la fabrication.", "image": "mes-projets/20240719_102714.jpg.jpeg" }, { "name": "Conception et Fabrication", "category": "Réalisé", "description": "Projet technique alliant conception numérique sur SolidWorks et réalisation physique en atelier.", "image": "mes-projets/20240719_102946.jpg.jpeg" }] },
  "roadmap": { "title": "MA FEUILLE DE ROUTE", "items": [{ "date": "Été 2026", "title": "Certification SOLIDWORKS", "description": "Passer la certification CSWA et CSWP de Dassault Systèmes.", "icon": "🎯" }, { "date": "Mai 2027", "title": "Stage en Maintenance Industrielle", "description": "Intégrer une entreprise industrielle pour parfaire mes compétences.", "icon": "⚙️" }, { "date": "Juin 2027", "title": "Soutenance de Licence", "description": "Réaliser un projet de fin d'études ambitieux.", "icon": "🎓" }, { "date": "2027-2029", "title": "Master à Sorbonne Paris Nord", "description": "Poursuivre en Master en sciences pour l'ingénieur.", "icon": "🌍" }] },
  "inspirations": { "title": "MES MODÈLES D'INSPIRATION", "items": [{ "name": "Professeur Mawussi Bernardin", "role": "Université Sorbonne Paris Nord", "description": "Un modèle de réussite dans le haut enseignement en France." }, { "name": "Docteur Alphonse GOGOLI", "role": "Co-fondateur DEEZPRO", "description": "Mon mentor dans l'entrepreneuriat numérique." }, { "name": "Professeur Ayarema AFIO", "role": "Université de Lomé", "description": "Une référence de la recherche scientifique au Togo." }] },
  "testimonials": { "title": "TÉMOIGNAGES", "items": [{ "author": "Dr. Alphonse GOGOLI", "role": "Co-fondateur DEEZPRO", "text": "Pédro est un formateur exceptionnel qui sait transmettre sa passion pour la CAO à ses étudiants avec une clarté remarquable.", "rating": 5, "avatar": "AG" }, { "author": "Équipe JETOUR", "role": "Concessionnaire Automobile", "text": "Un technicien sérieux et compétent. L'installation des ponts élévateurs a été réalisée dans les délais avec un professionnalisme exemplaire.", "rating": 5, "avatar": "JT" }, { "author": "Prof. Ayarema AFIO", "role": "Université de Lomé", "text": "Un étudiant brillant doté d'une curiosité intellectuelle rare. Son projet de table de dessin témoigne d'une maîtrise technique impressionnante.", "rating": 5, "avatar": "PA" }] },
  "blog": { "title": "BLOG & ARTICLES", "items": [{ "title": "Introduction à SolidWorks pour débutants", "date": "Janvier 2026", "tag": "CAO", "summary": "Découvrez les bases de SolidWorks : interface, premières esquisses et modélisation 3D simple. Un guide pratique pour démarrer la conception assistée par ordinateur." }, { "title": "Arduino et automatisme : mon expérience", "date": "Novembre 2025", "tag": "Automatisme", "summary": "Retour d'expérience sur mon projet de feux tricolores automatisés : conception du circuit, programmation et intégration mécanique." }, { "title": "La maintenance navale : un métier d'avenir", "date": "Septembre 2025", "tag": "Terrain", "summary": "Mon stage chez OTAM m'a ouvert les yeux sur la complexité de la maintenance des systèmes navals et les opportunités qu'offre ce secteur en Afrique." }] },
  "objective": { "title": "MON OBJECTIF", "text": "Mon ambition ultime est de devenir un pionnier de l'ingénierie moderne en Afrique. Je souhaite créer des solutions industrielles 'Made in Togo' qui répondent aux besoins locaux, tout en bâtissant une structure capable de former les futurs experts technologiques du continent." },
  "contact": { "title": "CONTACTEZ-MOI", "subtitle": "Collaborons ensemble !", "email": "attohmensahyaopedroebenezer@gmail.com", "phone": "+228 99023602", "location": "Lomé, Baguida Monument", "instagram": "#", "linkedin": "#" }
};

// ===== Data Loading =====
function loadData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        contentData = JSON.parse(stored);
    } else {
        contentData = JSON.parse(JSON.stringify(DEFAULT_CONTENT));
    }
    renderSection(currentSection);
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contentData));
    showToast('Modifications sauvegardées !');
}

function resetData() {
    if (confirm('Voulez-vous vraiment réinitialiser toutes les données ? Les modifications seront perdues.')) {
        localStorage.removeItem(STORAGE_KEY);
        loadData();
        showToast('Données réinitialisées aux valeurs par défaut');
    }
}

// ===== Toast =====
function showToast(message, isError = false) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show' + (isError ? ' error' : '');
    setTimeout(() => toast.className = 'toast', 3000);
}

// ===== Section Rendering =====
function renderSection(section) {
    currentSection = section;
    const content = document.getElementById('admin-content');
    const titles = {
        hero: 'Accueil (Hero)',
        introduction: 'Introduction',
        about: 'À propos',
        education: 'Éducation',
        skills: 'Compétences',
        experience: 'Expérience',
        projects: 'Projets',
        testimonials: 'Témoignages',
        blog: 'Blog & Articles',
        roadmap: 'Feuille de route',
        inspirations: 'Inspirations',
        objective: 'Objectif',
        contact: 'Contact'
    };
    document.getElementById('admin-page-title').textContent = titles[section] || section;

    // Update active sidebar link
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.toggle('active', link.dataset.section === section);
    });

    const data = contentData[section];
    let html = '';

    switch (section) {
        case 'hero':
            html = renderSimpleFields(data, [
                { key: 'subtitle', label: 'Sous-titre', type: 'text' },
                { key: 'title', label: 'Titre principal', type: 'text' },
                { key: 'name', label: 'Nom complet', type: 'text' },
                { key: 'tagline', label: 'Description courte', type: 'text' },
                { key: 'cv', label: 'Lien vers le CV (URL ou chemin)', type: 'text' },
                { key: 'image', label: 'Photo de profil', type: 'text' }
            ]);
            break;

        case 'introduction':
            html = renderSimpleFields(data, [
                { key: 'title', label: 'Titre de section', type: 'text' },
                { key: 'text', label: 'Texte d\'introduction', type: 'textarea' },
                { key: 'image', label: 'Image (chemin)', type: 'text' }
            ]);
            break;

        case 'about':
            html = renderSimpleFields(data, [
                { key: 'title', label: 'Titre de section', type: 'text' },
                { key: 'text', label: 'Texte', type: 'textarea' },
                { key: 'image', label: 'Image (chemin)', type: 'text' }
            ]);
            html += renderEditableList('Qualités', 'qualities', data.qualities);
            html += renderEditableList('Valeurs', 'values', data.values);
            break;

        case 'education':
            html = `<div class="form-card"><div class="form-group"><label>Titre de section</label><input type="text" value="${escapeHtml(data.title)}" onchange="contentData.education.title = this.value"></div></div>`;
            html += renderArraySection(data.items, 'education', ['school', 'degree', 'year', 'description'], ['École/Université', 'Diplôme', 'Année', 'Description']);
            break;

        case 'skills':
            html = `<div class="form-card"><div class="form-group"><label>Titre de section</label><input type="text" value="${escapeHtml(data.title)}" onchange="contentData.skills.title = this.value"></div></div>`;
            html += renderArraySection(data.items, 'skills', ['name', 'category', 'description'], ['Compétence', 'Catégorie', 'Description']);
            break;

        case 'experience':
            html = `<div class="form-card"><div class="form-group"><label>Titre de section</label><input type="text" value="${escapeHtml(data.title)}" onchange="contentData.experience.title = this.value"></div></div>`;
            html += renderArraySection(data.items, 'experience', ['role', 'company', 'period', 'description'], ['Poste', 'Entreprise', 'Période', 'Description']);
            break;

        case 'projects':
            html = `<div class="form-card"><div class="form-group"><label>Titre de section</label><input type="text" value="${escapeHtml(data.title)}" onchange="contentData.projects.title = this.value"></div></div>`;
            html += renderArraySection(data.items, 'projects', ['name', 'category', 'description', 'image'], ['Nom du projet', 'Catégorie', 'Description', 'Image (chemin)']);
            break;

        case 'testimonials':
            html = `<div class="form-card"><div class="form-group"><label>Titre de section</label><input type="text" value="${escapeHtml(data.title)}" onchange="contentData.testimonials.title = this.value"></div></div>`;
            html += renderArraySection(data.items, 'testimonials', ['author', 'role', 'text', 'rating', 'avatar'], ['Auteur', 'Rôle / Entreprise', 'Témoignage', 'Note (1-5)', 'Initiales (avatar)']);
            break;

        case 'blog':
            html = `<div class="form-card"><div class="form-group"><label>Titre de section</label><input type="text" value="${escapeHtml(data.title)}" onchange="contentData.blog.title = this.value"></div></div>`;
            html += renderArraySection(data.items, 'blog', ['title', 'date', 'tag', 'summary'], ['Titre de l\'article', 'Date', 'Catégorie (tag)', 'Résumé']);
            break;

        case 'roadmap':
            html = `<div class="form-card"><div class="form-group"><label>Titre de section</label><input type="text" value="${escapeHtml(data.title)}" onchange="contentData.roadmap.title = this.value"></div></div>`;
            html += renderArraySection(data.items, 'roadmap', ['icon', 'date', 'title', 'description'], ['Icône (emoji)', 'Date', 'Titre', 'Description']);
            break;

        case 'inspirations':
            html = `<div class="form-card"><div class="form-group"><label>Titre de section</label><input type="text" value="${escapeHtml(data.title)}" onchange="contentData.inspirations.title = this.value"></div></div>`;
            html += renderArraySection(data.items, 'inspirations', ['name', 'role', 'description'], ['Nom', 'Rôle/Institution', 'Description']);
            break;

        case 'objective':
            html = renderSimpleFields(data, [
                { key: 'title', label: 'Titre de section', type: 'text' },
                { key: 'text', label: 'Texte de l\'objectif', type: 'textarea' }
            ]);
            break;

        case 'contact':
            html = renderSimpleFields(data, [
                { key: 'title', label: 'Titre de section', type: 'text' },
                { key: 'subtitle', label: 'Sous-titre', type: 'text' },
                { key: 'email', label: 'Email', type: 'text' },
                { key: 'phone', label: 'Téléphone', type: 'text' },
                { key: 'location', label: 'Adresse', type: 'text' },
                { key: 'instagram', label: 'Lien Instagram', type: 'text' },
                { key: 'linkedin', label: 'Lien LinkedIn', type: 'text' }
            ]);
            break;

        case 'github':
            html = renderGithubSection();
            break;
    }

    content.innerHTML = html;
}

// ===== GitHub Publication =====
function renderGithubSection() {
    var ghUser = localStorage.getItem('gh_user') || '';
    var ghRepo = localStorage.getItem('gh_repo') || '';
    var ghBranch = localStorage.getItem('gh_branch') || 'main';
    var ghToken = localStorage.getItem('gh_token') || '';

    return '<div class="form-card">' +
        '<h3 class="form-section-title"><i class="fas fa-cog"></i> Paramètres GitHub</h3>' +
        '<p style="color:var(--gray-600);font-size:0.9rem;margin-bottom:20px;">Ces informations permettent de publier vos modifications sur GitHub Pages afin que tous les visiteurs voient la version à jour.</p>' +
        '<div class="form-group"><label>Nom d\'utilisateur GitHub</label><input type="text" id="gh_user" value="' + escapeHtml(ghUser) + '" placeholder="ex: votre-username"></div>' +
        '<div class="form-group"><label>Nom du dépôt (repository)</label><input type="text" id="gh_repo" value="' + escapeHtml(ghRepo) + '" placeholder="ex: Portofolio-ATTOH-MENSAH"></div>' +
        '<div class="form-group"><label>Branche</label><input type="text" id="gh_branch" value="' + escapeHtml(ghBranch) + '" placeholder="main"></div>' +
        '<div class="form-group"><label>Token GitHub (PAT) <span style="font-weight:normal;color:var(--gray-600)">— stocké uniquement dans votre navigateur</span></label><input type="password" id="gh_token" value="' + escapeHtml(ghToken) + '" placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"></div>' +
        '<button class="btn btn-success" onclick="saveGithubSettings()"><i class="fas fa-save"></i> Enregistrer les paramètres</button>' +
        '</div>' +
        '<div class="form-card">' +
        '<h3 class="form-section-title"><i class="fas fa-rocket"></i> Publier sur GitHub Pages</h3>' +
        '<p style="color:var(--gray-600);font-size:0.9rem;margin-bottom:20px;">Cliquez sur "Publier" pour envoyer toutes vos modifications sur GitHub. Le site sera mis à jour en ~2 minutes.</p>' +
        '<div id="publish-progress-container" style="display:none;margin-bottom:15px;">' +
        '<div class="publish-progress-bar"><div id="publish-progress-fill" class="publish-progress-fill" style="width:0%"></div></div>' +
        '<p id="publish-status" style="font-size:0.85rem;color:var(--gray-600);margin-top:8px;text-align:center;"></p>' +
        '</div>' +
        '<button class="btn btn-publish" id="btn-publish-main" onclick="publishToGitHub()"><i class="fas fa-cloud-upload-alt"></i> Publier maintenant</button>' +
        '</div>' +
        '<div class="form-card">' +
        '<h3 class="form-section-title"><i class="fas fa-question-circle"></i> Comment créer un Token GitHub ?</h3>' +
        '<ol class="github-info-list">' +
        '<li>Connectez-vous sur <strong>github.com</strong></li>' +
        '<li>Cliquez sur votre avatar → <strong>Settings</strong></li>' +
        '<li>Allez dans <strong>Developer settings</strong> (tout en bas)</li>' +
        '<li>Cliquez sur <strong>Personal access tokens</strong> → <strong>Tokens (classic)</strong></li>' +
        '<li>Cliquez <strong>Generate new token (classic)</strong></li>' +
        '<li>Cochez la case <strong>repo</strong> (accès complet aux dépôts)</li>' +
        '<li>Cliquez <strong>Generate token</strong>, copiez le token et collez-le ci-dessus</li>' +
        '</ol>' +
        '</div>';
}

function saveGithubSettings() {
    localStorage.setItem('gh_user', (document.getElementById('gh_user').value || '').trim());
    localStorage.setItem('gh_repo', (document.getElementById('gh_repo').value || '').trim());
    localStorage.setItem('gh_branch', (document.getElementById('gh_branch').value || 'main').trim());
    localStorage.setItem('gh_token', (document.getElementById('gh_token').value || '').trim());
    showToast('Paramètres GitHub enregistrés !');
}

async function publishToGitHub() {
    var ghUser = localStorage.getItem('gh_user');
    var ghRepo = localStorage.getItem('gh_repo');
    var ghBranch = localStorage.getItem('gh_branch') || 'main';
    var ghToken = localStorage.getItem('gh_token');

    if (!ghUser || !ghRepo || !ghToken) {
        showToast('Veuillez d\'abord configurer vos paramètres GitHub !', true);
        renderSection('github');
        return;
    }

    var gs = { user: ghUser, repo: ghRepo, branch: ghBranch, token: ghToken };

    // Show progress on github panel if visible, else use sidebar toast only
    var progressContainer = document.getElementById('publish-progress-container');
    var progressFill = document.getElementById('publish-progress-fill');
    var statusEl = document.getElementById('publish-status');
    var publishBtnMain = document.getElementById('btn-publish-main');
    var publishBtnSidebar = document.getElementById('btn-publish-sidebar');

    if (progressContainer) progressContainer.style.display = 'block';
    if (publishBtnMain) publishBtnMain.disabled = true;
    if (publishBtnSidebar) publishBtnSidebar.disabled = true;

    function setProgress(pct, msg) {
        if (progressFill) progressFill.style.width = pct + '%';
        if (statusEl) statusEl.textContent = msg;
    }

    try {
        setProgress(5, 'Préparation des données...');

        // Deep copy to avoid modifying live data
        var exportData = JSON.parse(JSON.stringify(contentData));

        // Collect base64 images that need uploading
        var imagesToUpload = [];

        function collectImage(val, path) {
            if (val && typeof val === 'string' && val.startsWith('data:')) {
                imagesToUpload.push({ dataUrl: val, filePath: path });
            }
        }

        collectImage(exportData.hero.image, 'uploads/hero.jpg');
        collectImage(exportData.introduction.image, 'uploads/intro.jpg');
        collectImage(exportData.about.image, 'uploads/about.jpg');

        if (exportData.projects && exportData.projects.items) {
            exportData.projects.items.forEach(function(item, i) {
                collectImage(item.image, 'uploads/project-' + i + '.jpg');
            });
        }

        var total = imagesToUpload.length;

        // Upload each image and replace its value in exportData
        for (var i = 0; i < total; i++) {
            var img = imagesToUpload[i];
            var pct = 10 + (i / Math.max(total, 1)) * 55;
            setProgress(pct, 'Upload image ' + (i + 1) + '/' + total + '...');
            await ghUploadImage(gs, img.dataUrl, img.filePath);

            // Update exportData with the file path instead of base64
            if (img.filePath === 'uploads/hero.jpg') exportData.hero.image = img.filePath;
            else if (img.filePath === 'uploads/intro.jpg') exportData.introduction.image = img.filePath;
            else if (img.filePath === 'uploads/about.jpg') exportData.about.image = img.filePath;
            else if (img.filePath.startsWith('uploads/project-')) {
                var idx = parseInt(img.filePath.replace('uploads/project-', '').replace('.jpg', ''));
                if (exportData.projects.items[idx]) exportData.projects.items[idx].image = img.filePath;
            }
        }

        setProgress(70, 'Publication des données du portfolio...');
        await ghUpdateFile(gs, 'portfolio-data.json', JSON.stringify(exportData, null, 2), 'Mise à jour portfolio via admin panel');

        setProgress(100, 'Publication réussie !');
        showToast('Publié sur GitHub ! Site mis à jour dans ~2 minutes.');

        setTimeout(function() {
            if (progressContainer) progressContainer.style.display = 'none';
            if (progressFill) progressFill.style.width = '0%';
            if (publishBtnMain) publishBtnMain.disabled = false;
            if (publishBtnSidebar) publishBtnSidebar.disabled = false;
        }, 3500);

    } catch (err) {
        if (progressContainer) progressContainer.style.display = 'none';
        if (publishBtnMain) publishBtnMain.disabled = false;
        if (publishBtnSidebar) publishBtnSidebar.disabled = false;
        showToast('Erreur : ' + (err.message || 'Vérifiez vos paramètres GitHub'), true);
    }
}

async function ghUpdateFile(gs, filePath, textContent, commitMsg) {
    var url = 'https://api.github.com/repos/' + gs.user + '/' + gs.repo + '/contents/' + filePath;
    var headers = {
        'Authorization': 'token ' + gs.token,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github+json'
    };

    var sha = null;
    try {
        var getResp = await fetch(url, { headers: headers });
        if (getResp.ok) { sha = (await getResp.json()).sha; }
    } catch (e) {}

    var uint8 = new TextEncoder().encode(textContent);
    var binary = String.fromCharCode.apply(null, uint8);
    var base64Content = btoa(binary);
    var body = { message: commitMsg, content: base64Content, branch: gs.branch };
    if (sha) body.sha = sha;

    var putResp = await fetch(url, { method: 'PUT', headers: headers, body: JSON.stringify(body) });
    if (!putResp.ok) {
        var errJson = await putResp.json().catch(function() { return {}; });
        throw new Error(errJson.message || 'HTTP ' + putResp.status);
    }
    return putResp.json();
}

async function ghUploadImage(gs, dataUrl, filePath) {
    var base64Data = dataUrl.split(',')[1];
    if (!base64Data) throw new Error('Image invalide');

    var url = 'https://api.github.com/repos/' + gs.user + '/' + gs.repo + '/contents/' + filePath;
    var headers = {
        'Authorization': 'token ' + gs.token,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github+json'
    };

    var sha = null;
    try {
        var getResp = await fetch(url, { headers: headers });
        if (getResp.ok) { sha = (await getResp.json()).sha; }
    } catch (e) {}

    var body = { message: 'Upload image: ' + filePath, content: base64Data, branch: gs.branch };
    if (sha) body.sha = sha;

    var putResp = await fetch(url, { method: 'PUT', headers: headers, body: JSON.stringify(body) });
    if (!putResp.ok) {
        var errJson = await putResp.json().catch(function() { return {}; });
        throw new Error(errJson.message || 'HTTP ' + putResp.status);
    }
    return putResp.json();
}

// ===== Image Upload Handling =====
function handleImageUpload(inputEl, pathTarget, previewId) {
    const file = inputEl.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const dataUrl = e.target.result;
        // Store as base64 data URL in content
        setNestedValue(pathTarget, dataUrl);
        // Update preview
        const preview = document.getElementById(previewId);
        if (preview) {
            preview.src = dataUrl;
            preview.style.display = 'block';
        }
        // Update text input
        const textInput = document.getElementById('txt-' + previewId);
        if (textInput) textInput.value = '(image uploadée)';
        showToast('Image chargée ! N\'oubliez pas de sauvegarder.');
    };
    reader.readAsDataURL(file);
}

function setNestedValue(path, value) {
    const parts = path.split('.');
    let obj = contentData;
    for (let i = 0; i < parts.length - 1; i++) {
        const key = /^\d+$/.test(parts[i]) ? parseInt(parts[i]) : parts[i];
        obj = obj[key];
    }
    const lastKey = /^\d+$/.test(parts[parts.length - 1]) ? parseInt(parts[parts.length - 1]) : parts[parts.length - 1];
    obj[lastKey] = value;
}

// Render an image field with preview and upload button
function renderImageField(label, currentValue, pathTarget, uniqueId) {
    const previewSrc = currentValue || '';
    return `
        <div class="form-group">
            <label>${label}</label>
            <div class="image-field">
                <div class="image-preview-wrapper">
                    <img id="preview-${uniqueId}" src="${escapeHtml(previewSrc)}" alt="Aperçu" class="image-preview" style="${previewSrc ? '' : 'display:none'}" onerror="this.style.display='none'">
                </div>
                <div class="image-controls">
                    <input type="text" id="txt-preview-${uniqueId}" value="${escapeHtml(currentValue)}" onchange="setNestedValue('${pathTarget}', this.value); document.getElementById('preview-${uniqueId}').src=this.value; document.getElementById('preview-${uniqueId}').style.display='block';" placeholder="Chemin de l'image ou URL">
                    <label class="btn btn-upload" for="upload-${uniqueId}"><i class="fas fa-upload"></i> Choisir une image</label>
                    <input type="file" id="upload-${uniqueId}" accept="image/*" style="display:none" onchange="handleImageUpload(this, '${pathTarget}', 'preview-${uniqueId}')">
                </div>
            </div>
        </div>`;
}

// ===== Render Helpers =====
function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderSimpleFields(data, fields) {
    let html = '<div class="form-card">';
    fields.forEach(field => {
        if (field.key === 'image') {
            html += renderImageField(field.label, data[field.key], `${currentSection}.${field.key}`, `${currentSection}-${field.key}`);
        } else {
            html += `<div class="form-group"><label>${field.label}</label>`;
            if (field.type === 'textarea') {
                html += `<textarea onchange="contentData.${currentSection}.${field.key} = this.value">${escapeHtml(data[field.key])}</textarea>`;
            } else {
                html += `<input type="text" value="${escapeHtml(data[field.key])}" onchange="contentData.${currentSection}.${field.key} = this.value">`;
            }
            html += '</div>';
        }
    });
    html += '</div>';
    return html;
}

function renderEditableList(title, key, items) {
    let html = `<h3 class="form-section-title">${title}</h3><div id="list-${key}">`;
    items.forEach((item, i) => {
        html += `
            <div class="list-item-row">
                <input type="text" value="${escapeHtml(item)}" onchange="contentData.about.${key}[${i}] = this.value">
                <button class="btn btn-remove" onclick="removeListItem('${key}', ${i})"><i class="fas fa-trash"></i></button>
            </div>`;
    });
    html += '</div>';
    html += `<button class="btn btn-add" onclick="addListItem('${key}')"><i class="fas fa-plus"></i> Ajouter</button>`;
    return html;
}

function renderArraySection(items, sectionKey, fields, labels) {
    let html = '';
    items.forEach((item, i) => {
        html += `<div class="form-card">
            <div class="form-card-header">
                <h3>#${i + 1} - ${escapeHtml(item[fields[0]] || 'Nouvel élément')}</h3>
                <button class="btn btn-remove" onclick="removeArrayItem('${sectionKey}', ${i})"><i class="fas fa-trash"></i> Supprimer</button>
            </div>`;
        fields.forEach((field, j) => {
            if (field === 'image') {
                html += renderImageField(labels[j], item[field], `${sectionKey}.items.${i}.${field}`, `${sectionKey}-${i}-${field}`);
            } else {
                const isLong = field === 'description';
                html += `<div class="form-group"><label>${labels[j]}</label>`;
                if (isLong) {
                    html += `<textarea onchange="contentData.${sectionKey}.items[${i}].${field} = this.value">${escapeHtml(item[field])}</textarea>`;
                } else {
                    html += `<input type="text" value="${escapeHtml(item[field])}" onchange="contentData.${sectionKey}.items[${i}].${field} = this.value">`;
                }
                html += '</div>';
            }
        });
        html += '</div>';
    });
    html += `<button class="btn btn-add" onclick="addArrayItem('${sectionKey}', ${JSON.stringify(fields).replace(/"/g, '&quot;')})"><i class="fas fa-plus"></i> Ajouter un élément</button>`;
    return html;
}

// ===== List & Array Manipulation =====
function removeListItem(key, index) {
    contentData.about[key].splice(index, 1);
    renderSection(currentSection);
}

function addListItem(key) {
    contentData.about[key].push('Nouvel élément');
    renderSection(currentSection);
}

function removeArrayItem(sectionKey, index) {
    if (confirm('Supprimer cet élément ?')) {
        contentData[sectionKey].items.splice(index, 1);
        renderSection(currentSection);
    }
}

function addArrayItem(sectionKey, fieldsStr) {
    const fields = typeof fieldsStr === 'string' ? JSON.parse(fieldsStr) : fieldsStr;
    const newItem = {};
    fields.forEach(f => newItem[f] = '');
    contentData[sectionKey].items.push(newItem);
    renderSection(currentSection);
    // Scroll to bottom
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

// ===== Event Listeners =====
document.addEventListener('DOMContentLoaded', () => {
    initLogin();

    // Sidebar navigation
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            renderSection(link.dataset.section);
            // Close mobile sidebar
            document.getElementById('sidebar').classList.remove('open');
        });
    });

    // Save button
    document.getElementById('btn-save').addEventListener('click', saveData);

    // Reset button
    document.getElementById('btn-reset').addEventListener('click', resetData);

    // Logout button
    document.getElementById('btn-logout').addEventListener('click', () => {
        sessionStorage.removeItem(AUTH_KEY);
        location.reload();
    });

    // Keyboard shortcut: Ctrl+S to save
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            saveData();
        }
    });
});
