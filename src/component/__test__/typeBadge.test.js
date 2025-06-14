import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from "vitest"

import TypeBadge from '../TypeBadge.vue'

describe("typeBage component ", () => {
    it("check display color and text correct", () => {
        render(TypeBadge, {
            props: {
                type: 'grass'
            }
        })

        const typeDiv = screen.getByText('GRASS').parentElement
        const coloredDiv = typeDiv.querySelector('div.bg-\\[\\#E3F0AF\\]')
        expect(coloredDiv).toBeTruthy()
        expect(coloredDiv.textContent).toBe('GRASS')
    })

    it("check display unknow type", () => {
        render(TypeBadge, {
            props: {
                type: 'unknow'
            }
        })

        const typeDiv = screen.getByText('UNKNOW').parentElement
        const coloredDiv = typeDiv.querySelector('div.bg-\\[\\#ffffff\\]')
        expect(coloredDiv).toBeTruthy()
        expect(coloredDiv.textContent).toBe('UNKNOW')
    })
})