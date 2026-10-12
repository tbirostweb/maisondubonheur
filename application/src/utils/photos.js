/* ============================================================
   Images responsives
   ============================================================
   Les photos sont hébergées sur le site, dans `public/photos/`, en deux
   largeurs : `<id>-500.jpg` et `<id>-1024.jpg`. Un téléphone télécharge
   donc 500 px au lieu de 1024 — c'est l'essentiel du poids de la page, et
   la majorité des recherches de séjour se font sur mobile.

   Elles étaient auparavant chargées depuis le CDN de Booking. Les servir
   nous-mêmes évite de transmettre l'adresse IP de chaque visiteur à un
   tiers, et permet de garder une CSP stricte (`img-src 'self'`).

   Si une URL ne suit pas cette convention (une image externe que vous
   ajouteriez), les fonctions la renvoient telle quelle : l'image s'affiche
   normalement, simplement sans srcset.
   ============================================================ */

const MOTIF = /^\/photos\/(\d+)-(\d+)\.jpg$/
const LARGEURS = [500, 1024]

export function srcsetPhoto(url) {
  const m = MOTIF.exec(url || '')
  if (!m) return undefined
  const id = m[1]
  return LARGEURS.map((l) => `/photos/${id}-${l}.jpg ${l}w`).join(', ')
}

/** Même photo dans la largeur disponible la plus proche (aperçus, vignettes). */
export function photoTaille(url, largeur = 1024) {
  const m = MOTIF.exec(url || '')
  if (!m) return url
  const choix = LARGEURS.find((l) => l >= largeur) || LARGEURS[LARGEURS.length - 1]
  return `/photos/${m[1]}-${choix}.jpg`
}
