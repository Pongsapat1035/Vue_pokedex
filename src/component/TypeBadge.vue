<script setup>
import { reactive, watch } from "vue";

const props = defineProps({
  type: String,
});

const color = reactive({
  text: "",
  background: "",
});

const typeColorMap = {
  FIRE: { text: "text-[#740938]", background: "bg-[#FFAAAA]" },
  GRASS: { text: "text-[#47663B]", background: "bg-[#E3F0AF]" },
  BUG: { text: "text-[#16423C]", background: "bg-[#95D2B3]" },
  DRAGON: { text: "text-[#1679AB]", background: "bg-[#FFAAAA]" },
  FAIRY: { text: "text-[#A64D79]", background: "bg-[#FFCCE1]" },
  GHOST: { text: "text-[#441752]", background: "bg-[#B692C2]" },
  GROUND: { text: "text-[#54473F]", background: "bg-[#F5F4B3]" },
  NORMAL: { text: "text-[#373A40]", background: "bg-[#D9EAFD]" },
  STEEL: { text: "text-[#405D72]", background: "bg-[#B3C8CF]" },
  PSYCHIC: { text: "text-[#6A1E55]", background: "bg-[#FFC6C6]" },
  DARK: { text: "text-[#3C3D37]", background: "bg-[#B9B4C7]" },
  ELECTRIC: { text: "text-[#898121]", background: "bg-[#FEEE91]" },
  FIGHTING: { text: "text-[#8D0B41]", background: "bg-[#F29F58]" },
  FLYING: { text: "text-[#074173]", background: "bg-[#B9E5E8]" },
  ICE: { text: "text-[#134B70]", background: "bg-[#B1F0F7]" },
  POISON: { text: "text-[#22177A]", background: "bg-[#CDC1FF]" },
  ROCK: { text: "text-[#5F374B]", background: "bg-[#E4C087]" },
  WATER: { text: "text-[#1F509A]", background: "bg-[#D4EBF8]" },
};

const badgeColorCheck = (recievedType) => {
  const type = recievedType.toUpperCase();
  return (
    typeColorMap[type] || { text: "text-[#000000]", background: "bg-[#ffffff]" }
  );
};

// if type change value
watch(
  () => props.type,
  (type) => {
    const { text, background } = badgeColorCheck(type);
    color.text = text;
    color.background = background;
  },
  { immediate: true }
);
</script>

<template>
  <div
    class="px-3 py-2 rounded-lg font-bold text-xs text-center min-w-16"
    :class="[color.background, color.text]">
    {{ type.toUpperCase() }}
  </div>
</template>
