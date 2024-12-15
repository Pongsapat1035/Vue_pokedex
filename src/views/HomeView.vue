<script setup>

//https://dribbble.com/shots/15128634-Pokemon-Pokedex-Website-Redesign-Concept/attachments/6864101?mode=media

import Card from '../component/Card.vue'
import DetailCard from '../component/DetailCard.vue';
// import FilterTab from '../component/FilterTab.vue';
import { usePokemonStore } from '../store/pokemonStore';

import { onMounted, ref, reactive, watch } from 'vue';

const pokemonStore = usePokemonStore()

const stats = ref([])

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
const dropdownList = [
    {
        name: 'Type',
        data: ['grass', 'bug', 'dragon', 'fairy', 'fire', 'ghost',
            'ground', 'normal', "psychic", "steel", "dark", "electric",
            "fighting", "flying", "ice", "poison", "rock", "water"
        ]
    },
    {
        name: 'Height',
        data: ['Tall', 'Medium', 'Short']
    },
    {
        name: 'Weight',
        data: ['Heavy', 'Medium', 'Light']
    }
]

const isLoading = ref(true)

const queryText = reactive({
    searchText: '',
    Type: '',
    Height: '',
    Weight: ''
})

const sortText = ref('asc')

const searchPokemonText = ref("")

onMounted(async () => {
    try {
        await pokemonStore.loadData()
        await pokemonStore.loadAllData()
        isLoading.value = false
    } catch (error) {
        console.log(error)
    }

})

const loadPagination = (mode) => {
    mode === 'next' ? pokemonStore.panination.pageIndex += 1 : pokemonStore.panination.pageIndex -= 1
    pokemonStore.loadPagination()
}

const showDetail = (pokemonData) => {
    const detailCard = document.getElementById('detail-card')
    for (let data in pokemonData) {
        selectPokemon[data] = pokemonData[data]
    }
    detailCard.style.display = 'flex'
}

const clearInputFilter = () => {
    for (let query in queryText) {
        queryText[query] = ''
    }
    pokemonStore.clearFilter()
}

watch(sortText, (newSort) => pokemonStore.sortPokemon(newSort))

watch(queryText, (value) => {
    // console.log(value)
    pokemonStore.filterPokemon(value)
}, { deep: true })

</script>
<template>
    <div class="container mx-auto h-screen p-10 flex">
        <div class="w-full lg:w-2/4">
            <!-- Search input -->
            <div class="px-5 py-3 bg-white rounded-lg shadow-lg flex gap-5">
                <input class="flex-1 text-l px-2  outline-none" type="text" placeholder="Search your pokemon"
                    v-model="queryText.searchText" @keyup="pokemonStore.searchPokemon(searchPokemonText)">
                <button class="bg-[#ff5251] rounded-lg p-2 shadow-3xl shadow-[#ff5251]">
                    <div class="w-9 h-9 border-8 border-white rounded-full flex justify-center items-center">
                        <div class="w-3 h-3 bg-white rounded-full">
                        </div>
                    </div>
                </button>
            </div>
            <!-- Sort -->
            <div class="my-5 p-5">
                <div>
                    <select class="bg-transparent text-base font-bold" v-model="sortText">
                        <option class="text-base font-bold" value="asc">Ascending</option>
                        <option class="text-base font-bold" value="desc">Descending</option>
                    </select>
                </div>
                <!-- <div class="flex gap-5 items-center">
                    <span class="text-base font-bold">from</span>
                    <input class="text-sm font-bold  w-24 p-3 text-center bg-transparent border rounded-lg"
                        type="number">
                    <span class="text-base font-bold">to</span>
                    <input class="text-sm font-bold w-24 p-3 text-center bg-transparent border rounded-lg"
                        type="number">
                </div> -->
            </div>
            <div class="flex p-5 gap-5 flex-wrap justify-between">
                <div class="flex gap-5">
                    <div class="bg-white px-3 py-2 rounded-lg shadow-sm flex gap-2 items-center"
                        v-for="item in dropdownList">
                        <span class="font-bold">
                            {{ item.name }}
                        </span>
                        <select class="text-sm font-bold text-gray-500 rounded-lg outline-none "
                            v-model="queryText[item.name]">
                            <option class="text-sm font-bold" selected disabled>{{ item.name }}</option>
                            <option v-for="listData in item.data" class="text-sm font-bold" :value="listData">{{
                                listData }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="flex items-center">
                    <button class="bg-slate-500	rounded-lg p-2" @click="clearInputFilter">
                        <img src="../component/icons/resetIcon.svg" alt="">
                    </button>
                </div>
            </div>
            <!-- Card container -->
            <div class="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-20 py-14">
                <div class="col-start-1 col-end-4 font-bold text-center text-2xl" v-if="isLoading">
                    Pokemon is Loading...
                </div>
                <Card v-else :name="pokemon.name" :id="pokemon.id" :imgUrl="pokemon.imgUrl" :types="pokemon.types"
                    v-for="pokemon in pokemonStore.pokemonList" @click="showDetail(pokemon)"></Card>
            </div>
            <div class="flex gap-4 pb-5 px-1 items-center">
                <div class="min-w-10">
                    <button v-if="pokemonStore.panination.pageIndex > 1"
                        class="cursor-pointer bg-slate-200 p-2 rounded-full flex justify-center"
                        @click="loadPagination('previous')" id="pagination_back-btn">
                        <img src="../component/icons/previous-arrow.svg" alt="previous-arrow">
                    </button>
                </div>
                <div>
                    {{ pokemonStore.panination.pageIndex }} <span class="font-semibold mx-1">of</span> {{
                        pokemonStore.totalPage }}
                </div>
                <div>
                    <button v-if="pokemonStore.panination.pageIndex < pokemonStore.totalPage"
                        class="cursor-pointer bg-slate-200 p-2 rounded-full" @click="loadPagination('next')"
                        id="pagination_next-btn">
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