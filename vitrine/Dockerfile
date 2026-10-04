# =========================================================================
# L'Escale — build multi-stage
#   1) build des assets statiques avec Node
#   2) service via nginx non-root (image unprivileged, port 8080)
# =========================================================================

# ---------- Stage 1 : build ----------------------------------------------
# Images épinglées par digest. Mise à jour : docker buildx imagetools inspect <image:tag>
FROM node:22-alpine@sha256:0a7108bf6c7bf5de370ffb1a3ed6be93d405b43ff159f681a8d18c0e2bc2e402 AS build

WORKDIR /app

# Install déterministe des dépendances (cache Docker optimisé).
COPY package.json package-lock.json ./
RUN npm ci

# Build de production.
COPY . .
RUN npm run build

# ---------- Stage 2 : runtime --------------------------------------------
# Image nginx "unprivileged" : tourne en utilisateur non-root, écoute sur 8080.
FROM nginxinc/nginx-unprivileged:1.28-alpine@sha256:7377697a821c131a924a7105fafbe7414db4e9fcc77a6f08f776f33f141ec3f8 AS runtime

# Métadonnées.
LABEL org.opencontainers.image.title="L'Escale" \
      org.opencontainers.image.description="Site vitrine de locations (Vue 3 + Vite)"

# Config durcie.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Assets statiques uniquement (pas de sources, pas de node_modules).
COPY --from=build /app/dist /usr/share/nginx/html

# Utilisateur non-root fourni par l'image (uid 101).
USER 101

EXPOSE 8080

# Vérification de santé au niveau conteneur (wget fourni par busybox/alpine).
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1

STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]
