import { setActivePinia, createPinia } from 'pinia'
import { usePokemonStore } from './pokemonStore'
import { describe, it, expect, beforeEach, assert } from "vitest"
import axios from 'axios'
vi.mock('axios')

describe("Test pokemon store ", () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    describe("getter check", () => {

        it('totalPage returns correct number of pages', () => {
            const store = usePokemonStore()

            store.filterList = Array(25).fill({})
            store.panination.perPage = 10
            expect(store.totalPage).toBe(3)
        })

        it("Pokemon list must select list from startIndex and endIndex", () => {
            const store = usePokemonStore()
            store.panination.startIndex = 1
            store.panination.endIndex = 2
            store.filterList = [0, 1, 2, 3, 4]
            expect(store.pokemonList).toEqual([1])
        })

        it('filterType returns only pokemons with the given type', () => {
            const store = usePokemonStore()
            const pokemons = [
                { name: 'Bulbasaur', types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }] },
                { name: 'Charmander', types: [{ type: { name: 'fire' } }] },
                { name: 'Squirtle', types: [{ type: { name: 'water' } }] }
            ]

            const result = store.filterType(pokemons, 'fire')
            expect(result).toEqual([
                { name: 'Charmander', types: [{ type: { name: 'fire' } }] }
            ])
        })

        it("Test get height type ", () => {
            const store = usePokemonStore()
            expect(store.getHeightType(36)).toBe("Tall")
            expect(store.getHeightType(14)).toBe("Medium")
            expect(store.getHeightType(2)).toBe("Short")
        })

        it("Test get Weight type ", () => {
            const store = usePokemonStore()
            expect(store.getWeightType(540)).toBe("Heavy")
            expect(store.getWeightType(250)).toBe("Medium")
            expect(store.getWeightType(80)).toBe("Light")
        })

        it("check loading percent ", () => {
            const store = usePokemonStore()
            store.lists = new Array(50)
            const result = Math.floor((50 / 1302) * 100)
            expect(store.loadingPercent).toBe(result)
        })

        it("check filter pokemon by height ", () => {
            const store = usePokemonStore()
            const pokemons = [
                { name: 'Bulbasaur', height: 30 },
                { name: 'Charmander', height: 10 },
                { name: 'Squirtle', height: 40 }
            ]

            const result = store.filterHeight(pokemons, 'Tall')
            expect(result).toEqual([
                { name: 'Bulbasaur', height: 30 },
                { name: 'Squirtle', height: 40 }
            ])
        })

        it("check filter pokemon by height ", () => {
            const store = usePokemonStore()
            const pokemons = [
                { name: 'Bulbasaur', weight: 120 },
                { name: 'Charmander', weight: 600 },
                { name: 'Squirtle', weight: 10 }
            ]

            const heavyFilter = store.filterWeight(pokemons, 'Heavy')
            expect(heavyFilter).toEqual([
                { name: 'Charmander', weight: 600 },
            ])

            const lightFilter = store.filterWeight(pokemons, 'Light')
            expect(lightFilter).toEqual([
                { name: 'Squirtle', weight: 10 }
            ])
        })
    })

    describe("action check ", () => {
        // load Data check 
        describe("loadData function", () => {
            it("Success", async () => {
                const store = usePokemonStore()
                axios.get.mockResolvedValue({
                    data: {
                        results: [
                            { url: 'https://pokeapi.co/api/v2/pokemon/1/' }
                        ]
                    }
                })
                store.loadDetail = vi.fn().mockResolvedValue({ name: 'Bulbasaur' })

                await store.loadData()
                expect(axios.get).toHaveBeenCalled()
                expect(store.lists.length).toBeGreaterThan(0)
            })

            it("Fail", async () => {
                const store = usePokemonStore()
                axios.get.mockRejectedValue(new Error('API call failed'))
                const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { })

                await store.loadData()
                expect(axios.get).toHaveBeenCalled()
                expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error))
            })
        })

        describe("Load all data function", () => {
            it("Success", async () => {
                const store = usePokemonStore()
                store.loadData = vi.fn()
                await store.loadAllData()
                expect(store.loadingState).toBeFalsy()
                expect(store.loadData).toHaveBeenCalledTimes(14)
            })

            it("failed", async () => {
                const store = usePokemonStore()
                const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => { })

                await store.loadAllData()
                store.loadAllData = vi.fn().mockRejectedValue(new Error('fail'))

                expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error))
                consoleSpy.mockRestore()
            })
        })

        describe("loadDetail function", () => {
            it('loadDetail returns correct pokemon data on success', async () => {
                const store = usePokemonStore()
                axios.get.mockResolvedValue({
                    data: {
                        name: 'bulbasaur',
                        id: 1,
                        sprites: { front_default: 'img.png' },
                        height: 7,
                        weight: 69,
                        types: [],
                        abilities: [],
                        stats: [],
                        base_experience: 64
                    }
                })

                const result = await store.loadDetail('https://pokeapi.co/api/v2/pokemon/1/')
                expect(result).toEqual({
                    name: 'BULBASAUR',
                    id: '1',
                    imgUrl: 'img.png',
                    height: 7,
                    weight: 69,
                    types: [],
                    abilities: [],
                    stats: [],
                    baseExp: 64
                })
            })

            it('loadDetail throws if axios fails', async () => {
                const store = usePokemonStore()
                axios.get.mockRejectedValue(new Error('fail'))

                // Use rejects matcher to check error is thrown
                await expect(store.loadDetail('bad-url')).rejects.toThrow('fail')
            })

        })

        describe("loadPage function ", () => {
            it("should get start-end index correcty", () => {
                const store = usePokemonStore()
                store.panination.pageIndex = 2
                store.panination.perPage = 10
                store.loadPage()
                expect(store.panination.startIndex).toEqual(10)
                expect(store.panination.endIndex).toEqual(20)
            })
        })

        describe("search pokemon function", () => {
            it("show found pokemon correctly", () => {
                const store = usePokemonStore()
                store.filterList = [{ id: '1', name: 'BULBASAUR' }, { id: '2', name: 'CHARMELEON' }, { id: '3', name: 'CHARIZARD' }]

                store.searchPokemon('BULBASAUR')
                expect(store.filterList.length).toEqual(1)
                const pokemonName = store.filterList.map(pokemon => pokemon.name)
                expect(pokemonName).toContain('BULBASAUR')

                const isExist = store.filterList.includes(pokemon => pokemon.name === 'CHARMELEON')
                expect(!isExist).toBeTruthy()
            })

            it("display empty if pokemon not found", () => {
                const store = usePokemonStore()
                store.filterList = [{ id: '1', name: 'BULBASAUR' }, { id: '2', name: 'CHARMELEON' }, { id: '3', name: 'CHARIZARD' }]

                store.searchPokemon('lk')
                expect(store.filterList.length).toEqual(0)
            })
        })

        describe("clear Filter function", () => {
            it("Clear filter work correctly", () => {
                const store = usePokemonStore()
                store.filterList = [1, 2]
                store.lists = [1, 2, 3]
                store.clearFilter()
                expect(store.filterList).toEqual(store.lists)
                expect(store.panination.perPage).toEqual(12)
                expect(store.panination.startIndex).toEqual(0)
                expect(store.panination.endIndex).toEqual(12)
            })
        })

        describe("sort pokemon function", () => {

            it("sort pokemon from asc", () => {
                const store = usePokemonStore()
                store.filterList = [{ id: 1 }, { id: 2 }, { id: 3 }]
                store.sortPokemon('asc')
                expect(store.filterList).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }])
            })
            it("sort pokemon from asc", () => {
                const store = usePokemonStore()
                store.filterList = [{ id: 1 }, { id: 2 }, { id: 3 }]
                store.sortPokemon('desc')
                expect(store.filterList).toEqual([{ id: 3 }, { id: 2 }, { id: 1 }])
            })
        })

        describe("filter pokemin function", () => {
            let store
            beforeEach(() => {
                store = usePokemonStore()
                store.lists = [{
                    name: 'BULBASAUR',
                    id: '1',
                    height: 7,
                    weight: 600,
                    types: [{ type: { name: 'GRASS' } }]
                }, {
                    name: 'BULBASG',
                    id: '1',
                    height: 7,
                    weight: 69,
                    types: [{ type: { name: 'FIRE' } }]
                }, {
                    name: 'VENUSAUR',
                    id: '2',
                    height: 16,
                    weight: 69,
                    types: [{ type: { name: 'FLY' } }, { type: { name: 'FIRE' } }]
                }, {
                    name: 'METAPOD',
                    id: '3',
                    height: 17,
                    weight: 450,
                    types: [{ type: { name: 'WATER' } }]
                }]
            })

            it("if all query is empty do nothing", () => {
                const store = usePokemonStore()
                const query = { searchText: '', Type: '', Height: '', Weight: '' }
                const filterPokemonSpy = vi.fn(store.filterPokemon)
                filterPokemonSpy(query)
                expect(filterPokemonSpy).toHaveReturned()
            })

            it("search text work correctly", () => {
                const query = { searchText: 'bul', Type: '', Height: '', Weight: '' }

                store.filterPokemon(query, 'asc')
                const pokemonName = store.filterList.map(pokemon => pokemon.name)
                expect(pokemonName).toContain('BULBASAUR')
                expect(pokemonName).not.toContain('METAPOD')
                expect(store.filterList).toHaveLength(2)
            })

            it("filter by type work correctly", () => {
                const query = { searchText: '', Type: 'FIRE', Height: '', Weight: '' }
                store.filterPokemon(query, 'asc')
                const pokemonName = store.filterList.map(pokemon => pokemon.name)
                expect(pokemonName).toContain('BULBASG')
                expect(pokemonName).not.toContain('METAPOD')
                expect(store.filterList).toHaveLength(2)
            })

            it("filter by height work correctly", () => {
                const query = { searchText: '', Type: '', Height: 'Medium', Weight: '' }
                store.filterPokemon(query, 'asc')
                const pokemonName = store.filterList.map(pokemon => pokemon.name)
                expect(pokemonName).toContain('VENUSAUR')
                expect(pokemonName).toContain('METAPOD')
                expect(pokemonName).not.toContain('BULBASAUR')
                expect(store.filterList).toHaveLength(2)
            })

            it("filter by Weight work correctly", () => {
                const query = { searchText: '', Type: '', Height: '', Weight: 'Heavy' }
                store.filterPokemon(query, 'asc')
                const pokemonName = store.filterList.map(pokemon => pokemon.name)
                expect(pokemonName).toContain('BULBASAUR')
                expect(store.filterList).toHaveLength(1)
            })

            it("filter alls work correctly", () => {
                const query = { searchText: 'BUL', Type: 'GRASS', Height: 'SHORT', Weight: 'Heavy' }
                store.filterPokemon(query, 'asc')
                const pokemonName = store.filterList.map(pokemon => pokemon.name)
                expect(pokemonName).toContain('BULBASAUR')
                expect(store.filterList).toHaveLength(1)
            })
        })
    })


})