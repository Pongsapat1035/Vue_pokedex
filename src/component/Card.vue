<script setup>
import TypeBadge from './TypeBadge.vue';
defineProps({
    name: String,
    id: String,
    imgUrl: String,
    types: Array
})

</script>


<template>
    <div class="bg-white shadow-md rounded-2xl flex justify-center items-center flex-col gap-2 relative py-6 px-2 cursor-pointer">
        <img class="absolute -top-14 w-24 h-24"
            :src="imgUrl">
        <p class="font-bold text-slate-500 text-sm pt-4">#{{ id }}</p>
        <h1 class="font-bold text-l text-[#001130] text-center">{{ name }}</h1>
        <div id="type-container" class="grid grid-cols-2 gap-1">
            <TypeBadge :type="type.type.name.toUpperCase()" v-for="type in types"></TypeBadge>
        </div>
    </div>
</template>