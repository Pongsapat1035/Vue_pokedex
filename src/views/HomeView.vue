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
        await pokemonStore.loadAllData()
        isLoading.value = false
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
    <div class="container mx-auto h-screen py-10 px-6 md:px-10 flex">
        <div class="w-full lg:w-2/4">
            <QuerySection></QuerySection>
            <!-- Card container -->
            <div class="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-20 py-14">
                <div class="col-start-1 col-end-4 font-bold text-center text-2xl" v-if="isLoading">
                    Pokemon is Loading...
                </div>
                <Card v-else :name="pokemon.name" :id="pokemon.id" :imgUrl="pokemon.imgUrl" :types="pokemon.types"
                    v-for="pokemon in pokemonStore.pokemonList" @click="showDetail(pokemon)"></Card>
            </div>
            <Pagination></Pagination>
        </div>
    </div>
    <DetailCard id="detail-card" :data="selectPokemon" :stats="stats" class="hidden"></DetailCard>
</template>
