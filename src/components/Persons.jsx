import React from 'react'
import Person from './Person.jsx'

const Persons = ({ persons, newFilter, handleDelete }) => {
    return (
        <div>
            <h2>Numbers</h2>
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

export default Persons