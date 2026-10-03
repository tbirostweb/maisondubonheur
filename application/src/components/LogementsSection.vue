<script setup>
import LogementCard from './LogementCard.vue'
import SectionHeading from './SectionHeading.vue'

defineProps({ logements: Array })
defineEmits(['ouvrir-galerie'])
</script>

<template>
  <section id="logements" class="relative overflow-hidden bg-papier-2 py-12 lg:py-16">
    <div class="mx-auto max-w-[1240px] px-6">
      <SectionHeading
        numero="02"
        surtitre="Les logements"
        titre="Deux adresses, la même attention."
        chapo="L’un à Troyes, l’autre à Sainte-Savine, à quelques minutes l’un de l’autre. Logement entier, climatisation, parking gratuit et petit-déjeuner compris dans les deux cas."
      />

      <div class="mt-4 divide-y divide-ligne">
        <LogementCard
          v-for="(l, i) in logements"
          :key="l.id"
          :logement="l"
          :index="i"
          @ouvrir-galerie="$emit('ouvrir-galerie', $event)"
        />
      </div>
    </div>
  </section>
</template>
