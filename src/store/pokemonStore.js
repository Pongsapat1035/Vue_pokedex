import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = 'https://pokeapi.co/api/v2'

export const usePokemonStore = defineStore('pokemonStore', {
    state: () => ({
        lists: [],
        showlist: [],
        limit: 300,
        offset: 20,
        panination : {
            perPage: 12
        }
    }),
    getters: {
        totalPage: (state) =>  Math.ceil(state.lists.length/state.panination.perPage),
    },
    actions: {
        async loadData() {
            try {
                const response = await axios.get(`${BASE_URL}/pokemon?limit=20&offset=0`)
                const nameList = response.data.results
                const promise = nameList.map((el) => this.loadDetail(el.url))
                const pokemonList = await Promise.all(promise)
                this.lists = this.lists.concat(pokemonList)
                console.log('load first data complete : ', this.lists.length)
                
            } catch (error) {
                console.log(error)
            }
            
        },
        async loadAllData() {
            try {
                for (let i = 100; i < 1500; i += this.limit) {
                    const response = await axios.get(`${BASE_URL}/pokemon?limit=${this.limit}&offset=${this.offset}`)
                    const nameList = response.data.results
                    const promise = nameList.map((el) => this.loadDetail(el.url))
                    const pokemonList = await Promise.all(promise)
                    this.offset += this.limit
                    this.lists = this.lists.concat(pokemonList)
                }
                console.log('load all data complete data range: ', this.lists.length)
            } catch (error) {
                console.log(error)
            }
        },
        async loadDetail(url) {
            const getDetail = await axios.get(`${url}`)
            const pokemon = getDetail.data
            const pokemonData = {
                name: pokemon.name.toUpperCase(),
                id: pokemon.order,
                imgUrl: pokemon.sprites.front_default,
                height: pokemon.height,
                weight: pokemon.weight,
                types: pokemon.types,
                abilities: pokemon.abilities,
                stats: pokemon.stats,
                baseExp: pokemon.base_experience
            }
            return pokemonData
        },
        loadPagination (currectPage) {
            const startIndex = (currectPage - 1) * this.panination.perPage
            const endIndex = startIndex + this.panination.perPage
            return this.lists.slice(startIndex, endIndex)
        }
    },
})