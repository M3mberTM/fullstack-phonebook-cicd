import {useState, useEffect} from 'react'
import axios from "axios";
import personsService from './services/persons.js';


const Filter = ({newFilter, handleFilterChange}) => {
    return (
        <div>filter show with <input value={newFilter} onChange={handleFilterChange}/></div>
    )
}


const Alert = ({alert}) => {
    const error = {
        color: "red",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const notif = {
        color: "green",
        background: "lightgrey",
        fontSize: 20,
        borderStyle: "solid",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    if (alert.message !== null) {
        return (
            <div style={alert.isError ? error : notif}>
                {alert.message}
            </div>
        )
    } else {
        return (
            <div>

            </div>
        )
    }

}

const PersonForm = ({newName, handleNameChange, newPhone, handlePhoneChange, handleSubmit}) => {
    return (
        <form>
            <div>
                name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>number: <input value={newPhone} onChange={handlePhoneChange}/></div>
            <div>
                <button type="submit" onClick={handleSubmit}>add</button>
            </div>
        </form>
    )
}

const Persons = ({persons, newFilter, handleDelete}) => {
    return (
        <div>
            <ul>
                {persons.map((person) => {
                    if (person.name.toLowerCase().includes(newFilter.toLowerCase())) {
                        return <Person key={person.id} name={person.name} number={person.number}
                                       handleDelete={() => handleDelete(person.id)}/>
                    }

                })}
            </ul>
        </div>
    )
}

const Person = ({name, number, handleDelete}) => {
    return (
        <li>
            {name} {number}
            <button onClick={handleDelete}>Delete</button>

        </li>
    )
}
const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3}
    ])

    useEffect(() => {
        console.log('effect')
        personsService.getAll()
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }, [])
    console.log('render', persons.length, 'notes')

    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')
    const [newFilter, setNewFilter] = useState('')
    const [newAlert, setNewAlert] = useState({message: null, isError: true})


    const handleFilterChange = (event) => {
        const newFilterVal = event.target.value
        setNewFilter(newFilterVal)


    }
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handlePhoneChange = (event) => {
        setNewPhone(event.target.value)
    }

    const handleDelete = (id) => {
        console.log(`deleting ${id}`)
        if (window.confirm("Delete " + persons.find(p => p.id === id).name + "?")) {
            const personObj = persons.find(p => p.id === id)
            personsService.remove(id)
                .then(response => {
                    setNewAlert({message: `Deleted ${personObj.name}`, isError: false})
                    setPersons(persons.filter((val) => {
                        return val.id !== id
                    }))
                    console.log('Person should be removed')
                    setTimeout(() => {
                        setNewAlert({message: null, isError: false})
                    }, 5000)
                })
                .catch(error => {
                    console.log("person isn't in the db anymore")
                    setPersons(persons.filter((val => {
                        return val.id !== id
                    })))
                    setNewAlert({
                        message: `Information of ${persons.find(p => p.id === id).name} has already been removed from the server`,
                        isError: true
                    })

                    setTimeout(() => {
                        setNewAlert({message: null, isError: false})
                    }, 5000)
                })
        } else {
            console.log("Aborted deleting")
        }


    }

    const handleSubmit = (event) => {
        event.preventDefault()
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
            const updatedPerson = {...originalPerson, number: newPerson.number}

            if (window.confirm(`${updatedPerson.name} is already added to the phonebook, replace the old number with a new one?`)) {
                personsService.update(updatedPerson.id, updatedPerson)
                    .then(response => {
                        console.log("value was updated")
                        setPersons(persons.map((person) => {
                            return person.id !== response.data.id ? person : response.data
                        }))
                        setNewName('')
                        setNewPhone('')

                        setNewAlert({message: 'Value was updated', isError: false})

                        setTimeout(() => {
                            setNewAlert({message: null, isError: false})
                        }, 5000)
                    })
            } else {
                console.log("Aborted update")
            }

        } else {
            personsService.create(newPerson)
                .then(response => {
                    setPersons(persons.concat(response.data))
                    setNewName('')
                    setNewPhone('')
                    setNewAlert({message: `Value was added ${response.data.name}`, isError: false})

                    setTimeout(() => {
                        setNewAlert({message: null, isError: false})
                    }, 5000)
                })
                .catch(error => {
                    setNewAlert({message: error.response.data.error, isError: true})

                    setTimeout(() => {
                        setNewAlert({message: null, isError: false})
                    }, 5000)
                })


        }
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <Alert alert={newAlert}/>
            <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>

            <h2>add a new</h2>
            <PersonForm handleSubmit={handleSubmit} handleNameChange={handleNameChange}
                        handlePhoneChange={handlePhoneChange} newName={newName} newPhone={newPhone}/>
            <h2>Numbers</h2>
            <Persons newFilter={newFilter} persons={persons} handleDelete={(id) => handleDelete(id)}/>
        </div>
    )
}

export default App