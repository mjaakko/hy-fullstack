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

export const vote = id => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const addAnecdote = data => {
  return {
    type: 'ADD',
    data
  }
}

export const initializeAnecdotes = anecdotes => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}