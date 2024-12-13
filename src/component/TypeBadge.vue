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
    switch(type) {
        case 'FIRE':
            color.text = 'text-[#740938]'
            color.background = 'bg-[#FF748B]'
            break
        case 'GRASS':
            color.text = 'text-[#47663B]'
            color.background = 'bg-[#E3F0AF]'
            break
        default:
            color.text = 'text-[#000000]'
            color.background = 'bg-[#ffffff]'
    }
}

badgeColorCheck()

</script>

<template>
    <div class="px-3 py-2 rounded-lg font-bold text-xs text-center min-w-16"
         :class="[color.background,color.text]" 
    >
        {{ type }}
    </div>
</template>