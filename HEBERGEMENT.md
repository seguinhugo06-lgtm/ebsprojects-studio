# Hébergement et mise en ligne

Plan de sortie de Framer pour `ebsprojects.studio`.

## Point de départ

Relevé DNS / RDAP du 29 août 2026 :

| Élément          | Où                                | Action              |
| ---------------- | --------------------------------- | ------------------- |
| Nom de domaine   | IONOS SE — expire le 25/04/2027   | Rien, on le garde   |
| Serveurs DNS     | `ns10xx.ui-dns.*` (IONOS)         | À basculer          |
| Site web         | `sites.framer.app`                | À remplacer         |
| E-mail (MX)      | `mx00.ionos.fr`, `mx01.ionos.fr`  | **Ne pas toucher**  |

Le domaine n'appartient pas à Framer : Framer héberge seulement les pages.
Quitter Framer revient donc à changer où pointe le domaine. Aucun transfert de
domaine n'est nécessaire.

> **Le seul vrai risque.** Une boîte mail est rattachée au domaine chez IONOS.
> Toute manipulation DNS doit conserver les enregistrements `MX` à l'identique,
> sinon les e-mails cessent d'arriver sans message d'erreur. Voir l'étape 5.

## Hébergeur retenu : Cloudflare Pages

| Plateforme          | Bande passante                  | Mises en ligne | Coût        |
| ------------------- | ------------------------------- | -------------- | ----------- |
| **Cloudflare Pages**| **Illimitée**                   | 500/mois       | **0 €**     |
| Netlify             | ~15 Go/mois (300 crédits)       | via crédits    | 0 €         |
| GitHub Pages        | 100 Go/mois (indicatif)         | illimitées     | 0 €         |
| o2switch, Infomaniak| illimitée                       | FTP manuel     | ~5–8 €/mois |

Le site est lourd en images, donc la bande passante est le critère décisif.
Netlify plafonne autour de 15 Go/mois depuis son passage aux crédits ; Cloudflare
Pages ne facture pas la bande passante sur les sites statiques.

## Migration en 8 étapes

L'ordre compte : Framer reste actif jusqu'à la dernière étape, le site n'est
jamais hors ligne.

### 1. Déposer le code sur GitHub

Créer un dépôt **privé**, puis :

```bash
git add -A && git commit -m "Site reconstruit hors Framer" && git push -u origin main
```

### 2. Créer le projet Cloudflare Pages

Compte gratuit sur Cloudflare → *Workers & Pages* → *Create* → *Pages* →
*Connect to Git*. Sélectionner le dépôt et renseigner :

```
Framework preset  Astro
Build command     npm run build
Output directory  dist
```

### 3. Contrôler le site de test

Cloudflare publie sur une adresse temporaire en `.pages.dev`. Tout vérifier
**ici**, avant de toucher au domaine.

### 4. Ajouter le domaine à Cloudflare

*Websites* → *Add a site* → `ebsprojects.studio` → plan **Free**. Cloudflare lit
la configuration DNS existante chez IONOS et la recopie.

### 5. Vérifier les e-mails — étape critique

Dans l'onglet DNS de Cloudflare, confirmer que les enregistrements `MX` vers
`mx00.ionos.fr` et `mx01.ionos.fr` ont été repris, ainsi que les `TXT` (SPF,
DKIM) éventuels. S'ils manquent, les ajouter à la main **maintenant**.

Ne pas passer à l'étape 6 tant que ce n'est pas fait.

### 6. Basculer les serveurs DNS chez IONOS

Dans l'espace IONOS, remplacer les serveurs de noms `ui-dns` par les deux
adresses affichées par Cloudflare. Propagation : de quelques minutes à 24 h.
Pendant ce temps, le site Framer continue de répondre.

### 7. Rattacher le domaine au site

Projet Pages → *Custom domains* → ajouter `ebsprojects.studio` puis
`www.ebsprojects.studio`. Cloudflare crée les enregistrements et le certificat
HTTPS automatiquement.

### 8. Résilier Framer

Attendre 48 h de site en ligne sans anomalie, vérifier qu'un e-mail envoyé à
l'adresse du domaine arrive bien, puis résilier.

## Vérifications avant de résilier

- [ ] Les 8 pages projet s'affichent, images comprises
- [ ] Les 7 pages d'expertise listent les bons projets
- [ ] Le menu fonctionne sur téléphone
- [ ] Les liens e-mail et téléphone ouvrent l'application attendue
- [ ] Un e-mail envoyé à l'adresse du domaine arrive toujours
- [ ] Le cadenas HTTPS s'affiche sur le domaine nu **et** sur `www`
- [ ] Une ancienne adresse accentuée redirige correctement, par exemple
      `/projects/expertises/édition`

## Coût après migration

Le renouvellement du domaine chez IONOS, une fois par an, environ 20–30 €.
Rien d'autre : hébergement, HTTPS, mises en ligne et bande passante sont
gratuits.

## Autres hébergeurs

Le site est un dossier de fichiers statiques : il fonctionne partout.

- **Netlify / GitHub Pages** — même principe, connecter le dépôt.
  `netlify.toml` est déjà présent.
- **Hébergeur classique (o2switch, Infomaniak, OVH)** — lancer `npm run build`
  puis téléverser le contenu de `dist/` par FTP. Les redirections de
  `public/_redirects` devront alors être réécrites en `.htaccess`.

---

*Relevés DNS et RDAP effectués le 29 août 2026. Les limites des offres gratuites
évoluent : vérifier la page tarifaire de Cloudflare avant de vous engager. Les
valeurs exactes des serveurs DNS à saisir chez IONOS sont celles affichées par
votre tableau de bord Cloudflare.*
