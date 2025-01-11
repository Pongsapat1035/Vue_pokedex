<script setup>
import { usePokemonStore } from '../store/pokemonStore';
import { onMounted, ref, reactive } from 'vue';

import Card from '../component/Card.vue'
import DetailCard from '../component/DetailCard.vue';
import Pagination from '../component/Pagination.vue';
import QuerySection from '../component/QuerySection.vue';

const pokemonStore = usePokemonStore()

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
const stats = ref([])
const isLoading = ref(true)

onMounted(async () => {
    try {
        await pokemonStore.loadData()
        isLoading.value = false
        await pokemonStore.loadAllData()
    } catch (error) {
        console.log(error)
    }
})

const showDetail = (pokemonData) => {
    const detailCard = document.getElementById('detail-card')
    for (let data in pokemonData) {
        selectPokemon[data] = pokemonData[data]
    }
    detailCard.style.display = 'flex'
}

</script>
<template>
    <div class="container mx-auto h-screen py-10 px-4 sm:px-6 md:px-10 flex">
        <div class="w-full lg:w-2/4">
            <QuerySection></QuerySection>
            <!-- Card container -->
            <div class="grid grid-cols-2 md:grid-cols-3 gap-x-5 sm:gap-x-10 gap-y-20 py-14">
                <!-- <div class="col-start-1 col-end-4 font-bold text-center text-2xl" >
                    Pokemon is Loading...
                </div> -->
                <div v-for="i in 12" v-if="isLoading" class="p-5 rounded-xl bg-slate-100 h-48 flex flex-col gap-4">
                    <div class="h-2/3 bg-slate-200 rounded-md"></div>
                    <div class="h-1/4 bg-slate-200 rounded-md"></div>
                    <div class="h-1/4 w-1/2 bg-slate-200 rounded-md"></div>
                </div>
                <Card v-else :name="pokemon.name" :id="pokemon.id" :imgUrl="pokemon.imgUrl" :types="pokemon.types"
                    v-for="pokemon in pokemonStore.pokemonList" @click="showDetail(pokemon)"></Card>
            </div>
            <Pagination></Pagination>
        </div>
        <div v-if="pokemonStore.loadingState" class="fixed bottom-5 right-5 bg-slate-100 shadow-lg p-5 rounded-xl">
            <div class="flex gap-2">
                <span class="loading loading-spinner loading-md"></span>
                <h3 class="font-bold">Loading</h3>
                <h3>{{ pokemonStore.loadingPercent }}%</h3>
            </div>
        </div>
    </div>
    <DetailCard id="detail-card" :data="selectPokemon" :stats="stats" class="hidden"></DetailCard>
</template>
