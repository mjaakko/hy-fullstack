import React, { useState, useEffect } from 'react'

import { getAll, create, remove, update } from './services/Phonebook'

const Filter = ({ filter, setFilter }) => {
    return (
        <div>
          rajaa näytettäviä: <input value={ filter } onChange={event => setFilter(event.target.value)}/>
        </div>
    )
}

const Persons = ({ persons, setPersons, filter }) => {
    const filtered = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    return (<ul>
        {  
            filtered.map(person => <Person key={ person.id } persons={ persons } setPersons={ setPersons } {...person} />)
        }
    </ul>)
}

const Person = ({ id, name, number, setPersons, persons }) => (
    <li>{ name }{" - "}{ number }<button onClick={() => {
        const confirm = window.confirm(`Poista ${name}`)
        
        if (confirm) {
            remove(id).then(() => {
                setPersons(persons.filter(person => person.id !== id))
            })
        }
    }}>poista</button></li>
)

const PersonForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber }) => (
    <form onSubmit={(event) => {
        event.preventDefault();
        if (persons.filter(person => person.name === newName).length > 0) {
          const confirm = window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)

          if (confirm) {
            const id = persons.filter(person => person.name === newName)[0].id
            update(id, { id: id, name: newName, number: newNumber }).then(updatedPerson => 
                setPersons(persons.map(person => person.id !== id ? person : updatedPerson))
            )
            setNewName('');
          }
        } else {
            create({ name: newName, number: newNumber }).then(person => 
                setPersons(persons.concat(person))
            )
          setNewName('');
        }
    }}>
        <div>
            nimi: <input value={ newName } onChange={event => setNewName(event.target.value)}/>
        </div>
        <div>
            numero: <input value={ newNumber } onChange={event => setNewNumber(event.target.value)}/>
        </div>
        <div>
            <button type="submit">lisää</button>
        </div>
    </form>
)

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
      getAll()
        .then(persons => {
            setPersons(persons)
        })
  }, [])

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <PersonForm newName={ newName } 
        setNewName={ setNewName } 
        newNumber={ newNumber } 
        setNewNumber={ setNewNumber } 
        persons={ persons } 
        setPersons={ setPersons }/>
      <h2>Numerot</h2>
      <Filter filter={ filter } setFilter={ setFilter }/>
      <Persons persons={ persons } setPersons={ setPersons } filter={ filter }/>
    </div>
  )

}

export default App