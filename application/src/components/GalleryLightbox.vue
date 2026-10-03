<script setup>
import { ref, watch } from 'vue'
import IconBase from './IconBase.vue'
import { srcsetPhoto, photoTaille } from '../utils/photos.js'
import { useDialogue, useBalayage } from '../composables/useDialogue.js'

const props = defineProps({
  photos: { type: Array, default: () => [] },
  depart: { type: Number, default: 0 },
  nom: { type: String, default: '' },
})
const emit = defineEmits(['fermer'])

const index = ref(props.depart)

watch(() => props.depart, (v) => (index.value = v))

function suivant() {
  index.value = (index.value + 1) % props.photos.length
}
function precedent() {
  index.value = (index.value - 1 + props.photos.length) % props.photos.length
}
const boite = ref(null)
const scene = ref(null)

// Échap, piège à focus et retour du focus au déclencheur
useDialogue(boite, () => emit('fermer'))
// Balayage au doigt sur la photo
useBalayage(scene, { versGauche: precedent, versDroite: suivant })

function fleches(e) {
  if (e.key === 'ArrowRight') suivant()
  if (e.key === 'ArrowLeft') precedent()
}
</script>

<template>
  <div
    ref="boite"
    class="fixed inset-0 z-[100] flex flex-col bg-black/90 backdrop-blur-sm"
    role="dialog"
    aria-modal="true"
    tabindex="-1"
    :aria-label="`Galerie ${nom}`"
    @keydown="fleches"
    @click.self="emit('fermer')"
  >
    <!-- Barre supérieure -->
    <div class="flex items-center justify-between px-5 py-4 text-white">
      <span class="display-s text-[1.24rem]">{{ nom }}</span>
      <span class="text-sm text-white/70">{{ index + 1 }} / {{ photos.length }}</span>
      <button class="p-2 transition hover:bg-white/15" aria-label="Fermer" @click="emit('fermer')">
        <IconBase name="fermer" class="h-6 w-6" />
      </button>
    </div>

    <!-- Image -->
    <div ref="scene" class="relative flex flex-1 items-center justify-center px-4 pb-4 touch-pan-y" @click.self="emit('fermer')">
      <button
        v-if="photos.length > 1"
        class="absolute left-4 bg-white/10 p-3 text-white transition hover:bg-white/25"
        aria-label="Photo précédente"
        @click="precedent"
      >
        <IconBase name="gauche" class="h-6 w-6" />
      </button>

      <img
        :src="photos[index]"
        :srcset="srcsetPhoto(photos[index])"
        sizes="92vw"
        :alt="`${nom} — photo ${index + 1}`"
        class="max-h-full max-w-[min(1100px,92vw)] object-contain shadow-2xl"
      />

      <button
        v-if="photos.length > 1"
        class="absolute right-4 bg-white/10 p-3 text-white transition hover:bg-white/25"
        aria-label="Photo suivante"
        @click="suivant"
      >
        <IconBase name="droite" class="h-6 w-6" />
      </button>
    </div>

    <!-- Vignettes -->
    <div class="flex justify-center gap-2 overflow-x-auto px-4 pb-5">
      <button
        v-for="(p, i) in photos"
        :key="i"
        class="h-14 w-20 flex-none overflow-hidden border-2 transition"
        :class="i === index ? 'border-white' : 'border-transparent opacity-50 hover:opacity-100'"
        @click="index = i"
      >
        <img :src="photoTaille(p, 300)" alt="" class="h-full w-full object-cover" loading="lazy" />
      </button>
    </div>
  </div>
</template>
