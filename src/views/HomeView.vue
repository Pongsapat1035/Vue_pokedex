<script setup>

//https://dribbble.com/shots/15128634-Pokemon-Pokedex-Website-Redesign-Concept/attachments/6864101?mode=media

import Card from '../component/Card.vue'
import DetailCard from '../component/DetailCard.vue';
import FilterTab from '../component/FilterTab.vue';
import { usePokemonStore } from '../store/pokemonStore';

import { onMounted, ref, reactive } from 'vue';

const pokemonStore = usePokemonStore()

const pokemonList = ref([])
const stats = ref([])
let pageIndex = ref(1)
const selectPokemon = reactive({
    abilities: '',
    baseExp: '',
    height: '',
    id: '',
    imgUrl: '',
    name: '',
    types: '',
    weight: '',
    stats: []
})

const searchPokemonText = ref("")

onMounted(async () => {
    await pokemonStore.loadData()
    pokemonList.value = pokemonStore.loadPagination(pageIndex.value)
    await pokemonStore.loadAllData()
})

const loadPagination = (mode) => {
    mode === 'next' ? pageIndex.value += 1 : pageIndex.value -=1
    pokemonList.value = pokemonStore.loadPagination(pageIndex.value)
}

const showDetail = (pokemonData) => {
    const detailCard = document.getElementById('detail-card')
    for (let data in pokemonData) {
        selectPokemon[data] = pokemonData[data]
    }
    detailCard.style.display = 'flex'
}

const searchPokemon = () => {
    console.log(pokemonList.value)
    pokemonList.value = pokemonStore.lists.forEach(el => {
        
    })
}

</script>
<template>
    <div class="container mx-auto h-screen p-10 flex">
        <div class="w-full lg:w-2/4">
            <!-- Search input -->
            <div class="px-5 py-3 bg-white rounded-lg shadow-lg flex gap-5">
                <input class="flex-1 text-l px-2  outline-none" type="text" placeholder="Search your pokemon" 
                v-model="searchPokemonText"
                @keyup="searchPokemon"
                >
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
            <FilterTab></FilterTab>
            <!-- Card container -->
            <div class="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-20 py-14">
                <Card :name="pokemon.name" :id="pokemon.id" :imgUrl="pokemon.imgUrl" :types="pokemon.types"
                    v-for="pokemon in pokemonList" @click="showDetail(pokemon)"></Card>
            </div>
            <div class="flex gap-4 pb-5 px-1 items-center">
                <div class="min-w-10">
                    <button v-if="pageIndex > 1" class="cursor-pointer bg-slate-200 p-2 rounded-full flex justify-center" @click="loadPagination('previous')" id="pagination_back-btn">
                        <img  src="../component/icons/previous-arrow.svg" alt="previous-arrow">
                    </button>
                </div>
                <div>
                    {{ pageIndex }} <span class="font-semibold mx-1">of</span> {{ pokemonStore.totalPage }}
                </div>
                <div>
                    <button v-if="pageIndex < pokemonStore.totalPage" class="cursor-pointer bg-slate-200 p-2 rounded-full" @click="loadPagination('next')" id="pagination_next-btn">
                        <img src="../component/icons/next-arrow.svg" alt="previous-arrow">
                    </button>
                </div>
            </div>
        </div>
    </div>
    <DetailCard id="detail-card" :data="selectPokemon" :stats="stats" class="hidden"></DetailCard>
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