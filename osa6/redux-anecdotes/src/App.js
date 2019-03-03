import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

import { initializeAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'

const App = ({ initializeAnecdotes }) => {
    useEffect(() => {
      anecdoteService.getAll().then(anecdotes =>
        initializeAnecdotes(anecdotes)
      )
    }, [])

    return (<>
      <Notification/>
      <div>
        <AnecdoteForm/>
        <AnecdoteList/>
      </div>
    </>)
}

export default connect(null, { initializeAnecdotes })(App)
