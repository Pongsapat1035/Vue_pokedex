<script setup>
import TypeBadge from '../component/TypeBadge.vue';

defineProps({
    data: Object
})

const statsColorConfig = [
    {
        name: 'HP',
        color: 'bg-[#df2041]',
    },
    {
        name: 'ATK',
        color: 'bg-[#ff994d]',
    },
    {
        name: 'DEF',
        color: 'bg-[#fedd41]',
    },
    {
        name: 'SpA',
        color: 'bg-[#84ddfe]',
    },
    {
        name: 'SpD',
        color: 'bg-[#a8ef95]',
    },
    {
        name: 'SPD',
        color: 'bg-[#fb95a9]',
    }
]

const closeDetail = () =>{
    const detailContainer = document.getElementById('detail-card')
    detailContainer.style.display = 'none'
}

</script>

<template>
     <div class="w-1/2 left-1/2 top-24 flex-1 flex justify-center items-end fixed mx-20">
            <div
                class="relative w-2/3 max-w-sm flex flex-col items-center rounded-3xl gap-4 bg-white shadow-lg p-16">
                <img class="w-32 absolute -top-14"
                    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png">
                <h1 class="font-bold text-2xl">BULBASAUR</h1>
                <div class="flex gap-2">
                    <TypeBadge type="GRASS"></TypeBadge>
                    <TypeBadge type="GRASS"></TypeBadge>
                </div>
                <h1 class="font-bold">ABILITIES</h1>
                <div class="grid grid-cols-2 gap-2 w-full">
                    <div class="bg-[#f7f8fd] py-2 px-4 rounded-3xl border border-blue-950 text-center w-full">
                        <span class="font-semibold text-sm">Fighting</span>
                    </div>
                    <div class="bg-[#f7f8fd] py-2 px-4 rounded-3xl border border-blue-950 text-center w-full">
                        <span class="font-semibold text-sm">Fighting</span>
                    </div>
                    <div class="bg-[#f7f8fd] py-2 px-4 rounded-3xl border border-blue-950 text-center w-full">
                        <span class="font-semibold text-sm">Fighting</span>
                    </div>
                </div>
                <div class="w-full grid grid-cols-2 gap-2">
                    <div class="flex flex-col items-center w-full">
                        <span class="font-bold">HEIGHT</span>
                        <div class="bg-[#f7f8fd] py-2 px-4 rounded-3xl text-center font-semibold mt-2 flex-1 w-full">
                            20
                        </div>
                    </div>
                    <div class="flex flex-col items-center w-full">
                        <span class="font-bold">WEIGHT</span>
                        <div class="bg-[#f7f8fd] py-2 px-4 rounded-3xl font-semibold text-center mt-2 flex-1 w-full">
                            20
                        </div>
                    </div>
                    <div class="flex flex-col items-center w-full">
                        <span class="font-bold">BASE EXP.</span>
                        <div class="bg-[#f7f8fd] py-2 px-4 rounded-3xl text-center font-semibold mt-2 flex-1 w-full">
                            20
                        </div>
                    </div>
                </div>
                <div id="stats" class="w-full flex flex-col items-center">
                    <span class="font-bold my-3">STATS</span>
                    <div class="w-full grid grid-cols-6 gap-6">
                        <div v-for="stat in statsColorConfig" class="bg-slate-100 w-[2.4rem] h-[3.875rem] rounded-full p-1">
                            <div class="rounded-full text-center h-1/2 w-full flex justify-center items-center text-white font-bold text-xs"
                            :class="[stat.color]">
                                {{ stat.name }}
                            </div>
                            <div class="h-1/2 w-full flex justify-center font-semibold text-sm p-1">
                                20
                            </div>
                        </div>
                    </div>
                </div>
                <div @click="closeDetail()" class="cursor-pointer">
                    <img src="../component/icons/close.svg" alt="close-icon" class="absolute top-4 right-4">
                </div>
            </div>
        </div>
</template>