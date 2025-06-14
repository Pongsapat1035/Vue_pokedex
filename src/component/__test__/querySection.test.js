import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, beforeEach } from "vitest"
import QuerySection from '../QuerySection.vue'


vi.mock("../../store/pokemonStore.js", () => {
    const mockStore = {
        clearFilter: vi.fn(),
        filterPokemon: vi.fn(),
        searchPokemon: vi.fn(),
        loadPage: vi.fn()
    }
    return {
        usePokemonStore: () => mockStore
    }
})

describe("Query section component", () => {
    let mockStore

    beforeEach(async () => {
        const storeModule = await import('../../store/pokemonStore.js')
        mockStore = storeModule.usePokemonStore()
    })

    it('renders all dropdowns and their options', () => {
        render(QuerySection)

        // Check for dropdown labels
        expect(screen.getByText('Type')).toBeInTheDocument()
        expect(screen.getByText('Height')).toBeInTheDocument()
        expect(screen.getByText('Weight')).toBeInTheDocument()

        // Check for some options in the Type dropdown
        expect(screen.getByText('grass')).toBeInTheDocument()
        expect(screen.getByText('fire')).toBeInTheDocument()
        expect(screen.getByText('water')).toBeInTheDocument()

        // Check for options in Height dropdown
        expect(screen.getByText('Tall')).toBeInTheDocument()
        const mediums = screen.getAllByText('Medium')
        expect(mediums.length).toBeGreaterThan(1)
        expect(screen.getByText('Short')).toBeInTheDocument()

        // Check for options in Weight dropdown
        expect(screen.getByText('Heavy')).toBeInTheDocument()
        expect(screen.getByText('Light')).toBeInTheDocument()
    })

    it("clear button click should clear all query", async () => {
        render(QuerySection)

        const clearBtn = screen.getByText('Clear')
        await fireEvent.click(clearBtn)

        expect(screen.getByText("Ascending")).toBeTruthy()
        expect(mockStore.clearFilter).toHaveBeenCalled()
    })

    it("search pokemon in text input call query pokemon", async () => {
        render(QuerySection)
        const input = screen.getByPlaceholderText("Search your pokemon")
        await fireEvent.update(input, "John Doe") // updates v-model
        await fireEvent.keyUp(input, { key: 'a', code: 'KeyA' }) // triggers @keyup
        expect(mockStore.searchPokemon).toHaveBeenCalledOnce()
    })

    it("changing Type dropdown calls filterPokemon with updated queryText", async () => {
        render(QuerySection)
        const typeSelect = screen.getByLabelText('Type') || screen.getAllByRole('combobox')[0]
        const query = {
            Height: "",
            Type: "fire",
            Weight: "",
            searchText: "",
        }
        await fireEvent.update(typeSelect, 'fire')
        expect(mockStore.filterPokemon).toHaveBeenCalledWith(query, "asc")
    })

    it("changing Height dropdown calls filterPokemon", async () => {
        render(QuerySection)
        const heightSelect = screen.getByLabelText('Height') || screen.getAllByRole('combobox')[1]
        await fireEvent.update(heightSelect, 'Tall')
        expect(mockStore.filterPokemon).toHaveBeenCalled()
    })

    it("changing Weight dropdown calls filterPokemon", async () => {
        render(QuerySection)
        const weightSelect = screen.getByLabelText('Weight') || screen.getAllByRole('combobox')[2]
        await fireEvent.update(weightSelect, 'Heavy')
        expect(mockStore.filterPokemon).toHaveBeenCalled()
    })

    it("Goto page input changes page and calls loadPage", async () => {
        // Setup mock store with panination object
        mockStore.panination = { pageIndex: 1 }
        mockStore.totalPage = 10

        render(QuerySection)
        const gotoInput = screen.getByRole('spinbutton')
        await fireEvent.update(gotoInput, '5')

        expect(mockStore.panination.pageIndex).toBe(5)
        expect(mockStore.loadPage).toHaveBeenCalled()
    })

    it("Go to page must equal totalPage if enter page > totalPage", async () => {
        mockStore.totalPage = 4

        render(QuerySection)
        const gotoInput = screen.getByRole('spinbutton')
        await fireEvent.update(gotoInput, '5')
        expect(mockStore.panination.pageIndex).toBe(4)

        expect(gotoInput.value).toBe('4')
        expect(mockStore.loadPage).toHaveBeenCalled()
    })
})