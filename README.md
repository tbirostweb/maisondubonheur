# Maison du Bonheur

Site vitrine des appartements Maison du Bonheur.

- `application/` : site Vue 3, Vite et Tailwind CSS (voir son README pour le lancement). Les dépendances et sorties de compilation sont exclues du dépôt.

Projet présenté par [BirostWeb](https://birostweb.fr).

## Déploiement Dokploy

Le `Dockerfile` à la racine construit **uniquement Maison du Bonheur**
(`application/`) : Dokploy peut garder le Build Path par défaut (`/`).
Port du conteneur : **8080**. Build Arg recommandé : `VITE_SITE_URL`
(URL publique du site, voir `application/.env.example`).
