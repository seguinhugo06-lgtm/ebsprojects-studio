# ebs:projects.studio

Portfolio d'Elina Bouyssou — direction artistique & design graphique, Bordeaux.

Site statique reconstruit à partir de l'ancien site Framer. Aucune dépendance à
un service payant : le site se compile en HTML/CSS/images et s'héberge
gratuitement.

- **Framework** : [Astro](https://astro.build) (sortie 100 % statique)
- **Contenu** : fichiers Markdown dans `src/content/`
- **Images** : optimisées au build (WebP, tailles multiples, `srcset`)
- **JavaScript envoyé au navigateur** : ~2 ko (menu mobile + apparition au scroll)

## Démarrer

```bash
npm install
```

```bash
npm run dev
```

Le site est alors sur http://localhost:4321.

```bash
npm run build
```

Génère le site dans `dist/`. C'est ce dossier qui est mis en ligne.

```bash
npm run preview
```

Sert `dist/` localement, pour vérifier le rendu final avant publication.

## Structure

```
src/
  content/
    projects/        Un fichier .md par projet
    expertises/      Un fichier .md par expertise
  data/site.ts       Contact, réseaux sociaux, clients, étapes du projet
  assets/images/     Images sources (haute définition)
  components/        Header, Footer, cartes projet, filtres
  layouts/Base.astro Structure HTML commune + SEO
  pages/             Routes du site
  styles/global.css  Couleurs, typographie, espacements
public/
  brand/             Favicons et image de partage
  _redirects         Redirections des anciennes URL Framer
  _headers           En-têtes de cache et de sécurité
```

## Modifier le contenu

### Ajouter un projet

1. Déposer les images dans `src/assets/images/`, nommées `mon-projet-01.jpg`,
   `mon-projet-02.jpg`, etc.
2. Créer `src/content/projects/mon-projet.md` :

```markdown
---
title: "Nom du projet"
client: "Nom du client"
location: "Paris"
services:
  - "Direction Artistique"
  - "Édition"
order: 9
featured: false
cover: "../../assets/images/mon-projet-01.jpg"
thumb: "../../assets/images/mon-projet-02.jpg"
gallery:
  - "../../assets/images/mon-projet-01.jpg"
  - "../../assets/images/mon-projet-02.jpg"
links:
  - label: "Behance"
    url: "https://…"
---

Le texte de présentation du projet.
```

L'adresse du projet devient `/projects/mon-projet` — elle vient du nom du
fichier. La page, la grille, les filtres par expertise et le plan du site se
mettent à jour tout seuls.

Champs utiles :

| Champ      | Rôle                                                              |
| ---------- | ----------------------------------------------------------------- |
| `order`    | Position dans la grille « All projects » (croissant)              |
| `featured` | `true` pour apparaître dans « Selected projects » sur l'accueil    |
| `cover`    | Image de la grille des projets                                    |
| `thumb`    | Image dans les pages d'expertise                                  |
| `gallery`  | Images de la page projet ; la première sert d'image d'en-tête     |
| `services` | Doit reprendre exactement un libellé d'expertise (voir ci-dessous) |

### Libellés d'expertise valides

`Direction Artistique`, `Identité Visuelle`, `Illustration`, `Digital`,
`Packaging`, `Édition`, `Signalétique`.

Un projet apparaît automatiquement sur la page de chaque expertise citée dans
`services`. Une faute de frappe dans un libellé fait simplement disparaître le
projet de la page concernée — vérifier l'orthographe et les accents.

### Modifier les coordonnées, les clients, les étapes du projet

Tout est dans `src/data/site.ts`.

### Modifier les couleurs ou la typographie

Tout est en haut de `src/styles/global.css`, dans le bloc `:root`.

## Mise en ligne

Voir `HEBERGEMENT.md` pour la procédure complète et le choix de l’hébergeur.

En résumé : le site est hébergé par GitHub Pages et se republie tout seul à
chaque `git push` sur `main`. Le site de test tourne sur
<https://seguinhugo06-lgtm.github.io/ebsprojects-studio/> ; il reste à basculer
le domaine.

## Notes de migration

- Les URL des projets et des expertises sont identiques à l'ancien site, sauf
  quatre qui contenaient un accent : `édition`, `identité-visuelle`,
  `signalétique`, `epeda-collection-dédicace`. Elles sont redirigées vers leur
  version sans accent par des pages générées au build (avec `<link rel=canonical>`,
  donc sans perte de référencement). `public/_redirects` fait la même chose en
  vraies 301 sur Netlify et Cloudflare, mais GitHub Pages ignore ce fichier.
- Les images sources récupérées depuis Framer sont conservées en pleine
  définition dans `src/assets/images/` (~74 Mo). Elles ne sont jamais servies
  telles quelles : le build en produit des versions WebP redimensionnées.
