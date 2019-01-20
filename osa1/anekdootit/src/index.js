import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = props => (
    <button onClick={ props.handleClick }>
        { props.text }
    </button>
)

const Anecdote = props => (
    <div>
        <p>{ props.anecdote }</p>
        <p>{ props.votes }{ " votes" }</p>
    </div>
)

const App = props => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))

    const selectRandom = () => {
        setSelected(Math.floor(Math.random() * props.anecdotes.length))
    }

    const vote = () => {
        const votesCopy = [ ...votes ]
        votesCopy[selected] += 1
        setVotes(votesCopy)
    }

    const maxVotesIndex = votes.indexOf(Math.max(...votes))

    return (
        <div>
            <h2>{"Anecdote"}</h2>
            <Anecdote anecdote={props.anecdotes[selected]} votes={votes[selected]}/>
            <Button text="Next" handleClick={selectRandom}/>
            <Button text="Vote" handleClick={vote}/>
            <h2>{"Anecdote with most votes"}</h2>
            <Anecdote anecdote={props.anecdotes[maxVotesIndex]} votes={votes[maxVotesIndex]}/>
        </div>
    )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)