
/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import LastUpdateBadge from "../components/last-update-badge/last-update-badge.component";

describe('Home', () => {
    it('renders a heading', () => {
        render(<LastUpdateBadge lastUpdate={'10'}/>)

        const heading = screen.getByText(/بروزرسانی/)

        expect(heading).toBeInTheDocument()
    })
})