import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      const anecdote = state.find(anecdote => anecdote.id === action.data.id)
      const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
      
      const updatedAnecdotes = [ ...state.map(anecdote => anecdote.id !== action.data.id ? anecdote : updatedAnecdote) ]
      updatedAnecdotes.sort((a, b) => b.votes - a.votes)
      return updatedAnecdotes
    case 'ADD':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default reducer

export const vote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.vote(anecdote)
    console.log(updatedAnecdote)
    dispatch({
      type: 'VOTE',
      data: { id: updatedAnecdote.id }
    })
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD',
      newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}