<script setup>
import Card from '../component/Card.vue'

import DetailCard from '../component/DetailCard.vue';

import { usePokemonStore } from '../store/pokemonStore';

import { onMounted, ref } from 'vue';

const pokemonStore = usePokemonStore()
const pokemonList = ref([])
onMounted(async () => {
    await pokemonStore.loadData()
    console.log(pokemonStore.lists)
    pokemonList.value = pokemonStore.lists
    // await pokemonStore.loadAllData()
})

const showDetail = (pokemonData) => {
    const detailCard = document.getElementById('detail-card')
    console.log(pokemonData)
    detailCard.style.display = 'flex'

}

const dropdownList = [
    {
        name: 'Type',
        data: ['a', 'b', 'c']
    },
    {
        name: 'Weaknesses',
        data: ['a', 'b', 'c']
    },
    {
        name: 'Ability',
        data: ['a', 'b', 'c']
    },
    {
        name: 'Height',
        data: ['a', 'b', 'c']
    },
    {
        name: 'Weight',
        data: ['a', 'b', 'c']
    }
]

</script>
<template>
    <div class="container mx-auto h-screen p-10 flex">
        <div class="w-full lg:w-2/4">
            <!-- Search input -->
            <div class="px-5 py-3 bg-white rounded-lg shadow-lg flex gap-5">
                <input class="flex-1 text-l px-2  outline-none" type="text" placeholder="Search your pokemon">
                <button class="bg-[#ff5251] rounded-lg p-2 shadow-3xl shadow-[#ff5251]">
                    <div class="w-9 h-9 border-8 border-white rounded-full flex justify-center items-center">
                        <div class="w-3 h-3 bg-white rounded-full">
                        </div>
                    </div>
                </button>
            </div>
            <!-- Sort -->
            <div class="flex justify-between items-center my-5 p-5">
                <div>
                    <select class="bg-transparent text-base font-bold">
                        <option class="text-base font-bold" value="asc">Accending</option>
                        <option class="text-base font-bold" value="desc">Descending</option>
                    </select>
                </div>
                <div class="flex gap-5 items-center">
                    <span class="text-base font-bold">from</span>
                    <input class="text-sm font-bold  w-24 p-3 text-center bg-transparent border rounded-lg"
                        type="number">
                    <span class="text-base font-bold">to</span>
                    <input class="text-sm font-bold w-24 p-3 text-center bg-transparent border rounded-lg"
                        type="number">
                </div>
            </div>
            <!-- Filter -->
            <div class="flex p-5 gap-5 flex-wrap">
                <div class="bg-white px-3 py-2 rounded-lg shadow-sm" v-for="item in dropdownList">
                    <select class="text-sm font-bold text-gray-500 rounded-lg outline-none ">
                        <option class="text-sm font-bold" selected disabled value="asc">{{ item.name }}</option>
                        <option class="text-sm font-bold" value="asc" v-for="listData in item.data">{{ listData }}
                        </option>
                    </select>
                </div>
                <div class="flex items-center">
                    <button class="bg-slate-500	rounded-lg p-2">
                        <img src="../component/icons/resetIcon.svg" alt="">
                    </button>
                </div>
            </div>
            <!-- Card container -->
            <div class="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-20 py-14">
                <Card :name="pokemon.name" :id="pokemon.id" :imgUrl="pokemon.imgUrl" :types="pokemon.types"
                    v-for="pokemon in pokemonList" @click="showDetail(pokemon)"></Card>
            </div>
        </div>

    </div>
    <DetailCard id="detail-card" class="hidden"></DetailCard>
</template>

<style>
html {
    font-size: 14px;
}


@media (min-width: 768px) {
    html {
        font-size: 16px;
    }
}

@media (min-width: 1024px) {
    html {
        font-size: 16px;
    }
}
</style>