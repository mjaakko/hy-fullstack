import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = props => (
    <button onClick={ props.handleClick }>
        { props.text }
    </button>
)

const Statistics = props => (
    <tr>
        <td>{ props.name }</td>
        <td>{ props.value }</td>
    </tr>
)

const PercentageStatistics = props => (
    <Statistics name={ props.name } value={ (props.value / props.total)+"%" }></Statistics>
)

const Stats = props => {
    const total = props.good + props.neutral + props.bad
    
    if (total === 0) {
        return (<p>Ei palautetta</p>)
    }

    return (
        <table>
            <tbody>
                <Statistics name="Hyviä" value={ props.good }></Statistics>
                <Statistics name="Neutraaleja" value={ props.neutral }></Statistics>
                <Statistics name="Huonoja" value={ props.bad }></Statistics>
                <Statistics name="Yhteensä" value={ total }></Statistics>
                <Statistics name="Keskiarvo" value={ (props.good + -1*props.bad) / total }></Statistics>
                <PercentageStatistics name="Positiivisia" value={ props.good } total={ total }></PercentageStatistics>
            </tbody>
        </table>
    )
}

const App = () => { 
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h2>Anna palautetta</h2>
            <div>
                <Button handleClick={() => setGood(good +1)} text="Hyvä"/>
                <Button handleClick={() => setNeutral(neutral +1)} text="Neutraali"/>
                <Button handleClick={() => setBad(bad +1)} text="Huono"/>
            </div>
            <h2>Tulokset</h2>
            <Stats good={ good } neutral={ neutral } bad={ bad }/>
        </div>
    )
}

ReactDOM.render(<App />, 
    document.getElementById('root')
)