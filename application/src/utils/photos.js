/* ============================================================
   Images responsives à partir des URL Booking
   ============================================================
   Le CDN Booking sert la même photo en plusieurs largeurs. On dérive
   donc un `srcset` de l'URL présente dans site.js, pour qu'un téléphone
   télécharge 500 px au lieu de 1024 — c'est le gros du poids de la page,
   et 70 % des recherches de séjour se font sur mobile.

   Si l'URL n'est pas une URL Booking (vous avez mis vos propres photos),
   la fonction renvoie `undefined` : l'image s'affiche normalement, sans
   srcset. Rien à changer dans site.js.
   ============================================================ */

const MOTIF = /^(https:\/\/cf\.bstatic\.com\/xdata\/images\/hotel)\/[^/]+\/(\d+)\.jpg(\?[^\s]*)?$/

// [largeur réelle, dossier Booking]
const TAILLES = [
  [300, 'max300'],
  [500, 'max500'],
  [1024, 'max1024x768'],
  [1920, 'max1920x1080'],
]

export function srcsetPhoto(url) {
  const m = MOTIF.exec(url || '')
  if (!m) return undefined
  const [, base, id, requete = ''] = m
  return TAILLES.map(([l, dossier]) => `${base}/${dossier}/${id}.jpg${requete} ${l}w`).join(', ')
}

/** Même photo dans une largeur précise (aperçus, vignettes). */
export function photoTaille(url, largeur = 1024) {
  const m = MOTIF.exec(url || '')
  if (!m) return url
  const [, base, id, requete = ''] = m
  const choix = TAILLES.find(([l]) => l >= largeur) || TAILLES[TAILLES.length - 1]
  return `${base}/${choix[1]}/${id}.jpg${requete}`
}
