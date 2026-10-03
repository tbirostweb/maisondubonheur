<script setup>
/**
 * Enveloppe autour de Lucide (lucide.dev).
 *
 * Les composants sont nommés en français côté site : les gabarits gardent
 * <IconBase name="parking" /> et cette table fait la correspondance avec
 * l'icône Lucide. Changer d'icône se fait donc ici, à un seul endroit.
 */
import {
  KeyRound, Sparkles, Croissant, MessageCircle, MapPin, Plus, Minus,
  ArrowUpRight, ArrowDown, Users, BedDouble, Ruler, Star, X, CalendarDays,
  Check, ChevronLeft, ChevronRight, Wifi, SquareParking, Snowflake,
  PawPrint, Coffee, Heart, Quote, Compass, TrainFront,
} from 'lucide-vue-next'

// Note : Lucide recompose lui-même `class` sur son <svg> tout en héritant
// des attrs, si bien que les classes apparaissent en double dans le DOM.
// C'est interne à la librairie et sans effet — le navigateur dédoublonne.

defineProps({
  name: { type: String, required: true },
  /** Épaisseur du trait : 1.5 par défaut, plus fin que Lucide (2) pour
      rester dans le registre éditorial du reste de la page. */
  epaisseur: { type: [Number, String], default: 1.5 },
})

const icones = {
  cle: KeyRound,
  menage: Sparkles,
  panier: Croissant,
  message: MessageCircle,
  pin: MapPin,
  plus: Plus,
  moins: Minus,
  fleche: ArrowUpRight,
  bas: ArrowDown,
  users: Users,
  lit: BedDouble,
  regle: Ruler,
  etoile: Star,
  fermer: X,
  calendrier: CalendarDays,
  check: Check,
  gauche: ChevronLeft,
  droite: ChevronRight,
  wifi: Wifi,
  parking: SquareParking,
  clim: Snowflake,
  animal: PawPrint,
  cafe: Coffee,
  coeur: Heart,
  guillemet: Quote,
  boussole: Compass,
  gare: TrainFront,
}
</script>

<template>
  <component
    :is="icones[name] || Plus"
    :stroke-width="epaisseur"
    aria-hidden="true"
    focusable="false"
  />
</template>
