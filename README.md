# 🌸 Mes Mémoires

Une galerie photo personnelle élégante, hébergeable gratuitement sur GitHub Pages.

---

## 📁 Structure du projet

```
memoires/
├── index.html    → Structure HTML
├── style.css     → Styles et animations
├── script.js     → Logique, localStorage, interactions
└── README.md     → Ce fichier
```

---

## ✨ Fonctionnalités

- **4 cadres photo** — cliquer pour ajouter une image depuis votre appareil
- **Sauvegarde automatique** — les photos et légendes sont conservées dans votre navigateur (localStorage)
- **Légendes éditables** — double-cliquer sur une légende pour la modifier
- **Message secret éditable** — bouton "✎ Modifier" pour personnaliser le texte
- **Lightbox** — navigation au clavier (←/→/Esc) et par swipe sur mobile
- **Musique** — Nocturne de Chopin (domaine public)
- **Effacer** — supprime toutes les photos du navigateur
- **Sauvegarder** — exporte un fichier `.json` de sauvegarde

---

## 🚀 Hébergement sur GitHub Pages (gratuit)

### Étape 1 — Créer un dépôt GitHub
1. Aller sur [github.com](https://github.com) et se connecter
2. Cliquer **New repository**
3. Nommer le dépôt `memoires` (ou ce que vous voulez)
4. Cocher **Public** *(obligatoire pour GitHub Pages gratuit)*
5. Cliquer **Create repository**

### Étape 2 — Envoyer les fichiers
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/VOTRE_NOM/memoires.git
git push -u origin main
```

### Étape 3 — Activer GitHub Pages
1. Aller dans **Settings** → **Pages**
2. Source : **Deploy from a branch**
3. Branch : **main** / **/ (root)**
4. Cliquer **Save**

Votre site sera disponible à :
```
https://VOTRE_NOM.github.io/memoires/
```
*(le déploiement prend 1-2 minutes)*

---

## 💾 Base de données sur GitHub Pages ?

**Non — GitHub Pages ne supporte pas de base de données côté serveur.**

GitHub Pages héberge uniquement des fichiers statiques (HTML, CSS, JS).
Il n'y a pas de serveur PHP, Python, Node.js, ou SQL.

### Ce que ce projet utilise à la place

| Besoin | Solution | Coût |
|--------|----------|------|
| Sauvegarder les photos | `localStorage` du navigateur | Gratuit |
| Sauvegarder les légendes | `localStorage` du navigateur | Gratuit |
| Export de sauvegarde | Fichier `.json` téléchargeable | Gratuit |

> ⚠️ **Important** : le localStorage est propre à chaque navigateur.
> Si vous ouvrez la page sur un autre téléphone/PC, les photos ne seront pas là.
> C'est normal — elles sont stockées **localement** dans votre navigateur.

### Si vous voulez un stockage cloud (partagé entre appareils)

Ces services ont une offre gratuite et s'intègrent facilement en JavaScript :

| Service | Offre gratuite | Utilisation |
|---------|----------------|-------------|
| **Firebase** (Google) | 1 Go storage, 10 Go/mois transfer | Images + données |
| **Supabase** | 500 Mo storage | Base de données PostgreSQL |
| **Cloudinary** | 25 crédits/mois | Hébergement d'images |

Ces intégrations nécessiteraient de modifier `script.js` pour envoyer
les photos vers leur API au lieu du localStorage.

---

## 🎨 Personnalisation rapide

Dans `index.html`, modifiez ces textes :
```html
<p class="wlc-pre">une histoire en images</p>   <!-- sous-titre welcome -->
<h1 class="wlc-title">Mes Mémoires</h1>          <!-- titre principal -->
<p class="wlc-sub">quatre instants · une âme</p> <!-- accroche -->
```

Dans `style.css`, les couleurs sont dans `:root` :
```css
:root {
  --rose:  #c9a0a0;   /* rose doux */
  --dark:  #120e0e;   /* fond sombre */
  --gold:  #c4a882;   /* or/beige */
  --cream: #f5ede8;   /* texte clair */
}
```

---

## 📱 Compatibilité

- ✅ Chrome / Edge (dernières versions)
- ✅ Firefox
- ✅ Safari (iOS & macOS)
- ✅ Mobile (responsive + swipe)

---

*Fait avec ❤️ — photos stockées localement dans votre navigateur*
# 🌸 Mes Mémoires

Une galerie photo personnelle élégante avec protection par mot de passe, hébergeable gratuitement sur GitHub Pages.

---

## 🔐 Mot de passe par défaut
