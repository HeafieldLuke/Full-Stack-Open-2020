import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Country = ({ country }) => {
  useEffect(() => {
    axios.get()
  }, [])
  return (
    <div>
      <h2>{country.name}</h2>
      <div>
        capital {country.capital} <br />
        population {country.population}
      </div>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt='flag' height='100px' width='200px' />
      <h3>Weather in {country.capital}</h3>

    </div>
  )
}

const CountryView = ({ filteredCountries }) => {
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  else if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />
  }
  else {
    return (
    <div>
      {filteredCountries.map(country => <p>{country.name} <button onClick={() => 'hi'}>show</button><br/></p>)}
    </div>)
  }
}

const App = () => {
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])
  const [ countries, setCountries ] = useState([])
  const [ searchText, setSearchText ] = useState('')

  return (
    <div>
      find countries <input value={searchText} onChange={(event) => setSearchText(event.target.value)} />
      <CountryView filteredCountries={countries.filter(country => country.name.toLowerCase().includes(searchText.toLowerCase()))} />
    </div>
  )
}



export default App;
