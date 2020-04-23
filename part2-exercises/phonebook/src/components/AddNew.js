import React from 'react'

const AddNew = ({ name, number, nameChangeCallBack, numberChangeCallBack, addPersonCallBack}) => {
    return (
        <div>
            <h2>add a new</h2>
            <form onSubmit={addPersonCallBack}>
              <div>
                name: <input value={name} onChange={nameChangeCallBack}/><br />
                number: <input value={number} onChange={numberChangeCallBack} />
              </div>
              <div>
                <button type='submit'>add</button>
              </div>
            </form>
        </div>
    )
}

export default AddNew