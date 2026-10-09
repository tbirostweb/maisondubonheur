# ============================================================
#  Maison du Bonheur — image de production
#  Étape 1 : on compile le site avec Node
#  Étape 2 : on ne garde que les fichiers statiques, servis par nginx
#  L'image finale ne contient ni Node, ni node_modules (~20 Mo au lieu de ~400).
# ============================================================

# ---------- Étape 1 : compilation ----------
FROM node:22-alpine AS build

WORKDIR /app

# Les dépendances d'abord : tant que package*.json ne change pas,
# Docker réutilise cette couche et le build est bien plus rapide.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- Étape 2 : service ----------
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY security-headers.conf /etc/nginx/security-headers.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Vérification de santé : Dokploy saura si le conteneur répond vraiment.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
