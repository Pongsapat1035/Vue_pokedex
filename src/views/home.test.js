import { render, screen, fireEvent, waitFor } from '@testing-library/vue'
import { describe, it, expect, beforeEach } from "vitest"
import HomeView from './HomeView.vue'

vi.mock("../store/pokemonStore.js", () => {
    const mockStore = {
        pokemonList: [
            {
                name: "Bulbasaur",
                id: "001",
                imgUrl: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
                types: [{ type: { name: "grass" } }, { type: { name: "poison" } }]
            }
        ],
        loadingState: false,
        loadingPercent: 0,
        panination: { pageIndex: 1 },
        totalPage: 5,
        loadData: vi.fn(),
        loadAllData: vi.fn()
    }
    return {
        usePokemonStore: () => mockStore
    }
})
describe("test Homeview", () => {
    let mockStore

    beforeEach(async () => {
        const storeModule = await import('../store/pokemonStore.js')
        mockStore = storeModule.usePokemonStore()
    })

    it("Loading percent must show if loaidng is not finish", () => {
        mockStore.loadingPercent = 10
        mockStore.loadingState = true
        render(HomeView)
        const loadingPercent = screen.getByText('Loading').nextElementSibling
        expect(loadingPercent.textContent).toBe('10%')
    })

    it("Skeleton loading must show if loading state is true", () => {
        render(HomeView)
        const skeletons = screen.getAllByTestId('skeleton')
        expect(skeletons.length).toBe(12)
        expect(mockStore.loadAllData).toHaveBeenCalled()
    })

    it('showDetail updates selectPokemon and shows detail card', async () => {
        vi.useFakeTimers()
        mockStore.loadAllData = vi.fn().mockResolvedValue()
        mockStore.pokemonList = [
            { name: "Bulbasaur", id: "001", imgUrl: "url", types: [] }
        ]
        render(HomeView)
        await vi.runAllTimersAsync()
        const card = await screen.findByText('Bulbasaur')
        await fireEvent.click(card)

        // // Check that the detail card is now visible
        const detailCard = document.getElementById('detail-card')
        expect(detailCard.style.display).toBe('flex')
        expect(screen.getAllByText("Bulbasaur").length).toBe(2)
        vi.useRealTimers()
    })

    it('logs error if loadData fails', async () => {
        mockStore.loadAllData = vi.fn().mockRejectedValue(new Error('Load failed'))
        const logSpy = vi.spyOn(console, 'log').mockImplementation(() => { })

        await render(HomeView)

        expect(logSpy).toHaveBeenCalledWith(expect.any(Error))
        logSpy.mockRestore()
    })

    it('shows cards and hides skeletons when loading is false', async () => {
        vi.useFakeTimers()

        mockStore.loadAllData = vi.fn().mockResolvedValue()
        mockStore.pokemonList = [
            { name: "Bulbasaur", id: "001", imgUrl: "url", types: [] }
        ]

        render(HomeView)
        await vi.runAllTimersAsync()


        await waitFor(() => {
            expect(screen.queryByTestId('skeleton')).not.toBeInTheDocument()
        })
        expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
        vi.useRealTimers()
    })
})