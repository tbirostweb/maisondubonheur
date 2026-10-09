# =========================================================================
# L'Escale — build multi-stage
#   1) build des assets statiques avec Node
#   2) service via nginx non-root (image unprivileged, port 8080)
# =========================================================================

# ---------- Stage 1 : build ----------------------------------------------
FROM node:22-alpine AS build

WORKDIR /app

# Install déterministe des dépendances (cache Docker optimisé).
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# Build de production.
COPY . .
RUN npm run build

# ---------- Stage 2 : runtime --------------------------------------------
# Image nginx "unprivileged" : tourne en utilisateur non-root, écoute sur 8080.
FROM nginxinc/nginx-unprivileged:1.27-alpine AS runtime

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
