import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = 'https://pokeapi.co/api/v2'

export const usePokemonStore = defineStore('pokemonStore', {
    state: () => ({
        lists: [],
        filterList: [],
        limit: 300,
        offset: 100,
        panination: {
            pageIndex: 1,
            perPage: 12,
            startIndex: 0,
            endIndex: 12
        }
    }),
    getters: {
        totalPage: (state) => Math.ceil(state.filterList.length / state.panination.perPage),
        pokemonList: (state) => state.filterList.slice(state.panination.startIndex, state.panination.endIndex),

        filterType: (state) => (data, query) => data.filter(pokemon => pokemon.types.some(type => type.type.name === query)),

        getHeightType: (state) => (height) => height >= 20 ? 'Tall' : height >= 10 ? 'Medium' : 'Short',
        filterHeight: (state) => (data, query) => data.filter(pokemon => state.getHeightType(pokemon.height) === query),

        getWeightType: (state) => (weight) => weight >= 500 ? 'Heavy' : weight >= 100 ? 'Medium' : 'Light',
        filterWeight: (state) => (data, query) => data.filter(pokemon => state.getWeightType(pokemon.weight) === query),
    },
    actions: {
        async loadData() {
            try {
                const response = await axios.get(`${BASE_URL}/pokemon?limit=100&offset=0`)
                const nameList = response.data.results
                const promise = nameList.map((el) => this.loadDetail(el.url))
                const pokemonList = await Promise.all(promise)
                this.lists = this.lists.concat(pokemonList)
                this.filterList = this.lists
                console.log('load first data complete : ', this.lists.length)
                console.log(this.lists)
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
                this.filterList = this.lists
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
                id: pokemon.id.toString(),
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
        loadPage() {
            const currectPage = this.panination.pageIndex
            this.panination.startIndex = (currectPage - 1) * this.panination.perPage
            this.panination.endIndex = this.panination.startIndex + this.panination.perPage
        },
        searchPokemon(searchText) {
            searchText = searchText.toUpperCase()
            const result = this.filterList.filter(pokemon => pokemon.name.includes(searchText) || pokemon.id.includes(searchText))
            this.filterList = result
        },
        clearFilter() {
            // default value
            this.filterList = this.lists
            this.panination.perPage = 12
            this.panination.startIndex = 0
            this.panination.endIndex = 12
        },
        selectByLength(startIndex, endIndex) {

        },
        sortPokemon(sortText) {
            if (sortText === 'asc') {
                this.filterList.sort((a, b) => a.id - b.id)
            } else if (sortText === 'desc') {
                this.filterList.sort((a, b) => b.id - a.id)
            }
        },
        filterPokemon(query) {
            this.clearFilter()
            // query text is empty
            if (
                query.searchText === '' &&
                query.Type === '' &&
                query.Height === '' &&
                query.Weight === ''
            ) {
                return
            }
            this.panination.pageIndex = 1
            // filter ทีเดียวหมด
            console.log('query recieved : ', query)
            let result = []

            if (query.sort === 'asc') {
                result = this.filterList.sort((a, b) => a.id - b.id)
            } else if (query.sort === 'desc') {
                result = this.filterList.sort((a, b) => b.id - a.id)
            }

            if (query.searchText !== '') {
                query.searchText = query.searchText.toUpperCase()
                result = this.filterList.filter(pokemon => pokemon.name.includes(query.searchText) || pokemon.id.includes(query.searchText))
            }
            if (query.Type !== '') {
                result = this.filterType(result.length !== 0 ? result : this.filterList, query.Type)
            }
            if (query.Height !== '') {
                result = this.filterHeight(result.length !== 0 ? result : this.filterList, query.Height)
            }
            if (query.Weight !== '') {
                result = this.filterWeight(result.length !== 0 ? result : this.filterList, query.Weight)
            }
            this.filterList = result
        },
    },
})