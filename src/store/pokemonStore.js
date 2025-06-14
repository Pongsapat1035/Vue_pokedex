import { defineStore } from 'pinia'
import axios from 'axios'

const BASE_URL = 'https://pokeapi.co/api/v2'

export const usePokemonStore = defineStore('pokemonStore', {
    state: () => ({
        lists: [],
        filterList: [],
        limit: 100,
        offset: 0,
        panination: {
            pageIndex: 1,
            perPage: 12,
            startIndex: 0,
            endIndex: 12
        },
        loadingState: false
    }),
    getters: {
        totalPage: (state) => Math.ceil(state.filterList.length / state.panination.perPage),
        pokemonList: (state) => state.filterList.slice(state.panination.startIndex, state.panination.endIndex),

        filterType: (state) => (data, query) => data.filter(pokemon => pokemon.types.some(type => type.type.name === query)),

        getHeightType: (state) => (height) => height >= 20 ? 'Tall' : height >= 10 ? 'Medium' : 'Short',
        filterHeight: (state) => (data, query) => data.filter(pokemon => state.getHeightType(pokemon.height) === query),

        getWeightType: (state) => (weight) => weight >= 500 ? 'Heavy' : weight >= 100 ? 'Medium' : 'Light',
        filterWeight: (state) => (data, query) => data.filter(pokemon => state.getWeightType(pokemon.weight) === query),

        loadingPercent: (state) => Math.floor(state.lists.length / 1302 * 100)
    },
    actions: {
        async loadData(limit, offset) {
            try {
                const response = await axios.get(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)
                const nameList = response.data.results
                const promise = nameList.map((el) => this.loadDetail(el.url))
                const pokemonList = await Promise.all(promise)
                this.lists = this.lists.concat(pokemonList)
                this.filterList = this.lists.concat(pokemonList)
            } catch (error) {
                console.log(error)
            }
        },
        async loadAllData() {
            try {
                this.loadingState = true
                this.loadData(this.limit, 0)

                for (let i = 1; i < 14; i++) {
                    this.offset += this.limit
                    this.loadData(this.limit, this.offset)
                }
                this.loadingState = false
            } catch (error) {
                console.log(error)
            }
        },
        async loadDetail(url) {
            const getDetail = await axios.get(`${url}`)
            const pokemon = getDetail.data
            const { height, weight, types, abilities, stats, base_experience } = pokemon
            const pokemonData = {
                name: pokemon.name.toUpperCase(),
                id: pokemon.id.toString(),
                imgUrl: pokemon.sprites.front_default,
                height,
                weight,
                types,
                abilities,
                stats,
                baseExp: base_experience
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
            return result
        },
        clearFilter() {
            // default value
            this.filterList = this.lists
            this.panination.perPage = 12
            this.panination.startIndex = 0
            this.panination.endIndex = 12
        },
        sortPokemon(sortText) {
            return this.filterList.sort((a, b) => sortText === 'asc' ? a.id - b.id : b.id - a.id)
        },
        filterPokemon(query, sortBy) {
            this.clearFilter()
            // query text is empty

            console.log(query)
            const allQueryEmpty = query.searchText === '' &&
                query.Type === '' &&
                query.Height === '' &&
                query.Weight === ''

            if (allQueryEmpty) return

            this.panination.pageIndex = 1

            // filter ทีเดียวหมด
            let result = []
            result = this.sortPokemon(sortBy)
            
            if (query.searchText !== '') {
                result = this.searchPokemon(query.searchText)
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
           
            console.log(result)
            this.filterList = result
           
        },
    },
})