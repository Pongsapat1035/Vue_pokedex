import { render, screen } from '@testing-library/vue'
import Card from '../Card.vue'
import { describe, it, expect } from "vitest"


describe("Card component", () => {
    it("renders props correctly", () => {
        render(Card, {
            props: {
                name: "Bulbasaur",
                id: "001",
                imgUrl: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
                types: [{ type: { name: "grass" } }, { type: { name: "poison" } }]
            }
        })

        expect(screen.getByText("#001")).toBeTruthy()
        expect(screen.getByText("Bulbasaur")).toBeTruthy()
        expect(screen.getByRole('img').src).toContain("bulbasaur.jpg")
        // Check for type badges (the text will be uppercase)
        expect(screen.getByText("GRASS")).toBeTruthy()
        expect(screen.getByText("POISON")).toBeTruthy()
    })
})
