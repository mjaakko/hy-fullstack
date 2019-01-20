import React from 'react'
import ReactDOM from 'react-dom'

const Header = props => (
  <h1>{ props.title }</h1>
)

const Part = props => (
  <p>{ props.part } { props.exercises }</p>
)

const Content = props => {
  console.log(props)
  return props.parts.map(part => <Part part={part.part} 
exercises={part.exercises}/>);
}

const Total = props => (
  <p>yhteensä { props.parts.reduce((acc, current) => acc + 
current.exercises, 0) } tehtävää</p>
)

const App = () => {
  const data = {
    course: 'Half Stack -sovelluskehitys',
    parts: [
      { 
        part: 'Reactin perusteet',
        exercises: 10
      },
      {
        part: 'Tiedonvälitys propseilla',
        exercises: 7
      },
      { 
        part: 'Komponenttien tila',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header title={ data.course } />
      <Content parts={ data.parts } />
      <Total parts={ data.parts } />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
