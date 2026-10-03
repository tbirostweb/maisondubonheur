<script setup>
defineProps({ marque: String, domaine: String, baseline: String, credit: String })
const annee = new Date().getFullYear()

const liens = [
  { href: '#logements', label: 'Logements' },
  { href: '#petit-dejeuner', label: 'Petit-déjeuner' },
  { href: '#region', label: 'Troyes' },
  { href: '#avis', label: 'Avis' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
]
</script>

<template>
  <footer class="bg-espresso pb-10 pt-16 text-papier">
    <div class="mx-auto max-w-[1240px] px-6">
      <!-- Signature typographique pleine largeur -->
      <div class="border-b border-papier/12 pb-10">
        <p class="display text-[clamp(2.3rem,8vw,6rem)] leading-none text-papier/90">
          {{ marque }}
        </p>
        <p class="surtitre mt-4 text-papier/35">{{ baseline }}</p>
      </div>

      <div class="flex flex-col gap-8 py-8 sm:flex-row sm:items-start sm:justify-between">
        <nav aria-label="Pied de page">
          <ul class="flex flex-wrap gap-x-7 gap-y-2">
            <li v-for="l in liens" :key="l.href">
              <a :href="l.href" class="lien-souligne py-1 text-[0.88rem] text-papier/60 hover:text-papier">
                {{ l.label }}
              </a>
            </li>
          </ul>
        </nav>

        <a
          href="/mentions-legales.html"
          class="lien-souligne self-start py-1 text-[0.88rem] text-papier/50 hover:text-papier"
        >
          Mentions légales
        </a>
        <a
          href="#accueil"
          class="lien-souligne self-start py-1 text-[0.88rem] font-semibold text-papier/60 hover:text-papier"
        >
          Retour en haut ↑
        </a>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-3 border-t border-papier/12 pt-6 text-[0.8rem] text-papier/40">
        <span>© {{ annee }} {{ marque }} — {{ domaine }}</span>
        <span v-if="credit">{{ credit }}</span>
      </div>
    </div>
  </footer>
</template>
