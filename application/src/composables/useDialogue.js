import { onMounted, onBeforeUnmount, nextTick } from 'vue'

const SELECTEUR_FOCUSABLE = [
  'a[href]', 'button:not([disabled])', 'input:not([disabled])',
  'select:not([disabled])', 'textarea:not([disabled])', '[tabindex]:not([tabindex="-1"])',
].join(',')

/**
 * Rend une couche modale utilisable au clavier :
 *  - déplace le focus dans la boîte à l'ouverture ;
 *  - empêche Tab d'en sortir (sinon on tabule dans la page derrière,
 *    sans voir où l'on est) ;
 *  - rend le focus à l'élément déclencheur à la fermeture.
 *
 * @param boite  ref vers l'élément conteneur de la modale
 * @param fermer callback appelé sur Échap
 */
export function useDialogue(boite, fermer) {
  let precedent = null

  function focusables() {
    if (!boite.value) return []
    return Array.from(boite.value.querySelectorAll(SELECTEUR_FOCUSABLE))
      .filter((el) => el.offsetParent !== null || el === document.activeElement)
  }

  function clavier(e) {
    if (e.key === 'Escape') {
      e.stopPropagation()
      fermer()
      return
    }
    if (e.key !== 'Tab') return

    const liste = focusables()
    if (!liste.length) return

    const premier = liste[0]
    const dernier = liste[liste.length - 1]
    const actif = document.activeElement

    if (e.shiftKey && (actif === premier || !boite.value.contains(actif))) {
      e.preventDefault()
      dernier.focus()
    } else if (!e.shiftKey && actif === dernier) {
      e.preventDefault()
      premier.focus()
    }
  }

  onMounted(() => {
    precedent = document.activeElement
    // `nextTick` et non `requestAnimationFrame` : on attend la mise à jour
    // du DOM, pas un rendu. rAF est gelé dans un document non affiché, et
    // le focus ne partirait jamais.
    nextTick(() => {
      const liste = focusables()
      ;(liste[0] || boite.value)?.focus?.()
    })
    document.addEventListener('keydown', clavier)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', clavier)
    precedent?.focus?.()
  })
}

/**
 * Balayage horizontal au doigt. La majorité du trafic d'un site de séjour
 * vient du mobile : une galerie qui ne se balaie pas y est une impasse.
 */
export function useBalayage(surface, { versGauche, versDroite, seuil = 45 } = {}) {
  let x0 = null
  let y0 = null

  const debut = (e) => {
    const t = e.changedTouches[0]
    x0 = t.clientX
    y0 = t.clientY
  }

  const fin = (e) => {
    if (x0 === null) return
    const t = e.changedTouches[0]
    const dx = t.clientX - x0
    const dy = t.clientY - y0
    // Geste horizontal seulement : sinon on volerait le défilement vertical.
    if (Math.abs(dx) > seuil && Math.abs(dx) > Math.abs(dy) * 1.5) {
      dx < 0 ? versDroite?.() : versGauche?.()
    }
    x0 = null
    y0 = null
  }

  onMounted(() => {
    const el = surface.value
    if (!el) return
    el.addEventListener('touchstart', debut, { passive: true })
    el.addEventListener('touchend', fin, { passive: true })
  })

  onBeforeUnmount(() => {
    const el = surface.value
    if (!el) return
    el.removeEventListener('touchstart', debut)
    el.removeEventListener('touchend', fin)
  })
}
