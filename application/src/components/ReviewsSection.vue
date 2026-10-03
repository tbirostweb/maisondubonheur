<script setup>
import { computed } from 'vue'
import IconBase from './IconBase.vue'

const props = defineProps({ avis: Array, logements: Array })

const totalAvis = computed(() => props.logements.reduce((s, l) => s + l.nbAvis, 0))
// Moyenne pondérée par le nombre d'avis de chaque logement
const moyenne = computed(() => {
  const t = totalAvis.value
  if (!t) return '0'
  const m = props.logements.reduce((s, l) => s + l.note * l.nbAvis, 0) / t
  return m.toFixed(1).replace('.', ',')
})
</script>

<template>
  <section id="avis" class="relative overflow-hidden py-12 lg:py-16">
    <div class="mx-auto max-w-[1240px] px-6">
      <!-- En-tête : titre à gauche, note à droite -->
      <div class="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <div class="max-w-[560px] flex-1">
          <div class="flex items-baseline gap-4" data-anim="up">
            <span class="display chiffres text-[2.85rem] leading-none text-argile" aria-hidden="true">06</span>
            <span class="filet flex-1" />
          </div>
          <p class="surtitre mt-3 text-orange-encre" data-anim="up">Ils y ont dormi</p>
          <h2 class="display mt-2 max-w-[17ch] text-[clamp(1.85rem,3.8vw,2.95rem)]" data-anim="up">
            Des séjours qui donnent envie de revenir.
          </h2>
        </div>

        <div class="flex items-center gap-5" data-anim="left">
          <span class="display chiffres text-[clamp(3.1rem,6.2vw,4.85rem)] leading-none text-orange">
            {{ moyenne }}
          </span>
          <div class="border-l border-ligne-2 pl-5">
            <div class="chiffres flex h-7 w-fit items-center bg-[#003B95] px-2 text-[0.78rem] font-bold text-white">
              Booking.com
            </div>
            <p class="mt-2 text-[0.86rem] font-semibold">Note moyenne sur 10</p>
            <p class="text-[0.82rem] text-encre2">{{ totalAvis }} avis vérifiés</p>
          </div>
        </div>
      </div>

      <!-- Grille alignée : les avis n'ont pas la même longueur, une
           mosaïque en colonnes CSS donnait des hauteurs en escalier.
           Ici chaque case fait la hauteur de sa ligne et la signature
           est calée en bas (`mt-auto`) : tout s'aligne. -->
      <div class="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" data-stagger="80">
        <figure
          v-for="(a, i) in avis"
          :key="i"
          class="group flex h-full flex-col border-t-2 border-encre pt-5 transition-colors duration-500 hover:border-orange"
          data-anim="up"
        >
          <div class="flex items-center justify-between gap-3">
            <IconBase name="guillemet" class="h-5 w-5 text-argile transition-colors duration-500 group-hover:text-orange" />
            <span class="chiffres text-[0.78rem] tracking-[0.22em] text-jaune-encre" :aria-label="`${a.note} étoiles sur 5`">
              {{ '★'.repeat(a.note) }}
            </span>
          </div>

          <blockquote class="mt-4 text-[1rem] leading-relaxed text-encre">
            {{ a.texte }}
          </blockquote>

          <figcaption class="mt-auto flex items-baseline gap-3 pt-5">
            <span class="display-s text-[1.02rem]">{{ a.nom }}</span>
            <span class="h-px flex-1 bg-ligne" />
            <span class="text-[0.78rem] text-encre3">{{ a.meta }}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
