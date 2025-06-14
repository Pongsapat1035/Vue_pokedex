import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, beforeEach } from "vitest"
import Pagination from '../Pagination.vue'

vi.mock("../../store/pokemonStore.js", () => {
    const mockStore = {
        panination: { pageIndex: 1 },
        totalPage: 5,
        loadPage: vi.fn(),
    }
    return {
        usePokemonStore: () => mockStore
    }
})

describe("Pagination Component", () => {

    let mockStore

    beforeEach(async () => {
        const storeModule = await import('../../store/pokemonStore.js')
        mockStore = storeModule.usePokemonStore()
    })

    describe("check button click event", () => {
        it("call loadPage when next button is clicked", async () => {
            mockStore.panination.pageIndex = 1
            render(Pagination)
            const nextBtn = document.getElementById('pagination_next-btn')
            await fireEvent.click(nextBtn)
            expect(mockStore.loadPage).toHaveBeenCalled()
            expect(mockStore.panination.pageIndex).toBe(2)
        })

        it("calls loadPage and decreases pageIndex when previous button is clicked", async () => {
            mockStore.panination.pageIndex = 2
            render(Pagination)
            const prevBtn = document.getElementById('pagination_back-btn')
            await fireEvent.click(prevBtn)
            expect(mockStore.loadPage).toHaveBeenCalled()
            expect(mockStore.panination.pageIndex).toBe(1)
        })
    })

    describe("Check visible button (next / previous)", () => {
        it("check next button disable when pageIndex >= total page ", async () => {
            mockStore.panination.pageIndex = 5
            render(Pagination)
            const nextBtn = screen.queryByRole('button', { name: /next-arrow/i })
            expect(nextBtn).not.toBeInTheDocument()
        })
        it("check prev button disable when pageIndex == 1 ", async () => {
            mockStore.panination.pageIndex = 1
            render(Pagination)
            const prevBtn = screen.queryByRole('button', { name: /previous-arrow/i })
            expect(prevBtn).not.toBeInTheDocument()
        })
    })

})
