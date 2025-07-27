import React from 'react'

const Alert = ({ alert }) => {
    const error = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    const notif = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
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
        return null
    }
}

export default Alert
