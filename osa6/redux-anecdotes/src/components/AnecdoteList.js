import React from 'react'
import { connect } from 'react-redux'

import { vote } from '../reducers/anecdoteReducer'
import { display } from '../reducers/notificationReducer'
import Filter from './Filter';

const AnecdoteList = ({ anecdotes, vote, display }) => (
    <>
        <h2>Anecdotes</h2>
        <Filter/>
        { anecdotes.map(anecdote =>
        <div key={anecdote.id}>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => { 
                vote(anecdote)
                display(`You voted ${anecdote.content}`, 5)
            }}>vote</button>
            </div>
        </div>
        )}
    </>
)

const filteredAnecdotes = (anecdotes, filter) => anecdotes.filter(anecdote => anecdote.content.includes(filter))

const mapStateToProps = state => {
    return { anecdotes: filteredAnecdotes(state.anecdotes, state.filter) }
}

const mapDispatchToProps = {
    vote, display
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)