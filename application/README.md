# Maison du Bonheur

Site vitrine des deux appartements **Maison du Bonheur** (Sainte-Savine) et
**Maison du Bonheur 2** (Troyes). Vue 3 + Vite + Tailwind CSS v4.

Domaine prévu : `www.Maisondubonheurstesavine.fr`

## Démarrer

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

## Modifier le contenu

**Tout le contenu se modifie dans un seul fichier**, sans toucher au code :

```
src/data/site.js
```

On y trouve les textes, les prix, les photos, les équipements, les avis, la FAQ,
le guide de Troyes et les liens Booking.

### À compléter quand vous voulez

| Où | Quoi |
|---|---|
| `hote.image` | Votre portrait. Tant qu'il est vide, un monogramme « M » orange s'affiche. |
| `contact.email`, `contact.tel`, `contact.instagram` | Vides = la ligne est simplement masquée sur le site. |
| `site.domaine` | Le nom de domaine affiché en pied de page. |
| `credit` | Ex. « Site réalisé par Théo Birost ». Vide = masqué. |

## Les tarifs

Relevés sur Booking le 25/08/2026, pour un séjour de **2 nuits, 2 adultes**,
sur deux dates distinctes (14–16 oct. et 4–6 nov. 2026) — tarifs identiques
sur les deux.

| Logement | 2 nuits | Par nuit | Remise Booking |
|---|---|---|---|
| Maison du Bonheur 2 (Troyes) | 238 € | **119 €** | aucune |
| Maison du Bonheur (Sainte-Savine) | 286 € → 267 € | **143 €** | −7 % (soit 133,50 €/nuit) |

Les deux incluent **taxes et frais** ainsi que le **petit-déjeuner**.

Le site affiche le **tarif plein** (119 € / 143 €), jamais le prix remisé : une
promotion peut disparaître, et il vaut mieux que le visiteur trouve moins cher
sur Booking que l'inverse. Le champ `prixRemise` existe dans `site.js` si vous
souhaitez l'afficher un jour.

> ⚠️ Une seule nuit ressort indisponible sur les deux logements : il semble y
> avoir un **minimum de 2 nuits** côté Booking.

> ⚠️ Sainte-Savine est **plus cher que Troyes** (143 € contre 119 €) alors
> qu'il est plus petit (42 m² contre 48 m²) et moins bien noté (8,0 contre
> 9,0). À vérifier — c'est peut-être involontaire.

### Chiffres calculés, jamais recopiés

Trois valeurs sont désormais **dérivées des données** dans `App.vue`, et non
écrites en dur — c'est ce qui avait laissé des contradictions s'installer :

| Valeur | Calcul | Erreur qu'elle corrige |
|---|---|---|
| Note du héros | moyenne pondérée par le nombre d'avis → **8,6** | le héros affichait **9,0** (Troyes seul) pendant que la section Avis calculait **8,6**, sur la même page |
| Mention | seuils Booking (9+ « Fabuleux », 8+ « Très bien ») | « Fabuleux » annoncé pour une moyenne de 8,6 |
| Prix des boutons | minimum des deux logements | « 95 € » figé à six endroits |

Deux autres notes étaient présentées comme globales alors qu'elles ne valent
que pour un logement :

- **Accueil 9,6** → c'est la note de Troyes seul ; la pondérée est **9,4**.
- **Wifi 10/10** → c'est Sainte-Savine ; Troyes est à 9,5. Reformulé en
  « Wifi fibre gratuit, noté 9,5/10 à Troyes et 10/10 à Sainte-Savine ».

Les notes détaillées de chaque fiche logement restent celles du logement
concerné (Troyes garde bien « Personnel 9,6 ») : là, c'est exact.

Les prix des boutons d'appel sont **calculés depuis `site.js`**, plus jamais
écrits en dur : c'est ce qui avait laissé traîner « 95 € » à six endroits.

## Réservation : tout passe par Booking

**Rien ne se réserve sur le site.** Aucun calendrier, aucun calcul de prix,
aucun formulaire : Booking.com gère les disponibilités, le tarif définitif et
le paiement.

Le parcours est volontairement court :

1. Les boutons **« Réserver »** génériques (navigation, héros, barre collante,
   FAQ, contact) ouvrent un **sélecteur** listant les deux logements — c'est
   nécessaire, un bouton unique ne peut pas deviner quelle adresse choisir.
2. Un clic sur un logement ouvre **directement son annonce Booking**
   (nouvel onglet, `rel="noopener"`).
