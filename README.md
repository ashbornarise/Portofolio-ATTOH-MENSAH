# Portfolio - ATTOH-MENSAH Yao Pédro-Ebenezer

Portfolio professionnel avec panneau d'administration et publication GitHub Pages automatique.

---

## Structure des fichiers

```
Portofolio-ATTOH-MENSAH/
├── index.html          → Page principale du portfolio
├── admin.html          → Panneau d'administration (accès protégé)
├── favicon.svg         → Icône de l'onglet
├── portfolio-data.json → Données publiées (créé par le panneau admin)
├── css/
│   ├── style.css       → Styles du portfolio
│   └── admin.css       → Styles du panneau admin
├── js/
│   ├── main.js         → Script du portfolio
│   └── admin.js        → Script du panneau admin
├── Media/              → Photos personnelles et professionnelles
├── mes-projets/        → Photos des projets
└── uploads/            → Images uploadées via l'admin (créé automatiquement)
```

---

## Accès au panneau d'administration

1. Ouvrez le site sur GitHub Pages
2. Scrollez tout en bas → cliquez le lien **🔒 Admin** dans le footer
3. Mot de passe par défaut : **`admin2026`**

---

## Comment publier vos modifications sur GitHub Pages

### Étape 1 — Créer un Token GitHub (une seule fois)

1. Connectez-vous sur [github.com](https://github.com)
2. Cliquez sur votre **avatar** (coin supérieur droit) → **Settings**
3. Descendez tout en bas → cliquez **Developer settings**
4. Allez dans **Personal access tokens** → **Tokens (classic)**
5. Cliquez **Generate new token (classic)**
6. Donnez un nom au token (ex : `portfolio-admin`)
7. Cochez la case **`repo`** (accès complet aux dépôts)
8. Cliquez **Generate token**
9. **Copiez le token** (il commence par `ghp_...`) — il ne sera plus visible après

### Étape 2 — Configurer le panneau admin

1. Ouvrez **admin.html** dans votre navigateur
2. Dans le menu gauche, cliquez **☁ Publication GitHub**
3. Remplissez les 4 champs :

| Champ | Valeur |
|-------|--------|
| Nom d'utilisateur GitHub | Votre username GitHub |
| Nom du dépôt | `Portofolio-ATTOH-MENSAH` |
| Branche | `main` |
| Token GitHub | Le token `ghp_...` que vous venez de créer |

4. Cliquez **Enregistrer les paramètres**

### Étape 3 — Modifier et publier

1. Naviguez dans les sections du menu (Hero, À propos, Compétences, etc.)
2. Faites vos modifications
3. Cliquez **Sauvegarder** (bouton vert en haut)
4. Cliquez **🚀 Publier sur GitHub** (bouton violet en bas du menu)
5. Attendez la barre de progression → **~2 minutes** pour que GitHub Pages se mette à jour

---

## Comment fonctionne la publication

```
Admin local (navigateur)
    ↓ "Publier sur GitHub"
GitHub API REST
    ↓ upload portfolio-data.json + images dans /uploads/
Dépôt GitHub
    ↓ GitHub Pages auto-déploie
Site visible par tous les visiteurs
```

**Flux de données sur le site :**
1. `main.js` essaie de charger `portfolio-data.json` (version publiée)
2. Si introuvable → charge les données du localStorage (prévisualisation admin locale)
3. Si vide → utilise les données par défaut intégrées dans `main.js`

---

## Fonctionnalités du panneau admin

| Section | Ce que vous pouvez modifier |
|---------|---------------------------|
| **Accueil (Hero)** | Sous-titre, titre, nom, description, lien CV, photo de profil |
| **Introduction** | Titre, texte, image |
| **À propos** | Texte, image, qualités, valeurs |
| **Éducation** | Écoles, diplômes, années, descriptions |
| **Compétences** | Nom, catégorie, description de chaque compétence |
| **Expérience** | Postes, entreprises, périodes, descriptions |
| **Projets** | Nom, catégorie, description, image de chaque projet |
| **Témoignages** | Auteur, rôle, texte, note, initiales |
| **Blog & Articles** | Titre, date, tag, résumé de chaque article |
| **Feuille de route** | Icône, date, titre, description de chaque étape |
| **Inspirations** | Nom, rôle, description de chaque modèle |
| **Objectif** | Titre et texte de l'objectif |
| **Contact** | Email, téléphone, adresse, Instagram, LinkedIn |
| **Publication GitHub** | Paramètres de connexion + bouton publier |

---

## Ajouter votre CV

1. Uploadez votre CV en PDF sur GitHub (dans le dossier `Media/`)
2. Dans l'admin → **Accueil (Hero)** → champ **Lien vers le CV**
3. Entrez le chemin relatif : `Media/mon-cv.pdf`
4. Sauvegardez et publiez

---

## Dépannage

**Erreur 401 lors de la publication**
→ Votre token GitHub est invalide ou expiré. Créez-en un nouveau.

**Erreur 403**
→ Le token n'a pas la permission `repo`. Recrée-le en cochant bien `repo`.

**Erreur 404**
→ Le nom du dépôt ou l'utilisateur est incorrect. Vérifiez l'orthographe.

**Les images ne s'affichent pas après publication**
→ Les images en base64 (uploadées localement) sont automatiquement envoyées dans le dossier `uploads/`. Attendez 2 minutes après la publication.

**Les modifications ne sont pas visibles**
→ Attendez 2 à 5 minutes (délai GitHub Pages) et rechargez la page avec `Ctrl+Shift+R` (vider le cache).

**Mot de passe oublié**
→ Ouvrez la console du navigateur (`F12` → Console) et tapez :
```js
localStorage.removeItem('portfolio_admin_auth')
```
Le mot de passe par défaut redevient `admin2026`.

---

## Déploiement GitHub Pages initial

Si votre site n'est pas encore en ligne :

1. Allez dans votre dépôt sur GitHub
2. Cliquez **Settings** → **Pages**
3. Source : sélectionnez **Deploy from a branch**
4. Branch : **main** / **root**
5. Cliquez **Save**
6. URL du site : `https://[votre-username].github.io/Portofolio-ATTOH-MENSAH/`

---

*Portfolio réalisé avec HTML5, CSS3 et JavaScript vanilla. Aucun framework requis.*