<script setup>
import { ref, onMounted } from 'vue'
import IconBase from './IconBase.vue'
import { useParallax } from '../composables/useMotion.js'
import { note10 } from '../utils/format.js'
import { srcsetPhoto } from '../utils/photos.js'

const props = defineProps({ hero: Object, logements: Array, prix: Number, note: Number, mention: String })
defineEmits(['reserver'])

const imgOk = ref(true)
const media = ref(null)
useParallax(media, 0.2)

// Entrée à l'ouverture : on déclenche à la frame suivante pour que la
// transition parte bien de son état initial.
const entre = ref(false)
onMounted(() => requestAnimationFrame(() => (entre.value = true)))

const lignes = props.hero.titreLignes || [props.hero.titre]
</script>

<template>
  <section class="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-espresso text-papier">
    <!-- Photo, en parallaxe -->
    <div ref="media" class="absolute inset-x-0 -top-[8%] -z-10 h-[120%]">
      <img
        v-show="imgOk"
        :src="hero.image"
        :srcset="srcsetPhoto(hero.image)"
        sizes="100vw"
        alt=""
        fetchpriority="high"
        class="h-full w-full object-cover"
        :class="entre ? 'scale-100 blur-0' : 'scale-[1.12] blur-[6px]'"
        style="transition: transform 2.4s var(--ease-doux), filter 1.6s ease"
        @error="imgOk = false"
      />
    </div>
    <!-- Voiles : chaud en haut, profond en bas pour asseoir la typo -->
    <div
      class="absolute inset-0 -z-10"
      style="background: linear-gradient(178deg, rgba(43,29,20,.62) 0%, rgba(43,29,20,.14) 32%, rgba(43,29,20,.52) 66%, rgba(43,29,20,.93) 100%)"
      aria-hidden="true"
    />
    <div
      class="absolute inset-0 -z-10 opacity-45"
      style="background: radial-gradient(120% 75% at 12% 88%, rgba(184,72,12,.5) 0%, transparent 62%)"
      aria-hidden="true"
    />

    <!-- Rail vertical : le lieu, à la verticale, comme une tranche de livre -->
    <div class="pointer-events-none absolute left-0 top-0 hidden h-full w-[74px] items-center justify-center lg:flex">
      <span
        class="surtitre whitespace-nowrap text-papier/45 transition-opacity duration-1000"
        :class="entre ? 'opacity-100' : 'opacity-0'"
        style="writing-mode: vertical-rl; transform: rotate(180deg); letter-spacing: 0.42em"
      >
        Troyes — Sainte-Savine · Aube
      </span>
    </div>

    <div class="mx-auto w-full max-w-[1240px] px-6 pb-0 pt-24 lg:pl-[92px] xl:pt-28">
      <!-- Note Booking -->
      <div
        class="mb-6 inline-flex items-center gap-3 transition-all duration-700"
        :class="entre ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'"
        style="transition-delay: 220ms"
      >
        <span class="chiffres flex h-9 items-center bg-[#003B95] px-2.5 text-[0.95rem] font-bold text-white">
          {{ note10(note) }}
        </span>
        <span class="text-[0.95rem] font-semibold">{{ mention }}</span>
        <span class="h-4 w-px bg-papier/30" />
        <span class="surtitre text-papier/55">{{ hero.badge }}</span>
      </div>

      <!-- Titre : chaque ligne monte depuis son masque -->
      <h1 class="display max-w-[16ch] text-[clamp(2.3rem,min(6.6vw,7.6vh),5.6rem)]">
        <span
          v-for="(l, i) in lignes"
          :key="i"
          class="block overflow-hidden"
          :style="{ paddingBottom: '0.08em' }"
        >
          <span
            class="block transition-transform duration-[1100ms]"
            :class="entre ? 'translate-y-0' : 'translate-y-[105%]'"
            :style="{ transitionDelay: `${340 + i * 110}ms`, transitionTimingFunction: 'cubic-bezier(.22,1,.36,1)' }"
            v-html="i === lignes.length - 1
              ? `<em class='not-italic text-jaune-vif'>${l}</em>`
              : l"
          />
        </span>
      </h1>

      <div
        class="mt-6 grid gap-8 transition-all duration-1000 lg:grid-cols-[minmax(0,44ch)_auto] lg:items-end lg:gap-16"
        :class="entre ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'"
        style="transition-delay: 760ms"
      >
        <p class="text-[1.02rem] leading-relaxed text-papier/75">
          {{ hero.sousTitre }}
        </p>

        <div class="flex flex-wrap items-center gap-3">
          <button
            class="group relative inline-flex items-center gap-3 overflow-hidden bg-orange px-8 py-4 font-semibold text-white shadow-relief"
            @click="$emit('reserver')"
          >
            <span
              class="absolute inset-0 -z-0 translate-y-full bg-orange-fonce transition-transform duration-500 group-hover:translate-y-0"
              style="transition-timing-function: cubic-bezier(.22,1,.36,1)"
              aria-hidden="true"
            />
            <span class="relative">Réserver — dès {{ prix }} € la nuit</span>
            <IconBase name="fleche" class="relative h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
          <a href="#logements" class="lien-souligne py-2 font-semibold text-papier/80 hover:text-papier">
            Voir les deux logements
          </a>
        </div>
      </div>

      <!-- Bandeau de pied : index chiffré -->
      <div
        class="mt-7 grid grid-cols-2 border-t border-papier/15 transition-all duration-1000 md:grid-cols-4"
        :class="entre ? 'opacity-100' : 'opacity-0'"
        style="transition-delay: 900ms"
      >
        <div
          v-for="(s, i) in hero.stats"
          :key="s.label"
          class="border-papier/12 py-5 pr-6 md:border-r"
          :class="i === 0 ? 'md:pl-0' : 'md:pl-7'"
        >
          <div class="display-s chiffres text-[1.7rem] text-jaune-vif">{{ s.valeur }}</div>
          <div class="mt-0.5 text-[0.8rem] leading-snug text-papier/55">{{ s.label }}</div>
        </div>

        <!-- Invite au défilement -->
        <a
          href="#logements"
          class="group flex items-center justify-between gap-3 py-5 md:pl-7"
          aria-label="Faire défiler vers les logements"
        >
          <span class="surtitre text-papier/45">Découvrir</span>
          <span class="flex h-11 w-11 flex-none items-center justify-center border border-papier/25 transition-colors group-hover:border-jaune-vif group-hover:text-jaune-vif">
            <IconBase name="bas" class="h-4 w-4 animate-bounce" style="animation-duration: 2.4s" />
          </span>
        </a>
      </div>
    </div>
  </section>
</template>
