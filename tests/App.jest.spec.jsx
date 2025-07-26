import React from 'react'
import { render, screen } from '@testing-library/react'
import { act } from 'react'
import App from '../src/App.jsx'
import '@testing-library/jest-dom'

describe('Visual tests', () => {
    it('Is filter present', async () => {
        await act(async () => {
            render(<App/>)
        })
        expect(screen.getByText('Phonebook')).toBeVisible()
    })
    it('Is Form present', async () => {
        await act(async () => {
            render(<App/>)
        })
        expect(screen.getByText('add a new')).toBeVisible()
    })
    it('Is Phonebook present', async () => {
        await act(async () => {
            render(<App/>)
        })
        expect(screen.getByText('Numbers')).toBeVisible()
    })
})
