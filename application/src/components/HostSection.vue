<script setup>
import { ref } from 'vue'
import { srcsetPhoto } from '../utils/photos.js'
import OrnementSoleil from './OrnementSoleil.vue'
import IconBase from './IconBase.vue'

const props = defineProps({ hote: Object })
const imgOk = ref(Boolean(props.hote.image))
</script>

<template>
  <section id="hote" class="relative overflow-hidden py-12 lg:py-16">
    <!-- Halo chaud très diffus, pour que le papier ne soit pas plat -->
    <div
      class="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full opacity-40 blur-3xl"
      style="background: radial-gradient(circle, rgba(233,163,43,.35) 0%, transparent 68%)"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-[1240px] px-6">
      <div class="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20" data-stagger="90">
        <!-- Colonne portrait -->
        <div class="lg:pt-20">
          <div class="relative mx-auto w-[240px] lg:mx-0 lg:w-[300px]">
            <!-- Soleil tracé à la main, en débord derrière l'arche -->
            <OrnementSoleil
              class="pointer-events-none absolute -left-12 -top-10 h-24 w-24 text-jaune/70"
              data-anim="zoom"
            />
            <img
              v-if="imgOk"
              :src="hote.image"
              :srcset="srcsetPhoto(hote.image)"
              sizes="300px"
              :alt="`Portrait de ${hote.prenom}`"
              loading="lazy"
              decoding="async"
              class="arche aspect-[4/5] w-full object-cover shadow-relief"
              data-anim="clip"
              @error="imgOk = false"
            />
            <!-- Sans photo : un monogramme dessiné, pas un placeholder gris -->
            <div
              v-else
              class="arche relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden bg-cacao shadow-relief"
              data-anim="clip"
            >
              <div
                class="absolute inset-0 opacity-70"
                style="background: radial-gradient(120% 90% at 30% 20%, rgba(229,101,26,.85) 0%, transparent 62%)"
                aria-hidden="true"
              />
              <span class="display relative text-[7rem] leading-none text-papier">{{ hote.prenom.charAt(0) }}</span>
              <span class="surtitre absolute bottom-5 text-papier/50">{{ hote.prenom }}</span>
            </div>

            <!-- Étiquette en débord -->
            <div
              class="absolute -right-4 bottom-8 bg-papier px-4 py-3 shadow-douce lg:-right-10"
              data-anim="left"
            >
              <div class="display-s chiffres text-[1.5rem] leading-none text-orange">9,4</div>
              <div class="surtitre mt-1 text-encre3">Accueil</div>
            </div>
          </div>
        </div>

        <!-- Colonne texte -->
        <div>
          <div class="flex items-baseline gap-4" data-anim="up">
            <span class="display chiffres text-[2.85rem] leading-none text-argile" aria-hidden="true">01</span>
            <span class="filet flex-1" />
          </div>
          <p class="surtitre mt-4 text-orange-encre" data-anim="up">Votre hôtesse</p>

          <h2 class="display mt-3 max-w-[15ch] text-[clamp(1.9rem,4vw,3.2rem)]" data-anim="up">
            {{ hote.titre }}
          </h2>

          <p
            v-for="(p, i) in hote.texte"
            :key="i"
            class="mt-5 max-w-[58ch] leading-relaxed"
            :class="i === 0 ? 'text-[1.08rem] text-encre' : 'text-encre2'"
            data-anim="up"
          >{{ p }}</p>

          <!-- Citation en exergue -->

          <p class="display mt-9 text-[1.85rem] text-orange" data-anim="up">{{ hote.prenom }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
