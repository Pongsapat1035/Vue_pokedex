<script setup>
import { onMounted } from 'vue';

const props = defineProps({
    type: String
})

const color = {
    text: '',
    background: ''
}

const badgeColorCheck = () => {
    const type = props.type
    switch (type) {
        case 'FIRE':
            color.text = 'text-[#740938]'
            color.background = 'bg-[#FF748B]'
            break
        case 'GRASS':
            color.text = 'text-[#47663B]'
            color.background = 'bg-[#E3F0AF]'
            break
        case 'BUG':
            color.text = 'text-[#626F47]'
            color.background = 'bg-[#C1CFA1]'
            break
        case 'DRAGON':
            color.text = 'text-[#0A97B0]'
            color.background = 'bg-[#FFAAAA]'
            break
        case 'FAIRY':
            color.text = 'text-[#A64D79]'
            color.background = 'bg-[#FFCCE1]'
            break
        case 'GHOST':
            color.text = 'text-[#624E88]'
            color.background = 'bg-[#B692C2]'
            break
        case 'GROUND':
            color.text = 'text-[#898121]'
            color.background = 'bg-[#F5F4B3]'
            break
        case 'NORMAL':
            color.text = 'text-[#9AA6B2]'
            color.background = 'bg-[#D9EAFD]'
            break
        case 'STEEL':
            color.text = 'text-[#89A8B2]'
            color.background = 'bg-[#B3C8CF]'
            break
        case 'PSYCHIC':
            color.text = 'text-[#EE66A6]'
            color.background = 'bg-[#FFC6C6]'
            break
        case 'DARK':
            color.text = 'text-[#3C3D37]'
            color.background = 'bg-[#B9B4C7]'
            break
        case 'ELECTRIC':
            color.text = 'text-[#FEEC37]'
            color.background = 'bg-[#FEEE91]'
            break
        case 'FIGHTING':
            color.text = 'text-[#F26B0F]'
            color.background = 'bg-[#F29F58]'
            break
        case 'FLYING':
            color.text = 'text-[#4A628A]'
            color.background = 'bg-[#B9E5E8]'
            break
        case 'ICE':
            color.text = 'text-[#81BFDA]'
            color.background = 'bg-[#B1F0F7]'
            break
        case 'POISON':
            color.text = 'text-[#22177A]'
            color.background = 'bg-[#CDC1FF]'
            break
        case 'ROCK':
            color.text = 'text-[#B59F78]'
            color.background = 'bg-[#FAF6E3]'
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

badgeColorCheck()

</script>

<template>
    <div class="px-3 py-2 rounded-lg font-bold text-xs text-center min-w-16" :class="[color.background, color.text]">
        {{ type }}
    </div>
</template>