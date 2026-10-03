<script setup>
import { computed } from 'vue'
import IconBase from './IconBase.vue'

const props = defineProps({ contact: Object, logements: Array, prix: Number })
defineEmits(['reserver'])

// Seules les coordonnées réellement renseignées dans site.js sont rendues
const coords = computed(() =>
  [
    props.contact.tel && { href: `tel:${props.contact.tel.replace(/\s/g, '')}`, label: props.contact.tel },
    props.contact.email && { href: `mailto:${props.contact.email}`, label: props.contact.email },
    props.contact.instagram && { href: props.contact.lienInstagram || '#', label: props.contact.instagram, externe: true },
  ].filter(Boolean)
)
</script>

<template>
  <section id="contact" class="relative overflow-hidden bg-cacao py-12 text-papier lg:py-16">
    <div
      class="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 opacity-40 blur-3xl"
      style="background: radial-gradient(circle, rgba(229,101,26,.8) 0%, transparent 65%)"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-[1240px] px-6">
      <div class="grid grid-cols-1 gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20" data-stagger="90">
        <!-- Appel -->
        <div>
          <p class="surtitre text-jaune-vif" data-anim="up">Réserver</p>
          <h2 class="display mt-4 max-w-[13ch] text-[clamp(2rem,4.9vw,3.85rem)]" data-anim="up">
            Vos prochaines vacances commencent ici.
          </h2>
          <p class="mt-6 max-w-[48ch] leading-relaxed text-papier/65" data-anim="up">
            Choisissez vos dates, je m’occupe du reste : le logement sera prêt, le frigo garni
            et le petit-déjeuner sur la table.
          </p>

          <div class="mt-9 flex flex-wrap items-center gap-6" data-anim="up">
            <button
              class="group relative inline-flex items-center gap-3 overflow-hidden bg-orange px-8 py-4 font-semibold text-white shadow-relief"
              @click="$emit('reserver')"
            >
              <span
                class="absolute inset-0 translate-y-full bg-orange-fonce transition-transform duration-500 group-hover:translate-y-0"
                style="transition-timing-function: cubic-bezier(.22,1,.36,1)"
                aria-hidden="true"
              />
              <span class="relative">Réserver — dès {{ prix }} € la nuit</span>
              <IconBase name="fleche" class="relative h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>

            <div v-if="coords.length" class="flex flex-wrap gap-x-6 gap-y-2">
              <a
                v-for="c in coords"
                :key="c.label"
                :href="c.href"
                :target="c.externe ? '_blank' : undefined"
                :rel="c.externe ? 'noopener' : undefined"
                class="lien-souligne py-1 text-[0.92rem] font-semibold text-papier/80 hover:text-papier"
              >{{ c.label }}</a>
            </div>
          </div>
        </div>

        <!-- Les deux adresses, en fiches sobres -->
        <div class="lg:pt-4">
          <p class="surtitre mb-5 text-papier/40" data-anim="up">Les deux adresses</p>
          <a
            v-for="l in logements"
            :key="l.id"
            :href="l.lien"
            target="_blank"
            rel="noopener"
            class="group flex items-start gap-4 border-t border-papier/12 py-6 last:border-b"
            data-anim="up"
          >
            <IconBase name="pin" class="mt-1 h-4 w-4 flex-none text-jaune-vif" />
            <div class="min-w-0 flex-1">
              <div class="display-s text-[1.14rem] transition-transform duration-500 group-hover:translate-x-1">
                {{ l.nom }}
              </div>
              <div class="mt-1 text-[0.85rem] text-papier/50">{{ l.lieu }}</div>
            </div>
            <IconBase
              name="fleche"
              class="mt-1 h-4 w-4 flex-none text-papier/35 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-jaune-vif"
            />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
