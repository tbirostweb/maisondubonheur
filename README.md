# Maison du Bonheur

Deux déclinaisons de sites vitrines pour des hébergements de caractère.

- `application/` : site Vue 3, Vite et Tailwind CSS pour les appartements Maison du Bonheur.
- `vitrine/` : vitrine Vue 3 destinée à un déploiement via Docker.

Chaque dossier contient son propre README avec les étapes de lancement. Les dépendances et sorties de compilation sont exclues du dépôt.

Projet présenté par [BirostWeb](https://birostweb.fr).

## Déploiement Dokploy

Le `Dockerfile` à la racine construit **uniquement Maison du Bonheur**
(`application/`) : Dokploy peut garder le Build Path par défaut (`/`).
Port du conteneur : **8080**. Build Arg recommandé : `VITE_SITE_URL`
(URL publique du site, voir `application/.env.example`).

La vitrine `vitrine/` (L'Escale, démo) n'est pas déployée par ce Dockerfile.
