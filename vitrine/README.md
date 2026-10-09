# L'Escale — site vitrine (Vue 3 + Vite)

Site vitrine statique de locations de caractère, reconstruit proprement en
**Vue 3 + Vite (JavaScript)**, servi par **nginx durci**, prêt à déployer sur
**Dokploy** via un `Dockerfile` multi-stage.

## Structure

```
.
├── index.html                # point d'entrée Vite (aucun script inline)
├── src/
│   ├── main.js               # montage Vue + directive v-reveal (scroll)
│   ├── App.vue               # assemblage des sections
│   ├── assets/main.css       # design system (tokens + styles)
│   ├── data/site.js          # ← TOUT le contenu éditable (textes, logements…)
│   └── components/           # Header, Hero, Stats, Logements, Services…
├── nginx.conf                # config nginx durcie (headers, CSP, cache)
├── Dockerfile                # build Node → runtime nginx non-root (port 8080)
└── .dockerignore
```

> **Pour modifier le contenu** (logements, services, avis, FAQ, contact, images),
> édite uniquement [`src/data/site.js`](src/data/site.js). Les vraies photos
> peuvent remplacer les URLs Unsplash — idéalement en les plaçant dans `public/`
> et en pointant `/mon-image.jpg` (elles seront alors servies en `'self'`, ce
> qui permet de retirer Unsplash de la CSP).

### ⚠️ À personnaliser en priorité (`src/data/site.js`)
- `BOOKING` : ton lien **Booking** global (boutons « Réserver » / « Nous
  contacter »).
- `booking` de chaque logement : le lien de **l'annonce Booking précise**.
- `SITE_URL` : domaine de production — configuré sur `https://escale.birostweb.fr`
  (également renseigné dans `index.html`, `public/robots.txt` et
  `public/sitemap.xml`).

## Fonctionnalités
- Header collant avec **menu mobile** et **scrollspy** (lien actif au scroll).
- Hero immersif, bandeau de confiance, cartes logements, services, hôte, avis.
- **FAQ en accordéon** (accessible au clavier).
- Boutons **Réserver → Booking** (nouvel onglet, `rel="noopener noreferrer"`).
- **Bouton retour en haut**, **lien d'évitement** (skip link) pour l'accessibilité.
- **SEO / partage** : `<title>`/description, Open Graph, Twitter Card, canonical,
  favicon SVG, `site.webmanifest`, `robots.txt`, `sitemap.xml`, et **données
  structurées JSON-LD** (`LodgingBusiness` : note, prix, contact).
- Animations de révélation au scroll (désactivées si `prefers-reduced-motion`).

## Développement local

```bash
npm install
npm run dev        # http://localhost:5173
```

Build de production :

```bash
npm run build      # génère dist/
npm run preview    # sert dist/ localement
```

## Docker (test local)

```bash
docker build -t lescale .
docker run --rm -p 8080:8080 lescale
# → http://localhost:8080   (health: http://localhost:8080/healthz)
```

Le conteneur tourne en **utilisateur non-root** et écoute sur **8080**.

## Déploiement sur Dokploy

1. Pousse ce dossier sur un dépôt Git (GitHub/GitLab) — ou utilise le déploiement
   par upload de Dokploy.
2. Dans Dokploy : **Create Application** → type **Dockerfile**.
3. Source : ton dépôt + branche. **Build path** : racine (`/`). Dokploy détecte
   le `Dockerfile` automatiquement.
4. **Port** : `8080` (port exposé par le conteneur).
5. **Health check path** : `/healthz`.
6. Ajoute ton **domaine** dans l'onglet Domains. Laisse Dokploy/Traefik gérer le
   certificat **HTTPS (Let's Encrypt)** → le header HSTS deviendra alors actif.
7. **Deploy**.

Aucune variable d'environnement n'est nécessaire (site statique).

## Sécurité mise en place

- **CSP stricte** : `script-src 'self'` (aucun script inline — le build Vite est
  100 % externe), `object-src 'none'`, `frame-ancestors 'none'`,
  `base-uri 'self'`, `form-action 'self'`.
- **En-têtes** : `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`,
  `Referrer-Policy`, `Permissions-Policy` (capteurs/caméra/micro/géoloc coupés),
  `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy`, **HSTS**.
- **Surface réduite** : seules les méthodes `GET`/`HEAD` sont acceptées
  (autres → `405`), `server_tokens off` (version nginx masquée), refus des
  fichiers cachés (`/.`), body limité à 1 Mo, timeouts courts.
- **Conteneur** : image `nginx-unprivileged` **non-root** (uid 101), port non
  privilégié 8080, image runtime sans Node ni sources ni `node_modules`.
- **Piège nginx évité** : tous les `add_header` sont au niveau `server` (un
  `add_header` en `location` aurait annulé l'héritage des headers de sécurité).

### Données structurées (JSON-LD) et CSP
La CSP est stricte (`script-src 'self'`). Le seul script inline autorisé est le
bloc **JSON-LD** de `index.html`, via un **hash sha256** listé dans `nginx.conf`.
Si tu modifies ce bloc JSON-LD, recalcule le hash et remplace-le dans
`nginx.conf` :

```bash
npm run build
node -e 'const c=require("crypto"),f=require("fs");const m=f.readFileSync("dist/index.html","utf8").match(/ld\+json">([\s\S]*?)<\/script>/);console.log("sha256-"+c.createHash("sha256").update(m[1]).digest("base64"))'
```

### Points à ajuster après déploiement
- Renseigner les **vrais liens Booking** et le **domaine** (voir « À personnaliser »).
- Remplacer les **images Unsplash** par les vraies photos (voir plus haut) puis
  resserrer `img-src` dans `nginx.conf`.
- Mettre à jour l'**email / téléphone** réels dans `src/data/site.js`.
- Si tu ajoutes un formulaire ou une API externe, élargir `connect-src`/
  `form-action` en conséquence dans `nginx.conf`.
