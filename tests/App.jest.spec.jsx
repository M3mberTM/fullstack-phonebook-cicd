import React from 'react'
import { render, screen } from '@testing-library/react'
import { act } from 'react'
import '@testing-library/jest-dom'
import Filter from '../src/components/Filter.jsx'
import PersonForm from '../src/components/PersonForm.jsx'
import Persons from '../src/components/Persons.jsx'
import Person from '../src/components/Person.jsx'

const nullFunc = () => null
describe('Visual tests', () => {
    it('Is filter present', async () => {
        await act(async () => {
            render(<Filter newFilter={''} handleFilterChange={nullFunc()}/> )
        })
        expect(screen.getByText('filter show with')).toBeVisible()
    })
    it('Is Form present', async () => {
        await act(async () => {
            render(<PersonForm handleSubmit={nullFunc()}/> )
        })
        expect(screen.getByText('add a new')).toBeVisible()
    })
    it('Is Phonebook present', async () => {
        await act(async () => {
            render(<Persons newFilter={''} persons={[]} handleDelete={nullFunc()}/>)
        })
        expect(screen.getByText('Numbers')).toBeVisible()
    })
})

describe('Functional tests', () => {
    const persons = [
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 }
    ]
    it ('Singular person information', async () => {
        await act(async () => {
            render(<Person name={'Arto Hellas'} number={'040888'} handleDelete={nullFunc()}/> )
        })

        expect(screen.getByText('Arto Hellas')).toBeVisible()
        expect(screen.getByText('040888')).toBeVisible()
    })

    it('All people are rendered', async () => {
        await act(async () => {
            render(<Persons newFilter={''} persons={persons} handleDelete={nullFunc()}/> )
        })

        expect(screen.getByText('Arto Hellas')).toBeVisible()
        expect(screen.getByText('Ada Lovelace')).toBeVisible()
        expect(screen.getByText('Dan Abramov')).toBeVisible()
    })

    it('Filtering', async () => {
        await act(async () => {
            render(<Persons newFilter={'Arto'} persons={persons} handleDelete={nullFunc()}/> )
        })

        expect(screen.getByText('Arto Hellas')).toBeVisible()
        expect(screen.queryByText('Ada Lovelace')).toBeNull()
        expect(screen.queryByText('Dan Abramov')).toBeNull()
    })
})