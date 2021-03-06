const initialState = ''

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'SET_FILTER':
      return action.data
    default:
      return state
  }
}

export default reducer

export const setFilter = content => {
  return {
    type: 'SET_FILTER',
    data: content
  }
}