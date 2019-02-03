import React, { useState, useEffect } from 'react';

const Country = ({ name, capital, population, languages, flag }) => (
  <div>
  <h1>{ name }</h1>
  <p>Capital { capital }</p>
  <p>Population { population }</p>
  <h2>Languages</h2>
  <ul>
    { languages.map(language => <li key={language.iso639_2}>{ language.name }</li>)}
  </ul>
  <img src={ flag }></img>
  </div>
)

const App = () => {
  const [ countries, setCountries ] = useState([]);
  const [ filter, setFilter ] = useState('');

  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
      .then(json => setCountries(json))
  }, []);
  
  
  const filtered = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
  const count = filtered.length

  return (
    <div>
      <form>
        <div>
        find Countries: <input value={ filter } onChange={event => setFilter(event.target.value)}/>
        </div>
      </form>
      { count > 10 && <p>Too many results</p>}
      { (count > 1 && count <= 10) && <ul>
        { filtered.map(country => <li key={ country.alpha3Code }>{ country.name }</li>)}
      </ul>}
      { count === 1 && <Country {...filtered[0]}/>}
    </div>
    )
}

export default App;
