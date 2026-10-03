<script setup>
import { ref } from 'vue'
import IconBase from './IconBase.vue'

defineProps({ faq: Array })

// Questions affichées ; les suivantes restent dans site.js.
const NB_QUESTIONS = 5
defineEmits(['reserver'])

const ouvert = ref(0)
const bascule = (i) => (ouvert.value = ouvert.value === i ? -1 : i)
</script>

<template>
  <section id="faq" class="border-y border-ligne bg-papier-2 py-12 lg:py-16">
    <div class="mx-auto grid max-w-[1240px] grid-cols-1 gap-14 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <!-- Colonne fixe -->
      <div class="lg:sticky lg:top-28 lg:self-start">
        <div class="flex items-baseline gap-4" data-anim="up">
          <span class="display chiffres text-[2.85rem] leading-none text-argile" aria-hidden="true">07</span>
          <span class="filet flex-1" />
        </div>
        <p class="surtitre mt-4 text-orange-encre" data-anim="up">Questions fréquentes</p>
        <h2 class="display mt-3 max-w-[13ch] text-[clamp(1.85rem,3.8vw,2.95rem)]" data-anim="up">
          Tout ce que vous vous demandez, déjà répondu.
        </h2>
        <p class="mt-5 max-w-[38ch] leading-relaxed text-encre2" data-anim="up">
          Une autre question ? Mes voyageurs me notent 9,4 sur 10 pour l’accueil.
        </p>
        <button
          class="group mt-7 inline-flex items-center gap-3 border-b-2 border-encre pb-2 text-[0.95rem] font-semibold transition-colors hover:border-orange hover:text-orange-encre"
          data-anim="up"
          @click="$emit('reserver')"
        >
          Réserver un séjour
          <IconBase name="fleche" class="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </button>
      </div>

      <!-- Accordéon -->
      <div class="border-t border-ligne-2" data-stagger="55">
        <div v-for="(item, i) in faq.slice(0, NB_QUESTIONS)" :key="i" class="border-b border-ligne-2" data-anim="up">
          <button
            class="group flex w-full items-start gap-5 py-6 text-left"
            :aria-expanded="ouvert === i"
            @click="bascule(i)"
          >
            <span class="chiffres surtitre mt-2 flex-none transition-colors" :class="ouvert === i ? 'text-orange' : 'text-argile'">
              0{{ i + 1 }}
            </span>
            <span
              class="display-s flex-1 text-[1.12rem] leading-snug transition-colors"
              :class="ouvert === i ? 'text-orange-encre' : 'text-encre group-hover:text-orange-encre'"
            >{{ item.q }}</span>
            <span
              class="relative mt-1.5 h-4 w-4 flex-none transition-transform duration-500"
              :class="ouvert === i && 'rotate-90'"
              style="transition-timing-function: cubic-bezier(.22,1,.36,1)"
              aria-hidden="true"
            >
              <span class="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
              <span
                class="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current transition-opacity duration-300"
                :class="ouvert === i && 'opacity-0'"
              />
            </span>
          </button>

          <div
            class="grid transition-all duration-[550ms]"
            :class="ouvert === i ? 'grid-rows-[1fr] pb-7 opacity-100' : 'grid-rows-[0fr] opacity-0'"
            style="transition-timing-function: cubic-bezier(.22,1,.36,1)"
          >
            <p class="overflow-hidden pl-[3.1rem] pr-8 leading-relaxed text-encre2">{{ item.r }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
