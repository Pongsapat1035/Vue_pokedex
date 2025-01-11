<script setup>
import { ref, reactive, watch } from 'vue';
import { usePokemonStore } from '../store/pokemonStore';

const pokemonStore = usePokemonStore()

const sortText = ref('asc')
const queryText = reactive({
    searchText: '',
    Type: '',
    Height: '',
    Weight: ''
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

const clearInputFilter = () => {
    sortText.value = 'asc'
    for (let query in queryText) {
        queryText[query] = ''
    }
    pokemonStore.clearFilter()
}

const gotoPageIndex = ref()
watch(gotoPageIndex, (newPage) => {
    // if user input more than max page
    if (newPage > pokemonStore.totalPage) gotoPageIndex.value = pokemonStore.totalPage
    pokemonStore.panination.pageIndex = newPage
    pokemonStore.loadPage()
})

watch(sortText, (newSort) => pokemonStore.sortPokemon(newSort))
watch(queryText, (value) => pokemonStore.filterPokemon(value), { deep: true })

</script>
<template>
    <!-- Search input -->
    <div class="px-5 py-3 bg-white rounded-lg shadow-lg flex gap-5">
        <input class="flex-1 text-l px-2 outline-none w-4/5" type="text" placeholder="Search your pokemon"
            v-model="queryText.searchText" @keyup="pokemonStore.searchPokemon(searchPokemonText)">
        <button class="bg-[#ff5251] rounded-lg p-2 shadow-3xl shadow-[#ff5251]">
            <div class="w-9 h-9 border-8 border-white rounded-full flex justify-center items-center">
                <div class="w-3 h-3 bg-white rounded-full">
                </div>
            </div>
        </button>
    </div>
    <!-- Sort -->
    <div class="my-5 p-5 flex flex-wrap justify-between items-center gap-4">
        <div>
            <select class="bg-transparent text-base font-bold" v-model="sortText">
                <option class="text-base font-bold" value="asc">Ascending</option>
                <option class="text-base font-bold" value="desc">Descending</option>
            </select>
        </div>
        <div class="flex gap-5 items-center">
            <span class="text-base font-bold">Go to page</span>
            <input class="text-sm font-bold w-full sm:w-24 p-3 text-center bg-transparent border rounded-lg" type="number"
                min="1" :max="pokemonStore.totalPage" v-model="gotoPageIndex">
        </div>
    </div>
    <div class="flex p-5 gap-5 justify-between items-start">
        <div class="flex flex-wrap justify-start gap-5">
            <div class="bg-white min-w-[170px] px-3 py-2 rounded-lg shadow-sm flex justify-between gap-2 items-center " v-for="item in dropdownList">
                <span class="font-bold">
                    {{ item.name }}
                </span>
                <select class="text-sm font-bold text-gray-500 rounded-lg outline-none text-center" v-model="queryText[item.name]">
                    <!-- <option class="text-sm font-bold" selected disabled>{{ item.name }}</option> -->
                    <option v-for="listData in item.data" class="text-sm font-bold text-center" :value="listData">{{
                        listData }}
                    </option>
                </select>
            </div>
        </div>
        <div class="flex items-center justify-end flex-1">
            <button class="bg-red-400 border border-red-400 rounded-lg p-2 font-semibold text-white text-sm" @click="clearInputFilter">
                Clear
            </button>
        </div>
    </div>
</template>