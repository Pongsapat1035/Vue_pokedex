import { render, screen, fireEvent } from '@testing-library/vue'
import { describe, it, expect, beforeEach } from "vitest"
import DetailCard from '../DetailCard.vue'

const mockPokemonDetail = {
    name: "VENUSAUR",
    id: "3",
    baseExp: 250,
    height: 20,
    weight: 1000,
    imgUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
    abilities: [{ ability: { name: 'overgrow' } }, { ability: { name: 'chlorophyll' } }],
    stats: [{ base_stat: 80, stat: { name: 'hp' } }],
    types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }]
}

const colors = [
    {
        name: 'HP',
        color: 'bg-[#df2041]',
    },
    {
        name: 'ATK',
        color: 'bg-[#ff994d]',
    },
]

describe("Card detail component", () => {
    beforeEach(() => {
        render(DetailCard, {
            props: { data: mockPokemonDetail }
        })
    })

    it('renders the pokemon name', () => {
        expect(screen.getByText('VENUSAUR')).toBeTruthy()
        expect(screen.getByText('overgrow')).toBeTruthy()
        expect(screen.getByText('chlorophyll')).toBeTruthy()
        expect(screen.getByText('20 ft.')).toBeTruthy()
        expect(screen.getByText('1000 lbs.')).toBeTruthy()

        const imgDiv = screen.getByText('VENUSAUR').previousElementSibling
        const img = imgDiv.tagName === 'IMG' ? imgDiv : imgDiv.querySelector('img')
        expect(img).toBeTruthy()
        expect(img.src).toContain('3.png')

        const baseExpDiv = screen.getByText('BASE EXP.').nextElementSibling
        expect(baseExpDiv.textContent).toBe('250')
    })

    it('div with text HP should have bg-[#df2041] class', () => {

        // Find the div that contains the text "HP"
        const hpDiv = screen.getByText('HP').parentElement
        // Check if it or its child has the correct background class
        const coloredDiv = hpDiv.querySelector('div.bg-\\[\\#df2041\\]')
        expect(coloredDiv).toBeTruthy()
        expect(coloredDiv.textContent).toBe('HP')
    })

    it('Close pokemon card detail work correctly', async () => {
        const detailDiv = document.createElement('div')
        detailDiv.id = 'detail-card'
        document.body.appendChild(detailDiv)

        const closeBtn = screen.getByRole('img', { name: /close-icon/i }).parentElement
        await fireEvent.click(closeBtn)

        expect(detailDiv.style.display).toBe('none')
    })
})