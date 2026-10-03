<script setup>
/**
 * Intitulé de section éditorial : numéro de chapitre en gros chiffre évidé,
 * filet, sur-titre en petites capitales, puis le titre et son chapô.
 * Le décalage volontaire du numéro casse la symétrie des grilles.
 */
defineProps({
  numero: String,
  surtitre: String,
  titre: String,
  chapo: String,
  clair: { type: Boolean, default: false }, // sur fond sombre
  align: { type: String, default: 'gauche' },
})
</script>

<template>
  <!-- `ch` se calcule d'après la police de l'élément qui le porte : une
       largeur en ch sur ce conteneur (en 1 rem) étranglerait le titre, qui
       est bien plus gros. Les largeurs sont donc posées sur les textes. -->
  <div :class="align === 'centre' ? 'mx-auto text-center' : ''" class="max-w-[680px]">
    <div class="flex items-baseline gap-4" data-anim="up">
      <span
        class="display chiffres text-[2.85rem] leading-none"
        :class="clair ? 'text-papier/15' : 'text-argile'"
        aria-hidden="true"
      >{{ numero }}</span>
      <span class="filet flex-1" :class="clair && 'opacity-30'" />
    </div>

    <p
      class="surtitre mt-3"
      :class="clair ? 'text-jaune-vif' : 'text-orange-encre'"
      data-anim="up"
    >{{ surtitre }}</p>

    <h2
      class="display mt-2 max-w-[17ch] text-[clamp(1.85rem,3.8vw,2.95rem)]"
      :class="clair ? 'text-papier' : 'text-encre'"
      data-anim="up"
    >{{ titre }}</h2>

    <p
      v-if="chapo"
      class="mt-3 max-w-[54ch] text-[1.02rem] leading-relaxed"
      :class="clair ? 'text-papier/65' : 'text-encre2'"
      data-anim="up"
    >{{ chapo }}</p>
  </div>
</template>