3. Sur les fiches de chaque logement, le bouton **« Réserver sur Booking »**
   est un lien direct : pas de fenêtre intermédiaire du tout.

Les liens d'annonce sont dans `src/data/site.js` (`BOOKING_SAVINE` /
`BOOKING_TROYES`). Les paramètres de suivi (`aid`, `label`) sont conservés ;
les identifiants de session personnels ont été retirés des URL d'origine.

> Une version précédente proposait un calendrier et une estimation de prix
> avant de rebondir sur Booking. Supprimé volontairement : cela dupliquait
> Booking et laissait croire qu'on pouvait réserver ici.

## Les photos

Les photos proviennent des annonces Booking (CDN `cf.bstatic.com`), via le helper
`P("id|clé")` dans `src/data/site.js`. Elles sont donc **liées, pas hébergées**.

**Images responsives.** `src/utils/photos.js` dérive un `srcset` de chaque URL
Booking (300 / 500 / 1024 / 1920 px), si bien qu'un téléphone télécharge la
version 1024 au lieu de 1920. C'est automatique et vérifié : rien à faire dans
`site.js`. Si vous remplacez une URL par une des vôtres, la fonction renvoie
simplement `undefined` et l'image s'affiche normalement, sans srcset.

> Pour un site en production, mieux vaut héberger vos propres fichiers : déposez-les
> dans `public/photos/` et remplacez `P("…")` par `"/photos/salon.jpg"`. Vous ne
> dépendrez plus de Booking et les images se chargeront plus vite.

## Direction artistique

Parti pris **éditorial**, **angles vifs partout** : une revue imprimée plutôt
qu'un empilement de cartes arrondies. Concrètement — chapitres numérotés, gros
chiffres filigranes, filets plutôt que contours, images en débord qui cassent la
grille, mosaïque à colonnes pour les avis, index dépliant pour le guide de
Troyes, et un grain papier sur toute la page.

Aucun `border-radius` dans le projet, à deux exceptions près : les halos flous
décoratifs, qui sont des cercles de lumière et non des cartes.

### Typographie

- **Onest** pour les titres — sans humaniste chaleureuse, variable (300–800).
  Classes `.display` (grands titres), `.display-s` (intertitres), `.aparte`
  (sous-titres de logement).
  Deux réglages propres aux sans en grand : **interlettrage nettement
  resserré** (`-0.035em`, sans quoi les grands titres paraissent délavés) et un
  peu plus de graisse que pour une serif.
  ⚠️ **Onest n'a pas d'italique.** En demander une donnerait un faux oblique
  penché mécaniquement par le navigateur. D'où la classe `.aparte`, qui
  distingue par la graisse et l'interlettrage, jamais par l'inclinaison.
  *Historique : Fraunces trop fantaisiste, Cormorant Garamond trop fine et
  froide, Newsreader encore une serif — le brief final était « une sans, mais
  chaleureuse ».*
- **Hanken Grotesk** pour le texte courant. Deux sans se côtoient donc : la
  hiérarchie tient à la graisse et à l'interlettrage, pas au dessin.
- `.surtitre` = petites capitales espacées. `.chiffres` = chiffres tabulaires
  (notes, prix, numéros de chapitre).

### Palette

Camaïeu chaud à plusieurs valeurs — les fonds se superposent au lieu d'alterner
blanc et beige. Tokens Tailwind dans `src/style.css` (`@theme`) :

| Token | Usage |
|---|---|
| `blanc` / `papier` / `papier-2` | blanc, blanc chaud (fond), crème (sections alternées) |
| `sable` / `argile` / `terre` | marron clair, du plus pâle au plus soutenu |
| `cacao` / `espresso` | marrons foncés des sections sombres |
| `encre` / `encre2` / `encre3` | textes principal, secondaire, tertiaire |
| `ligne` / `ligne-2` | filets fins |
| `orange` / `orange-vif` | orange de marque, aplats et décor |
| `orange-fonce` | boutons (blanc lisible dessus, 4,8:1) |
| `orange-encre` | orange en petit texte sur papier (6,0:1) |
| `jaune` / `jaune-vif` / `jaune-pale` | jaune soleil, accents et aplats |
| `jaune-encre` | jaune lisible en petit texte (5,4:1) |

Le fond est passé d'un beige soutenu à un **blanc chaud** (`#FFFCF7`) et les
bruns ont été éclaircis : le brief demande « marron clair », pas chocolat noir.

Utilisables directement : `bg-papier`, `text-orange-encre`, `text-jaune-vif`…

### Icônes

