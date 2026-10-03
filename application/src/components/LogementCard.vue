<script setup>
import { computed } from 'vue'
import IconBase from './IconBase.vue'
import { note10 } from '../utils/format.js'
import { srcsetPhoto } from '../utils/photos.js'

const props = defineProps({ logement: Object, index: Number })
defineEmits(['ouvrir-galerie'])

const flip = computed(() => props.index % 2 === 1)
const toutes = computed(() => [props.logement.photo, ...(props.logement.galerie || [])])

const acc = computed(() =>
  props.logement.accent === 'jaune'
    ? { texte: 'text-jaune-encre', trait: 'bg-jaune', bouton: 'bg-jaune-encre hover:bg-[#6F4A05]' }
    : { texte: 'text-orange-encre', trait: 'bg-orange', bouton: 'bg-orange-fonce hover:bg-orange-encre' }
)

const specs = computed(() => [
  { l: 'Voyageurs', v: `Jusqu’à ${props.logement.voyageurs}` },
  { l: 'Surface', v: `${props.logement.surface} m²` },
  { l: 'Couchage', v: props.logement.lits },
  { l: 'Chambres', v: `${props.logement.chambres} chambre` },
])
</script>

<template>
  <article :id="logement.id" class="relative scroll-mt-24 py-12 lg:py-16">
    <!-- Numéro filigrane : ancre visuelle, purement décorative -->
    <span
      class="display chiffres pointer-events-none absolute -top-4 select-none text-[clamp(7rem,15vw,15rem)] leading-none text-argile/40"
      :class="flip ? 'right-2' : 'left-2'"
      aria-hidden="true"
    >0{{ index + 1 }}</span>

    <div
      class="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20"
      data-stagger="90"
    >
      <!-- ============ MÉDIA ============ -->
      <div :class="flip && 'lg:order-2'">
        <div class="relative">
          <!-- Photo principale, révélée par un volet qui remonte -->
          <button
            class="group relative block w-full overflow-hidden bg-sable shadow-douce"
            :aria-label="`Ouvrir la galerie de ${logement.nom}`"
            data-anim="clip"
            @click="$emit('ouvrir-galerie', { photos: toutes, depart: 0, nom: logement.nom })"
          >
            <img
              :src="logement.photo"
              :srcset="srcsetPhoto(logement.photo)"
              sizes="(min-width: 1024px) 52vw, 100vw"
              :alt="`${logement.nom} — vue principale`"
              loading="lazy"
              decoding="async"
              class="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.05]"
              style="transition-timing-function: cubic-bezier(.22,1,.36,1)"
            />
            <span
              class="absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/15"
              aria-hidden="true"
            />
            <span
              class="absolute bottom-4 right-4 flex items-center gap-2 bg-papier/90 px-3.5 py-2 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-encre backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-1"
            >
              {{ toutes.length }} photos
              <IconBase name="fleche" class="h-3.5 w-3.5" />
            </span>
          </button>

          <!-- Vignette en débord : casse le rectangle, donne de la profondeur -->
          <button
            v-if="logement.galerie?.length"
            class="group absolute -bottom-10 w-[38%] overflow-hidden border-[6px] border-papier bg-sable shadow-relief"
            :class="flip ? '-right-4 lg:-right-10' : '-left-4 lg:-left-10'"
            data-anim="up"
            :aria-label="`Deuxième photo de ${logement.nom}`"
            @click="$emit('ouvrir-galerie', { photos: toutes, depart: 1, nom: logement.nom })"
          >
            <img
              :src="logement.galerie[0]"
              :srcset="srcsetPhoto(logement.galerie[0])"
              sizes="(min-width: 1024px) 20vw, 38vw"
              :alt="`${logement.nom} — seconde vue`"
              loading="lazy"
              decoding="async"
              class="aspect-square w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
            />
          </button>

          <!-- Note Booking, posée à cheval sur la photo -->
          <div
            class="absolute -top-5 flex items-center gap-2.5 bg-papier px-4 py-3 shadow-douce"
            :class="flip ? 'left-6' : 'right-6'"
            data-anim="down"
          >
            <span class="chiffres flex h-8 items-center bg-[#003B95] px-2 text-[0.85rem] font-bold text-white">
              {{ note10(logement.note) }}
            </span>
            <span class="text-[0.82rem] font-bold">{{ logement.mention }}</span>
          </div>
        </div>

        <!-- Notes détaillées : filets fins plutôt que barres épaisses -->
        <div class="mt-6 border-t border-ligne pt-5" data-anim="up">
          <p class="surtitre mb-4 text-encre3">
            Notes des voyageurs — {{ logement.nbAvis }} avis
          </p>
          <div class="grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2">
            <div v-for="d in logement.detailNotes.slice(0, 4)" :key="d.label" class="flex items-center gap-3">
              <span class="w-[8.5rem] flex-none truncate text-[0.82rem] text-encre2">{{ d.label }}</span>
              <span class="relative h-px flex-1 bg-ligne-2">
                <span
                  class="absolute inset-y-0 left-0 -top-px h-[3px]"
                  :class="acc.trait"
                  :style="{ width: `${d.v * 10}%` }"
                />
              </span>
              <span class="chiffres w-7 flex-none text-right text-[0.8rem] font-bold">{{ note10(d.v) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ============ TEXTE ============ -->
      <div :class="flip ? 'lg:order-1' : ''" class="mt-12 lg:mt-0">
        <div class="flex items-center gap-3" data-anim="up">
          <span class="h-px w-9" :class="acc.trait" />
          <span class="surtitre" :class="acc.texte">{{ logement.ville }}</span>
        </div>

        <h3 class="display mt-4 text-[clamp(1.95rem,4vw,3.2rem)]" data-anim="up">
          {{ logement.nom }}
        </h3>
        <p class="aparte mt-2 text-[1.1rem] text-encre2" data-anim="up">
          {{ logement.sousNom }}
        </p>

        <p class="mt-6 max-w-[52ch] leading-relaxed text-encre2" data-anim="up">
          {{ logement.desc }}
        </p>

        <!-- Fiche technique en filets, pas en pastilles -->
        <dl class="mt-6 grid grid-cols-2 gap-x-8" data-anim="up">
          <div
            v-for="s in specs"
            :key="s.l"
            class="flex items-baseline justify-between gap-3 border-t border-ligne py-3"
          >
            <dt class="surtitre text-encre3">{{ s.l }}</dt>
            <dd class="text-right text-[0.9rem] font-semibold">{{ s.v }}</dd>
          </div>
        </dl>

        <!-- Adresse -->
        <p class="mt-5 flex items-start gap-2.5 text-[0.9rem] text-encre2" data-anim="up">
          <IconBase name="pin" class="mt-0.5 h-4 w-4 flex-none" :class="acc.texte" />
          <span>
            {{ logement.lieu }}
            <span class="mt-0.5 block text-encre3">{{ logement.repere }}</span>
          </span>
        </p>

        <!-- Équipements, en liste sobre -->
        <ul class="mt-6 grid grid-cols-2 gap-x-8 gap-y-2" data-anim="up">
          <li
            v-for="a in logement.atouts"
            :key="a"
            class="flex items-center gap-2 text-[0.88rem] text-encre2"
          >
            <IconBase name="check" class="h-3.5 w-3.5 flex-none" :class="acc.texte" />
            {{ a }}
          </li>
        </ul>

        <!-- Prix + actions -->
        <div class="mt-7 flex flex-wrap items-end justify-between gap-6 border-t border-ligne pt-7" data-anim="up">
          <div>
            <p class="surtitre text-encre3">à partir de</p>
            <p class="display chiffres mt-1 text-[2.5rem] leading-none">
              {{ logement.prix }} €
              <span class="font-texte text-[0.85rem] font-medium tracking-normal text-encre2">/ nuit · 2 pers.</span>
            </p>
            <p class="mt-1.5 text-[0.85rem] font-semibold" :class="acc.texte">
              Petit-déjeuner compris
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-4">
            <a
              class="group inline-flex items-center gap-2.5 px-7 py-3.5 font-semibold text-white transition-colors"
              :class="acc.bouton"
              :href="logement.lien"
              target="_blank"
              rel="noopener"
            >
              Réserver sur Booking
              <IconBase name="fleche" class="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>
