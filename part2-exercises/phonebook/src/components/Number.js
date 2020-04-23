import React from 'react'

const Number = ({ people, deleteCallBack }) => {
    return (
        <div>
            <h2>Numbers</h2>
            {people.map(person => <p key={person.name}>{person.name} {person.number} <button onClick={() => deleteCallBack(person.id)}>delete</button><br /></p>)}
        </div>
    )
}

export default Number