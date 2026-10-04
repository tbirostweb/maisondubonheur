<script setup>
import IconBase from './IconBase.vue'
import { srcsetPhoto } from '../utils/photos.js'
import OrnementSoleil from './OrnementSoleil.vue'

defineProps({ pd: Object })
</script>

<template>
  <section id="petit-dejeuner" class="relative overflow-hidden bg-papier py-12 lg:py-16">
    <div class="relative mx-auto max-w-[1240px] px-6">
      <div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24" data-stagger="90">
        <!-- ---------- Texte ---------- -->
        <div>
          <OrnementSoleil
            class="pointer-events-none absolute -right-6 top-2 hidden h-32 w-32 text-jaune/45 lg:block"
            :rayons="20"
            aria-hidden="true"
          />
          <div class="flex items-baseline gap-4" data-anim="up">
            <span class="display chiffres text-[2.85rem] leading-none text-argile" aria-hidden="true">03</span>
            <span class="filet flex-1" />
          </div>
          <p class="surtitre mt-4 text-orange-encre" data-anim="up">Compris dans le prix</p>

          <h2 class="display mt-3 max-w-[14ch] text-[clamp(1.9rem,3.95vw,3.1rem)]" data-anim="up">
            {{ pd.titre }}
          </h2>

          <p class="mt-5 max-w-[52ch] leading-relaxed text-encre2" data-anim="up">{{ pd.texte }}</p>

          <!-- Liste en filets, numérotée -->
          <ul class="mt-9" data-anim="up">
            <li
              v-for="(p, i) in pd.points"
              :key="p"
              class="flex items-baseline gap-5 border-t border-ligne py-3.5 last:border-b"
            >
              <span class="chiffres surtitre text-argile">0{{ i + 1 }}</span>
              <span class="font-medium">{{ p }}</span>
            </li>
          </ul>
        </div>

        <!-- ---------- Collage ---------- -->
        <div class="relative mx-auto w-full max-w-[520px] pb-16 lg:pb-24">
          <!-- Pastille tournante « inclus » -->
          <div
            class="absolute -left-2 -top-4 z-20 flex h-[86px] w-[86px] rotate-[-12deg] items-center justify-center bg-orange text-center shadow-relief lg:-left-8"
            data-anim="zoom"
          >
            <span class="text-[0.66rem] font-bold uppercase leading-tight tracking-[0.1em] text-white">
              Petit<br />déj.<br />inclus
            </span>
          </div>

          <img
            :src="pd.photos[0]"
            :srcset="srcsetPhoto(pd.photos[0])"
            sizes="(min-width: 1024px) 34vw, 78vw"
            alt="Le plateau du petit-déjeuner"
            loading="lazy"
            decoding="async"
            class="arche relative z-10 aspect-[4/5] w-[78%] object-cover shadow-relief"
            data-anim="clip"
          />

          <img
            v-if="pd.photos[1]"
            :src="pd.photos[1]"
            :srcset="srcsetPhoto(pd.photos[1])"
            sizes="(min-width: 1024px) 20vw, 46vw"
            alt="Le panier garni préparé avant l’arrivée"
            loading="lazy"
            decoding="async"
            class="absolute right-0 top-[22%] z-20 aspect-square w-[46%] rotate-[4deg] border-[7px] border-papier object-cover shadow-relief transition-transform duration-[900ms] hover:rotate-0"
            style="transition-timing-function: cubic-bezier(.22,1,.36,1)"
            data-anim="left"
          />

          <img
            v-if="pd.photos[2]"
            :src="pd.photos[2]"
            :srcset="srcsetPhoto(pd.photos[2])"
            sizes="(min-width: 1024px) 23vw, 52vw"
            alt="La cuisine entièrement équipée"
            loading="lazy"
            decoding="async"
            class="absolute bottom-0 left-[18%] z-20 aspect-[5/4] w-[52%] rotate-[-3deg] border-[7px] border-papier object-cover shadow-relief transition-transform duration-[900ms] hover:rotate-0"
            style="transition-timing-function: cubic-bezier(.22,1,.36,1)"
            data-anim="up"
          />
        </div>
      </div>
    </div>
  </section>
</template>
