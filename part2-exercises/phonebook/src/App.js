import React, { useState, useEffect } from 'react'
import AddNew from './components/AddNew'
import Search from './components/Search'
import Number from './components/Number'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  useEffect(() => {
    personService.getAll()
    .then(initialData => {setPersons(initialData)})
  }, [])

  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ searchText, setNewSearchText] = useState('')
  const [ errorMessage, setErrorMessage] = useState(null)
  const [ messageState, setMessageState] = useState(null)

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.length !== 0 && persons.find(person => person.name === newName) !== undefined) {
      if (window.confirm(newName + ' is already added to the phonebook, replace the old number with a new one?')) {
        const temp = persons.find(person => person.name === newName)
        personService.update(temp.id, { ...temp, number: newNumber})
        .then(newPerson => {
          setPersons(persons.map(p => (p.id !== newPerson.id ? p : newPerson)))
          setNewName('')
          setNewNumber('')
          setErrorMessage(`Number changed for ${newPerson.name}`)
          setMessageState('success')
        })
        return
      }
      setNewName('')
    }
    const newPerson = {name: newName, number: newNumber}
    personService.create(newPerson)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setErrorMessage(`Added ${newPerson.name}`)
      setMessageState('success')
    })
    
  }

  const deletePerson = (id) => {
    personService.remove(id)
    .then(deletedPerson => {
      setPersons(persons.filter(person => person.id !== id))
    })
    .catch(error => {
      setErrorMessage(
        `Information of ${persons.find(person => person.id === id).name} has been removed from the server`
      )
      setMessageState('error')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }

  const search = () => persons.filter(person => person.name.toLowerCase().includes(searchText.toLowerCase()))


  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleSearchChange = (event) => setNewSearchText(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} className={messageState}/>
      <Search text={searchText} searchChangeCallBack={handleSearchChange} />
      <AddNew
        name={newName}
        number={newNumber}
        nameChangeCallBack={handleNameChange}
        numberChangeCallBack={handleNumberChange}
        addPersonCallBack={addPerson}
      />
      <Number 
        people={search()}
        deleteCallBack={deletePerson}
      />
    </div>
  )
}

export default App