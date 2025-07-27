import React from 'react'
import { useState, useEffect } from 'react'
import personsService from './services/persons.js'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import Alert from './components/Alert.jsx'
import Filter from './components/Filter.jsx'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 }
    ])

    useEffect(() => {
        personsService.getAll()
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    const [newFilter, setNewFilter] = useState('')
    const [newAlert, setNewAlert] = useState({ message: null, isError: true })


    const handleFilterChange = (event) => {
        const newFilterVal = event.target.value
        setNewFilter(newFilterVal)


    }
    const handleDelete = (id) => {
        console.log(`deleting ${id}`)
        if (window.confirm('Delete ' + persons.find(p => p.id === id).name + '?')) {
            const personObj = persons.find(p => p.id === id)
            personsService.remove(id)
                .then(() => {
                    setNewAlert({ message: `Deleted ${personObj.name}`, isError: false })
                    setPersons(persons.filter((val) => {
                        return val.id !== id
                    }))
                    console.log('Person should be removed')
                    setTimeout(() => {
                        setNewAlert({ message: null, isError: false })
                    }, 5000)
                })
                .catch(() => {
                    console.log('person isn\'t in the db anymore')
                    setPersons(persons.filter((val => {
                        return val.id !== id
                    })))
                    setNewAlert({
                        message: `Information of ${persons.find(p => p.id === id).name} has already been removed from the server`,
                        isError: true
                    })

                    setTimeout(() => {
                        setNewAlert({ message: null, isError: false })
                    }, 5000)
                })
        } else {
            console.log('Aborted deleting')
        }


    }

    const handleSubmit = (newName, newPhone) => {
        const newPerson = {
            name: newName,
            number: newPhone,

        }
        let objExists = false
        for (let i = 0; i < persons.length; i++) {
            if (persons[i].name === newPerson.name) {
                objExists = true
                break
            }
        }

        if (objExists) {
            const originalPerson = persons.find(person => newPerson.name === person.name)
            const updatedPerson = { ...originalPerson, number: newPerson.number }

            if (window.confirm(`${updatedPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
                personsService.update(updatedPerson.id, updatedPerson)
                    .then(response => {
                        setPersons(persons.map((person) => {
                            return person.id !== response.data.id ? person : response.data
                        }))

                        setNewAlert({ message: 'Value was updated', isError: false })

                        setTimeout(() => {
                            setNewAlert({ message: null, isError: false })
                        }, 5000)
                    })
            } else {
                console.log('Aborted update')
            }

        } else {
            personsService.create(newPerson)
                .then(response => {
                    setPersons(persons.concat(response.data))
                    setNewAlert({ message: `Value was added ${response.data.name}`, isError: false })

                    setTimeout(() => {
                        setNewAlert({ message: null, isError: false })
                    }, 5000)
                })
                .catch(error => {
                    setNewAlert({ message: error.response.data.error, isError: true })

                    setTimeout(() => {
                        setNewAlert({ message: null, isError: false })
                    }, 5000)
                })


        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Alert alert={newAlert}/>
            <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>

            <PersonForm handleSubmit={handleSubmit}/>
            <Persons newFilter={newFilter} persons={persons} handleDelete={(id) => handleDelete(id)}/>
        </div>
    )
}

export default App