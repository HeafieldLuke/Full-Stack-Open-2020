import React from 'react'

const Search = ({text, searchChangeCallBack}) => {
    return (
        <div>
          filter shown with <input value={text} onChange={searchChangeCallBack}/>
        </div>
    )
}

export default Search