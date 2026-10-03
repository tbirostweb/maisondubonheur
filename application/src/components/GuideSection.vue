<script setup>
import IconBase from './IconBase.vue'
import SectionHeading from './SectionHeading.vue'
import ArcDecoratif from './ArcDecoratif.vue'

defineProps({ guide: Object })

// Nombre de lieux montrés. Les autres restent dans site.js : passez à 6
// pour tout afficher. Volontairement court pour ne pas allonger la page.
const NB_LIEUX = 4

/**
 * Filets verticaux de la grille « Y venir ».
 * Le nombre de colonnes change (1 → 2 → 4) : on calcule donc par palier
 * si la case ouvre une ligne. Classes écrites en toutes lettres pour que
 * Tailwind les génère.
 */
function filets(i) {
  return [
    i % 2 === 0 ? 'sm:border-l-0 sm:pl-0' : 'sm:border-l sm:pl-8',
    i % 4 === 0 ? 'lg:border-l-0 lg:pl-0' : 'lg:border-l lg:pl-8',
  ].join(' ')
}
</script>

<template>
  <section id="region" class="relative overflow-hidden bg-espresso py-12 text-papier lg:py-16">
    <!-- Bord haut en arc : adoucit le passage du papier clair au brun foncé -->
    <ArcDecoratif couleur="text-papier" />

    <!-- Lueur d'ambiance en bas à droite -->
    <div
      class="pointer-events-none absolute -bottom-40 -right-32 h-[560px] w-[560px] rounded-full opacity-30 blur-3xl"
      style="background: radial-gradient(circle, rgba(229,101,26,.85) 0%, transparent 66%)"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-[1240px] px-6">
      <SectionHeading
        numero="05"
        surtitre="Autour des logements"
        :titre="guide.titre"
        :chapo="guide.sousTitre"
        clair
      />

      <!-- Index des lieux : une table des matières, pas six cartes -->
      <ul class="mt-14 border-t border-papier/12" data-stagger="70">
        <li
          v-for="(lieu, i) in guide.lieux.slice(0, NB_LIEUX)"
          :key="lieu.nom"
          class="group border-b border-papier/12"
          data-anim="up"
        >
          <div class="relative overflow-hidden">
            <!-- Fond qui balaie de gauche à droite au survol -->
            <span
              class="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-papier/[0.045] transition-transform duration-[600ms] lg:group-hover:scale-x-100"
              style="transition-timing-function: cubic-bezier(.22,1,.36,1)"
              aria-hidden="true"
            />

            <div class="relative flex items-start gap-5 py-7 lg:items-center lg:gap-8 lg:px-4">
              <span class="chiffres surtitre mt-1.5 w-7 flex-none text-papier/35 lg:mt-0">
                0{{ i + 1 }}
              </span>

              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3
                    class="display-s text-[clamp(1.25rem,2.4vw,1.75rem)] transition-transform duration-[600ms] lg:group-hover:translate-x-2"
                    style="transition-timing-function: cubic-bezier(.22,1,.36,1)"
                  >
                    {{ lieu.nom }}
                  </h3>
                  <span class="surtitre text-jaune-vif/80">{{ lieu.type }}</span>
                </div>

                <!-- Description : toujours lisible en mobile, dépliée au survol en desktop -->
                <div
                  class="grid transition-all duration-[600ms] grid-rows-[1fr] lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]"
                  style="transition-timing-function: cubic-bezier(.22,1,.36,1)"
                >
                  <p class="overflow-hidden pt-2 text-[0.92rem] leading-relaxed text-papier/55 lg:max-w-[62ch] lg:pt-0 lg:opacity-0 lg:transition-opacity lg:duration-500 lg:group-hover:pt-3 lg:group-hover:opacity-100">
                    {{ lieu.desc }}
                  </p>
                </div>
              </div>

              <div class="flex flex-none items-center gap-5">
                <span class="hidden whitespace-nowrap text-[0.82rem] text-papier/45 sm:block">
                  {{ lieu.distance }}
                </span>
                <span
                  class="flex h-9 w-9 items-center justify-center border border-papier/20 text-papier/50 transition-all duration-500 lg:group-hover:border-jaune-vif lg:group-hover:bg-jaune-vif lg:group-hover:text-espresso"
                  aria-hidden="true"
                >
                  <IconBase name="fleche" class="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <p class="mt-10 flex items-center gap-3 text-[0.92rem] text-papier/45" data-anim="up">
        <IconBase name="boussole" class="h-4 w-4 flex-none text-jaune-vif" />
        …et toutes mes autres adresses, partagées à votre arrivée.
      </p>

      <!-- ============ Y VENIR ============ -->
      <div v-if="guide.acces?.length" class="mt-20 border-t border-papier/12 pt-14">
        <div class="mb-10 flex flex-wrap items-baseline justify-between gap-4">
          <h3 class="display text-[clamp(1.4rem,2.6vw,2rem)]" data-anim="up">Y venir</h3>
          <p class="max-w-[42ch] text-[0.92rem] text-papier/50" data-anim="up">
            Troyes est plus proche qu’on ne le croit — et le stationnement
            n’est jamais un problème ici.
          </p>
        </div>

        <div class="grid grid-cols-1 border-t border-papier/12 sm:grid-cols-2 lg:grid-cols-4" data-stagger="90">
          <div
            v-for="(a, i) in guide.acces"
            :key="a.titre"
            class="flex h-full flex-col border-b border-papier/12 py-7 sm:pr-8 lg:pr-8"
            :class="filets(i)"
            data-anim="up"
          >
            <IconBase :name="a.icone" class="h-5 w-5 text-jaune-vif" />
            <h4 class="display-s mt-4 text-[1.24rem]">{{ a.titre }}</h4>
            <p class="mt-2 text-[0.9rem] leading-relaxed text-papier/60">{{ a.detail }}</p>
            <!-- `mt-auto` cale cette ligne en bas de la case : les descriptions
                 n'ont pas toutes le même nombre de lignes, sans cela les filets
                 et les mentions ocre se retrouvent à des hauteurs différentes. -->
            <p class="mt-auto border-t border-papier/10 pt-3 text-[0.8rem] font-semibold text-jaune-vif">
              {{ a.appui }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
