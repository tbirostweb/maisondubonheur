<script setup>
import { ref } from 'vue'
import IconBase from './IconBase.vue'
import { note10 } from '../utils/format.js'
import { photoTaille } from '../utils/photos.js'
import { useDialogue } from '../composables/useDialogue.js'

defineProps({ logements: { type: Array, default: () => [] } })
const emit = defineEmits(['fermer'])

// Échap, piège à focus, retour du focus au bouton déclencheur
const boite = ref(null)
useDialogue(boite, () => emit('fermer'))
</script>

<template>
  <div
    class="fixed inset-0 z-[100] flex items-end justify-center bg-espresso/70 backdrop-blur-sm sm:items-center sm:p-4"
    role="dialog"
    aria-modal="true"
    aria-labelledby="titre-choix"
    @click.self="emit('fermer')"
  >
    <div
      ref="boite"
      tabindex="-1"
      class="w-full max-w-[620px] bg-papier shadow-relief"
    >
      <!-- En-tête -->
      <div class="flex items-start justify-between gap-6 border-b border-ligne px-7 pb-6 pt-7">
        <div>
          <p class="surtitre text-orange-encre">Réserver</p>
          <h2 id="titre-choix" class="display mt-2 text-[1.9rem] leading-tight">
            Quelle adresse vous tente ?
          </h2>
        </div>
        <button
          class="-mr-2 -mt-1 p-2 text-encre2 transition-colors hover:text-encre"
          aria-label="Fermer"
          @click="emit('fermer')"
        >
          <IconBase name="fermer" class="h-5 w-5" />
        </button>
      </div>

      <!-- Les deux logements : un clic = Booking -->
      <ul>
        <li v-for="l in logements" :key="l.id" class="border-b border-ligne">
          <a
            :href="l.lien"
            target="_blank"
            rel="noopener"
            class="group flex items-center gap-5 px-7 py-5 transition-colors hover:bg-papier-2"
            @click="emit('fermer')"
          >
            <img
              :src="photoTaille(l.photo, 300)"
              :alt="l.nom"
              class="h-[76px] w-[76px] flex-none object-cover"
              loading="lazy"
            />

            <span class="min-w-0 flex-1">
              <span class="surtitre block text-encre3">{{ l.ville }}</span>
              <span class="display-s mt-1 block text-[1.24rem] leading-tight transition-transform duration-500 group-hover:translate-x-1">
                {{ l.nom }}
              </span>
              <span class="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.82rem] text-encre2">
                <span class="chiffres bg-[#003B95] px-1.5 py-px text-[0.7rem] font-bold text-white">
                  {{ note10(l.note) }}
                </span>
                <span>{{ l.nbAvis }} avis</span>
                <span aria-hidden="true">·</span>
                <span>{{ l.surface }} m²</span>
                <span aria-hidden="true">·</span>
                <span class="font-semibold text-encre">dès {{ l.prix }} €</span>
              </span>
            </span>

            <IconBase
              name="fleche"
              class="h-5 w-5 flex-none text-encre3 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-orange"
            />
          </a>
        </li>
      </ul>

      <!-- Pied : on dit clairement où l'on va -->
      <div class="px-7 py-5">
        <p class="flex flex-wrap items-center gap-x-4 gap-y-1 text-[0.82rem] font-semibold text-encre2">
          <span class="inline-flex items-center gap-1.5">
            <IconBase name="cafe" class="h-3.5 w-3.5 text-orange" /> Petit-déjeuner compris
          </span>
          <span class="inline-flex items-center gap-1.5">
            <IconBase name="parking" class="h-3.5 w-3.5 text-orange" /> Parking gratuit
          </span>
        </p>
        <p class="mt-2 text-[0.78rem] leading-snug text-encre3">
          Disponibilités, tarif définitif et paiement sont gérés sur Booking.com.
          Le lien s’ouvre dans un nouvel onglet.
        </p>
      </div>
    </div>
  </div>
</template>
