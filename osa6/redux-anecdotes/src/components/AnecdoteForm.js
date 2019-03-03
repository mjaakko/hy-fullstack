import React from 'react'
import { connect } from 'react-redux'

import anecdoteService from '../services/anecdotes'

import { addAnecdote } from '../reducers/anecdoteReducer'
import { display } from '../reducers/notificationReducer'

const AnecdoteForm = ({ addAnecdote, display }) => {
  const add = async event => {
    event.preventDefault()
    const content = event.target.content.value
    const anecdote = await anecdoteService.createNew(content)
    addAnecdote(anecdote)
    display(`You created anecdote '${anecdote.connect}'`)
    event.target.content.value = ''
  }

  return (
  <>
    <h2>create new</h2>
    <form onSubmit={ add }>
        <div><input name='content'/></div>
        <button type='submit'>create</button>
    </form>
  </>)
}

const mapDispatchToProps = {
  addAnecdote, display
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)