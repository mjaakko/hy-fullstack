import React from 'react'

import { vote } from '../reducers/anecdoteReducer'
import { display } from '../reducers/notificationReducer'
import Filter from './Filter';

export default ({ store }) => (
    <>
        <h2>Anecdotes</h2>
        <Filter store={ store }/>
        {store.getState().anecdotes.filter(anecdote => anecdote.content.includes(store.getState().filter)).map(anecdote =>
        <div key={anecdote.id}>
            <div>
            {anecdote.content}
            </div>
            <div>
            has {anecdote.votes}
            <button onClick={() => { 
                store.dispatch(vote(anecdote.id))
                store.dispatch(display(`You voted ${anecdote.content}`))
            }}>vote</button>
            </div>
        </div>
        )}
    </>
)