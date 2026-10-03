<script setup>
import IconBase from './IconBase.vue'
import SectionHeading from './SectionHeading.vue'

defineProps({ services: Array })

/**
 * Filets verticaux de la grille.
 *
 * Le nombre de colonnes change selon la largeur (1 → 2 → 4), donc « est-ce
 * que cette case ouvre une ligne ? » change aussi. Un simple `border-l` posé
 * sur tout sauf le premier élément produisait un trait orphelin devant la
 * case 05, qui commence pourtant une nouvelle ligne en 4 colonnes.
 *
 * On calcule donc la règle par palier, à partir de l'indice réel.
 * Les classes sont écrites en toutes lettres pour que Tailwind les génère.
 */
function filets(i) {
  return [
    i % 2 === 0 ? 'sm:border-l-0 sm:pl-0' : 'sm:border-l sm:pl-7', // 2 colonnes
    i % 4 === 0 ? 'lg:border-l-0 lg:pl-0' : 'lg:border-l lg:pl-7', // 4 colonnes
  ].join(' ')
}
</script>

<template>
  <section id="services" class="border-y border-ligne bg-papier-2 py-12 lg:py-16">
    <div class="mx-auto max-w-[1240px] px-6">
      <SectionHeading
        numero="04"
        surtitre="Équipements & services"
        titre="Tout est prévu. Il ne manque que vous."
        chapo="Les mêmes attentions dans les deux appartements, sans supplément ni option cachée."
      />

      <!-- Grille en filets : les séparateurs remplacent les contours de carte -->
      <div
        class="mt-14 grid grid-cols-1 border-t border-ligne-2 sm:grid-cols-2 lg:grid-cols-4"
        data-stagger="70"
      >
        <article
          v-for="(s, i) in services"
          :key="s.titre"
          class="group relative border-b border-ligne-2 py-8 pl-0 pr-0 transition-colors duration-500 sm:pr-7"
          :class="filets(i)"
          data-anim="up"
        >
          <!-- Trait orange qui se déploie sous la case au survol -->
          <span
            class="pointer-events-none absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-orange transition-transform duration-[600ms] group-hover:scale-x-100"
            style="transition-timing-function: cubic-bezier(.22,1,.36,1)"
            aria-hidden="true"
          />

          <div class="flex items-start justify-between gap-4">
            <IconBase
              :name="s.icone"
              class="h-6 w-6 flex-none text-orange transition-transform duration-[600ms] group-hover:-translate-y-1"
            />
            <span class="chiffres surtitre text-argile">0{{ i + 1 }}</span>
          </div>

          <h3 class="display-s mt-6 text-[1.18rem]">{{ s.titre }}</h3>
          <p class="mt-2 text-[0.92rem] leading-relaxed text-encre2">{{ s.desc }}</p>
        </article>
      </div>
    </div>
  </section>
</template>
