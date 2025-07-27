import React from 'react'
import { useState } from 'react'

const PersonForm = ({ handleSubmit }) => {
    const [newName, setNewName] = useState('')
    const [newPhone, setNewPhone] = useState('')

    const handleForm = (event) => {
        event.preventDefault()
        handleSubmit(newName, newPhone)
        setNewName('')
        setNewPhone('')
    }
    return (
        <form>
            <h2>add a new</h2>
            <div>
                name: <input value={newName} onChange={(event) => setNewName(event.target.value)}/>
            </div>
            <div>number: <input value={newPhone} onChange={(event) => setNewPhone(event.target.value)}/></div>
            <div>
                <button type="submit" onClick={handleForm}>add</button>
            </div>
        </form>
    )
}

export default PersonForm