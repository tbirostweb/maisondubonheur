import { onMounted, onBeforeUnmount, ref } from 'vue'
import { inView, scroll } from 'motion'

/*
  Animations portées par Motion (https://motion.dev) — `inView` pour les
  apparitions, `scroll` pour la parallaxe et la progression de lecture.

  Pourquoi pas AOS : la dernière publication npm d'AOS date de juin 2022
  (v2.3.4) et sa dernière vraie version de 2018. Motion est publié en
  continu, s'appuie sur IntersectionObserver et l'API Web Animations, et
  ne pèse que ce qu'on en importe.
*/

const reduit = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Apparitions au défilement.
 *
 * Dans les gabarits :
 *   data-anim="up|down|left|right|zoom|clip|ligne"
 *   data-stagger      sur un parent → ses enfants animés se déclenchent
 *                     en cascade (data-stagger="90" pour un pas de 90 ms)
 *
 * Le masquage initial vient de la classe `js-motion` posée sur <html> par
 * main.js : sans JavaScript, tout le contenu reste visible.
 */
export function useMotion() {
  let arreter = null

  onMounted(() => {
    // Cascade : chaque enfant animé d'un [data-stagger] reçoit son délai.
    document.querySelectorAll('[data-stagger]').forEach((groupe) => {
      const pas = Number(groupe.dataset.stagger) || 70
      groupe.querySelectorAll('[data-anim]').forEach((el, i) => {
        el.style.setProperty('--delai', `${i * pas}ms`)
      })
    })

    const cibles = document.querySelectorAll('[data-anim]')
    if (!cibles.length) return

    if (reduit()) {
      cibles.forEach((el) => el.classList.add('est-vu'))
      return
    }

    const toutAfficher = () => cibles.forEach((el) => el.classList.add('est-vu'))

    // Le CSS masque le contenu dès que `js-motion` est posée : si Motion
    // venait à échouer (IntersectionObserver absent, erreur de la
    // librairie), la page resterait vide. On préfère afficher sans animer.
    if (!('IntersectionObserver' in window)) {
      toutAfficher()
      return
    }

    try {
      // `margin` négatif en bas : l'élément se révèle une fois franchement
      // entré dans le cadre, pas dès que son premier pixel affleure.
      arreter = inView(
        cibles,
        (element) => {
          element.classList.add('est-vu')
          // Rien n'est retourné : Motion cesse alors d'observer l'élément,
          // l'apparition ne se rejoue pas au défilement inverse.
        },
        { margin: '0px 0px -70px 0px' }
      )
    } catch (e) {
      console.warn('Apparitions désactivées :', e)
      toutAfficher()
    }
  })

  onBeforeUnmount(() => arreter?.())
}

/** Parallaxe verticale douce (image de fond du héros). */
export function useParallax(cible, facteur = 0.22) {
  let arreter = null

  onMounted(() => {
    if (reduit()) return

    arreter = scroll(() => {
      const el = cible.value
      if (!el) return
      const y = window.scrollY
      // Inutile de continuer à calculer une fois le héros dépassé.
      if (y > window.innerHeight * 1.4) return
      el.style.transform = `translate3d(0, ${y * facteur}px, 0) scale(${1 + y * 0.00012})`
    })
  })

  onBeforeUnmount(() => arreter?.())
}

/** Progression de lecture de la page, de 0 à 1. */
export function useScrollProgress() {
  const progression = ref(0)
  let arreter = null

  onMounted(() => {
    arreter = scroll((avancement) => {
      progression.value = avancement
    })
  })

  onBeforeUnmount(() => arreter?.())

  return progression
}

/** Vrai dès que la page dépasse le seuil (barre de navigation). */
export function useScrolled(seuil = 12) {
  const scrolled = ref(false)
  const onScroll = () => (scrolled.value = window.scrollY > seuil)

  onMounted(() => {
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
  })
  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

  return scrolled
}
