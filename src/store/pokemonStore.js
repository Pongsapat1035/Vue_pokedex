import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = 'https://pokeapi.co/api/v2'

export const usePokemonStore = defineStore('pokemonStore', {
    state: () => ({
        lists: [],
        limit: 300,
        offset: 20
    }),
    actions: {
        async loadData() {
            try {
                const response = await axios.get(`${BASE_URL}/pokemon?limit=20&offset=0`)
                const nameList = response.data.results
                const promise = nameList.map((el) => this.loadDetail(el.url))
                const pokemonList = await Promise.all(promise)
                this.lists = this.lists.concat(pokemonList)
                console.log('load first data')
            } catch (error) {
                console.log(error)
            }
        },
        async loadAllData() {
            try {
                // console.log('loadData')
                for (let i = 100; i < 1500; i += this.limit) {
                    const response = await axios.get(`${BASE_URL}/pokemon?limit=${this.limit}&offset=${this.offset}`)
                    const nameList = response.data.results
                    const promise = nameList.map((el) => this.loadDetail(el.url))
                    const pokemonList = await Promise.all(promise)
                    this.offset += this.limit
                    this.lists = this.lists.concat(pokemonList)
                }
                console.log('load all data complete')
                console.log(this.lists)
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
        }


    },
})