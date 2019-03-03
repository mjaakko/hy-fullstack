import React from 'react'

import { addAnecdote } from '../reducers/anecdoteReducer'
import { display } from '../reducers/notificationReducer'

export default ({ store }) => {
  const add = event => {
    event.preventDefault()
    const content = event.target.content.value
    store.dispatch(addAnecdote(content))
    store.dispatch(display(`You created anecdote '${content}'`))
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