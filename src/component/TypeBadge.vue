<script setup>

import { reactive, watch } from 'vue';

const props = defineProps({
    type: String
})

const color = reactive({
    text: '',
    background: ''
})

const badgeColorCheck = () => {
    const type = props.type.toUpperCase()
    switch (type) {
        case 'FIRE':
            color.text = 'text-[#740938]'
            color.background = 'bg-[#FFAAAA]'
            break
        case 'GRASS':
            color.text = 'text-[#47663B]'
            color.background = 'bg-[#E3F0AF]'
            break
        case 'BUG':
            color.text = 'text-[#16423C]'
            color.background = 'bg-[#95D2B3]'
            break
        case 'DRAGON':
            color.text = 'text-[#1679AB]'
            color.background = 'bg-[#FFAAAA]'
            break
        case 'FAIRY':
            color.text = 'text-[#A64D79]'
            color.background = 'bg-[#FFCCE1]'
            break
        case 'GHOST':
            color.text = 'text-[#441752]'
            color.background = 'bg-[#B692C2]'
            break
        case 'GROUND':
            color.text = 'text-[#54473F]'
            color.background = 'bg-[#F5F4B3]'
            break
        case 'NORMAL':
            color.text = 'text-[#373A40]'
            color.background = 'bg-[#D9EAFD]'
            break
        case 'STEEL':
            color.text = 'text-[#405D72]'
            color.background = 'bg-[#B3C8CF]'
            break
        case 'PSYCHIC':
            color.text = 'text-[#6A1E55]'
            color.background = 'bg-[#FFC6C6]'
            break
        case 'DARK':
            color.text = 'text-[#3C3D37]'
            color.background = 'bg-[#B9B4C7]'
            break
        case 'ELECTRIC':
            color.text = 'text-[#898121]'
            color.background = 'bg-[#FEEE91]'
            break
        case 'FIGHTING':
            color.text = 'text-[#8D0B41]'
            color.background = 'bg-[#F29F58]'
            break
        case 'FLYING':
            color.text = 'text-[#074173]'
            color.background = 'bg-[#B9E5E8]'
            break
        case 'ICE':
            color.text = 'text-[#134B70]'
            color.background = 'bg-[#B1F0F7]'
            break
        case 'POISON':
            color.text = 'text-[#22177A]'
            color.background = 'bg-[#CDC1FF]'
            break
        case 'ROCK':
            color.text = 'text-[#5F374B]'
            color.background = 'bg-[#E4C087]'
            break
        case 'WATER':

            color.text = 'text-[#1F509A]'
            color.background = 'bg-[#D4EBF8]'
            break

        default:
            color.text = 'text-[#000000]'
            color.background = 'bg-[#ffffff]'
    }
}

// if type change value
watch(
    () => props.type,
    (type) => {
        badgeColorCheck()
    },
    { immediate: true }
)

</script>

<template>
    <div class="px-3 py-2 rounded-lg font-bold text-xs text-center min-w-16" :class="[color.background, color.text]">
        {{ type.toUpperCase() }}
    </div>
</template>