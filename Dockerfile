# ============================================================
#  Maison du Bonheur — Dockerfile racine (Dokploy, Build Path = /)
#  Construit UNIQUEMENT le site `application/` (Maison du Bonheur).
#  Même recette que application/Dockerfile, chemins relatifs à la racine.
# ============================================================

# ---------- Étape 1 : compilation ----------
FROM node:22-alpine@sha256:0a7108bf6c7bf5de370ffb1a3ed6be93d405b43ff159f681a8d18c0e2bc2e402 AS build

WORKDIR /app

COPY application/package.json application/package-lock.json ./
RUN npm ci

# URL publique du site (canonical, robots.txt, sitemap.xml) : valeur PUBLIQUE,
# jamais un secret. À définir dans Dokploy (Build Args) — voir application/.env.example.
ARG VITE_SITE_URL
ENV VITE_SITE_URL=$VITE_SITE_URL

COPY application/ ./
RUN npm run build

# ---------- Étape 2 : service (nginx non-root, port 8080) ----------
FROM nginxinc/nginx-unprivileged:1.28-alpine@sha256:7377697a821c131a924a7105fafbe7414db4e9fcc77a6f08f776f33f141ec3f8

COPY application/nginx.conf /etc/nginx/conf.d/default.conf
COPY application/security-headers.conf /etc/nginx/security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html

USER 101

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:8080/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
