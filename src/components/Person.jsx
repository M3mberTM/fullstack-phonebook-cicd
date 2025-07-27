import React from 'react'

const Person = ({ name, number, handleDelete }) => {
    const divStyle = {
        marginRight: '5px'
    }
    return (
        <li>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={divStyle}>{name}</div>
                <div style={divStyle}>{number}</div>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </li>
    )
}

export default Person