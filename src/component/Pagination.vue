<script setup>
import { usePokemonStore } from '../store/pokemonStore';

const pokemonStore = usePokemonStore()

const loadPagination = (mode) => {
    mode === 'next' ? pokemonStore.panination.pageIndex += 1 : pokemonStore.panination.pageIndex -= 1
    pokemonStore.loadPage()
}

</script>
<template>
    <div class="flex gap-4 pb-5 px-1 items-center">
        <div class="min-w-10">
            <button v-if="pokemonStore.panination.pageIndex > 1" 
                class="cursor-pointer bg-slate-200 p-2 rounded-full" @click="loadPagination('previous')" 
                id="pagination_back-btn">
                <img src="./icons/previous-arrow.svg" alt="previous-arrow">
            </button>
        </div>
        <div>
            {{ pokemonStore.panination.pageIndex }}
            <span class="font-semibold mx-1">of</span>
            {{ pokemonStore.totalPage }}
        </div>
        <div>
            <button v-if="pokemonStore.panination.pageIndex < pokemonStore.totalPage"
                class="cursor-pointer bg-slate-200 p-2 rounded-full" @click="loadPagination('next')"
                id="pagination_next-btn">
                <img src="./icons/next-arrow.svg" alt="next-arrow">
            </button>
        </div>
    </div>
</template>