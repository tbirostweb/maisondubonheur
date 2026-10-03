<script setup>
import { ref } from 'vue'
import { useScrolled } from '../composables/useMotion.js'

defineProps({ marque: String, prix: Number })
const emit = defineEmits(['reserver'])

// Au-dessus du héros la barre est transparente ; elle se pose en papier
// dès que la page défile.
const pose = useScrolled(80)
const ouvert = ref(false)

const liens = [
  { href: '#logements', label: 'Logements' },
  { href: '#petit-dejeuner', label: 'Petit-déjeuner' },
  { href: '#region', label: 'Troyes' },
  { href: '#avis', label: 'Avis' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
]

const fermer = () => (ouvert.value = false)
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-500"
    :class="pose || ouvert
      ? 'border-b border-ligne bg-papier/92 backdrop-blur-md'
      : 'border-b border-transparent'"
    style="transition-timing-function: cubic-bezier(.22,1,.36,1)"
  >
    <div class="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-6"
         :class="pose || ouvert ? 'h-[68px]' : 'h-[84px]'">
      <!-- Marque typographique -->
      <a
        href="#accueil"
        class="group flex items-baseline gap-2.5 transition-colors"
        :class="pose || ouvert ? 'text-encre' : 'text-papier'"
        @click="fermer"
      >
        <span class="display-s text-[1.3rem] leading-none">{{ marque }}</span>
        <span
          class="hidden text-[0.62rem] font-bold uppercase tracking-[0.2em] transition-opacity sm:block"
          :class="pose || ouvert ? 'text-encre3' : 'text-papier/50'"
        >Troyes</span>
      </a>

      <!-- Menu -->
      <nav aria-label="Navigation principale" class="hidden lg:block">
        <ul class="flex items-center gap-8">
          <li v-for="l in liens" :key="l.href">
            <a
              :href="l.href"
              class="lien-souligne py-1 text-[0.88rem] font-medium transition-colors"
              :class="pose ? 'text-encre2 hover:text-encre' : 'text-papier/75 hover:text-papier'"
            >{{ l.label }}</a>
          </li>
        </ul>
      </nav>

      <div class="flex items-center gap-3">
        <button
          class="group relative hidden overflow-hidden px-6 py-2.5 text-[0.86rem] font-semibold transition-colors lg:inline-flex"
          :class="pose ? 'bg-encre text-papier' : 'bg-papier text-encre'"
          @click="emit('reserver')"
        >
          <span
            class="absolute inset-0 translate-y-full bg-orange transition-transform duration-500 group-hover:translate-y-0"
            style="transition-timing-function: cubic-bezier(.22,1,.36,1)"
            aria-hidden="true"
          />
          <span class="relative transition-colors group-hover:text-white">Réserver</span>
        </button>

        <!-- Burger -->
        <button
          class="flex h-11 w-11 flex-col items-center justify-center gap-[5px] border transition-colors lg:hidden"
          :class="pose || ouvert ? 'border-ligne-2 text-encre' : 'border-papier/30 text-papier'"
          :aria-expanded="ouvert"
          aria-label="Ouvrir le menu"
          @click="ouvert = !ouvert"
        >
          <span class="h-px w-[19px] bg-current transition-transform duration-300" :class="ouvert && 'translate-y-[6px] rotate-45'" />
          <span class="h-px w-[19px] bg-current transition-opacity duration-300" :class="ouvert && 'opacity-0'" />
          <span class="h-px w-[19px] bg-current transition-transform duration-300" :class="ouvert && '-translate-y-[6px] -rotate-45'" />
        </button>
      </div>
    </div>

    <!-- Panneau mobile -->
    <Transition
      enter-active-class="transition duration-400 ease-out"
      enter-from-class="opacity-0 -translate-y-3"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0 -translate-y-3"
    >
      <div v-if="ouvert" class="border-t border-ligne bg-papier px-6 pb-6 pt-2 lg:hidden">
        <a
          v-for="(l, i) in liens"
          :key="l.href"
          :href="l.href"
          class="flex items-baseline gap-4 border-b border-ligne py-4 last:border-b-0"
          @click="fermer"
        >
          <span class="surtitre chiffres text-argile">0{{ i + 1 }}</span>
          <span class="display-s text-[1.4rem] text-encre">{{ l.label }}</span>
        </a>
        <button
          class="mt-5 w-full bg-orange px-6 py-3.5 font-semibold text-white"
          @click="fermer(); emit('reserver')"
        >
          Réserver — dès {{ prix }} € la nuit
        </button>
      </div>
    </Transition>
  </header>
</template>