[Lucide](https://lucide.dev) (`lucide-vue-next`). `IconBase.vue` fait la
correspondance entre un nom français (`parking`, `cafe`, `pin`…) et le composant
Lucide : pour changer une icône, une seule ligne à modifier dans ce fichier.
Seules les 27 icônes utilisées sont embarquées (tree-shaking).

### Animations

Portées par [Motion](https://motion.dev) (`inView` pour les apparitions,
`scroll` pour la parallaxe et la progression), enveloppées dans
`src/composables/useMotion.js` :

```html
<div data-stagger="90">              <!-- cascade, pas de 90 ms -->
  <p data-anim="up">…</p>            <!-- up | down | left | right -->
  <img data-anim="clip" />           <!-- volet qui remonte -->
  <span data-anim="zoom">…</span>
</div>
```

S'y ajoutent la parallaxe du héros (`useParallax`), la barre de progression de
lecture (`useScrollProgress`), le bandeau défilant (`MarqueeBand`) et l'entrée
ligne par ligne du titre du héros.

**Pourquoi pas AOS** : la dernière publication npm d'AOS remonte à juin 2022
(v2.3.4) et sa dernière vraie version à 2018. Motion est publié en continu,
s'appuie sur IntersectionObserver et l'API Web Animations, et se tree-shake.

Trois garde-fous appris à la dure :

1. **Pas de `will-change` global.** Le poser sur la centaine d'éléments animés
   crée autant de couches de compositing et fait littéralement tomber le rendu.
2. **Pas de `mix-blend-mode` sur le calque de grain** (fixe, plein écran) : il
   force toute la page dans un seul groupe de compositing. Simple opacité.
3. **Repli si Motion échoue.** Le CSS masque le contenu dès que `js-motion`
   est posée sur `<html>` ; si `IntersectionObserver` manque ou que la
   librairie lève une erreur, tout est affiché sans animation plutôt que de
   laisser une page vide.

> À noter : `IntersectionObserver` ne se déclenche pas dans un document non
> rendu (onglet en arrière-plan) — c'est conforme à la spécification. Les
> apparitions se rattrapent d'elles-mêmes dès que l'onglet redevient visible.

## Sections du site

1. **Hero** — photo plein écran, note Booking 9,0, arguments clés, accès aux deux logements
2. **L'hôtesse** — Marie, avec un avis Booking en appui
3. **Les logements** — données réelles, galerie, notes détaillées Booking, prix
4. **Le petit-déjeuner** — l'argument nº 1 des avis, en section dédiée
5. **Équipements & services** — 8 entrées en grille de filets
6. **Troyes** — guide local et **« Y venir »** : train, voiture, avion, sur place
7. **Avis** — commentaires repris de Booking
8. **FAQ** — accordéon
9. **Contact** — CTA + adresses des deux logements

### Longueur de la page

La page a été raccourcie de **13,4 à 10,5 écrans** : respiration des sections
réduite, bandeau de confiance retiré (doublon du bandeau défilant et des
chiffres du héros), et bloc de notes déplacé sous la photo des logements pour
combler le vide qui allongeait les fiches.

Aucune donnée n'a été supprimée de `site.js` — seul l'affichage est limité, par
une constante en haut du composant :

| Composant | Constante | Valeur |
|---|---|---|
| `GuideSection.vue` | `NB_LIEUX` | 4 lieux sur 6 |
| `FaqSection.vue` | `NB_QUESTIONS` | 5 questions sur 7 |
| `LogementCard.vue` | `.slice(0, 4)` | 4 notes détaillées sur 6 |

Montez ces chiffres pour en afficher davantage.

### ⚠️ Piège : `max-w` en `ch`

L'unité `ch` se calcule d'après **la police de l'élément qui la porte**. Posée
sur un conteneur en 1 rem, une largeur en `ch` étrangle un titre qui, lui, fait
3 rem : le titre des avis se retrouvait sur **six lignes d'un mot** dans une
colonne de 190 px, avec un grand vide à droite.

Les largeurs en `ch` sont donc posées **sur les textes eux-mêmes**
(`max-w-[17ch]` sur le `h2`, `max-w-[54ch]` sur le chapô), jamais sur le
conteneur. Les conteneurs utilisent des pixels.

Plus : **lightbox** photo (flèches ←/→, Échap, balayage tactile), **sélecteur
de logement** vers Booking, et **barre de réservation collante** au scroll.

## Structure

```
src/
├── main.js                       point d'entrée
├── style.css                     thème Tailwind (palette + animations)
├── App.vue                       orchestration, modales
├── data/site.js                  ← TOUT LE CONTENU
├── composables/
│   ├── useMotion.js              apparitions, cascade, parallaxe, progression
│   └── useDialogue.js            piège à focus + balayage tactile
├── utils/
│   ├── photos.js                 srcset responsive depuis les URL Booking
│   └── format.js                 formatage FR (notes)
└── components/
    ├── TheNav.vue · TheFooter.vue · ScrollProgress.vue
    ├── HeroSection.vue · MarqueeBand.vue · TrustStrip.vue
    ├── HostSection.vue · SectionHeading.vue
    ├── LogementsSection.vue · LogementCard.vue
    ├── BreakfastSection.vue · ServicesSection.vue
    ├── GuideSection.vue · ReviewsSection.vue · FaqSection.vue
    ├── ContactSection.vue
    ├── ChoixLogement.vue          sélecteur des deux logements
    ├── GalleryLightbox.vue · StickyBookingBar.vue
    └── IconBase.vue
```

## Déploiement (Dokploy)

Le dépôt contient tout ce qu'il faut pour un build Docker :

| Fichier | Rôle |
|---|---|
| `Dockerfile` | Build en deux étapes : Node compile, nginx sert. L'image finale ne contient ni Node ni `node_modules`. |
| `.dockerignore` | Évite d'envoyer `node_modules`, `dist` et `.git` au démon Docker. |
| `nginx.conf` | Compression, cache, en-têtes de sécurité, CSP. |

Côté Dokploy, le type de build doit être **Dockerfile** (c'est le réglage
actuel — l'échec « open Dockerfile: no such file or directory » venait
simplement de l'absence du fichier dans le dépôt).

### Choix notables de la conf nginx

- **Pas de fallback SPA.** Le site est une page unique à ancres, sans routeur :
  une URL inconnue renvoie un vrai **404**. L'ancienne version répondait 200 sur
  `/wp-login.php`, `/config.json` ou `/env` — autant de fausses pages pour les
  moteurs de recherche. Si vous ajoutez un jour Vue Router en mode history,
  une ligne commentée dans `nginx.conf` explique quoi remplacer.
- **`/assets/` mis en cache un an** (Vite met une empreinte dans les noms de
  fichiers), **`index.html` jamais mis en cache** — sinon un visiteur qui
  revient continuerait de charger les anciennes ressources après un déploiement.
- **CSP** calée sur ce que le site charge vraiment : polices auto-hébergées (@fontsource, plus de Google Fonts) et les photos
  `cf.bstatic.com`. Ajoutez-y tout service externe que vous brancheriez
  (analytics, carte…), sinon le navigateur le bloquera silencieusement.
- Les fichiers cachés (`.env`, `.git/config`…) renvoient **404** et non 403 :
  vos logs en montrent des dizaines de tentatives par jour, inutile de
  confirmer aux scanners que le chemin existe.

### ⚠️ Changer de domaine

Le site tourne aujourd'hui sur `escale.birostweb.fr` (valeur de repli). Pour
changer de domaine : définir la variable de build **`VITE_SITE_URL`** (Dokploy >
Build Args, voir `.env.example`). Elle alimente `canonical`, `og:url`,
`robots.txt` et `sitemap.xml`, générés au build. Mettre aussi à jour
`site.domaine` dans `src/data/site.js`.

**Exécution** : image nginx non-root, port **8080** (adapter le port du
domaine dans Dokploy). Durcissement runtime recommandé : read-only +
`tmpfs /tmp`, `cap_drop: ALL`, `no-new-privileges` (testé par
`tests/docker-smoke.sh`).

## Performance & accessibilité

- Contrastes vérifiés sur les couleurs de texte (≥ 4,5:1).
- Les animations d'apparition ne masquent le contenu **que si JavaScript tourne**
  (classe `js-motion` posée sur `<html>`) : sans JS, tout reste lisible.
- `prefers-reduced-motion` respecté.
- Modales fermables au clavier (Échap), **focus déplacé dans la boîte à
  l'ouverture, piégé tant qu'elle est ouverte, et rendu au bouton déclencheur
  à la fermeture** (`src/composables/useDialogue.js`).
- Galerie **balayable au doigt** sur mobile — le geste n'est pris que s'il est
  franchement horizontal, pour ne pas voler le défilement vertical.
- Images en `loading="lazy"` sauf la photo du héros (`fetchpriority="high"`),
  et conteneurs à `aspect-ratio` fixe pour éviter les sauts de mise en page.
