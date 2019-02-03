import React, { useState } from 'react'

const Filter = ({ filter, setFilter }) => {
    return (
        <div>
          rajaa näytettäviä: <input value={ filter } onChange={event => setFilter(event.target.value)}/>
        </div>
    )
}

const Persons = ({ persons, filter }) => {
    const filtered = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

    return (<ul>
        {  
            filtered.map(person => <Person key={ person.name } {...person} />)
        }
    </ul>)
}

const Person = ({ name, number }) => (
    <li>{ name }{" - "}{ number }</li>
)

const PersonForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber }) => (
    <form onSubmit={(event) => {
        event.preventDefault();
        if (persons.filter(person => person.name === newName).length > 0) {
          alert(`${newName} on jo luettelossa`)
        } else {
          setPersons(persons.concat({ name: newName, number: newNumber }));
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
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

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
      <Persons persons={ persons } filter={ filter }/>
    </div>
  )

}

export default App