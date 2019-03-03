const initialState = null

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'DISPLAY_NOTIFICATION':
      return action.data
    case 'HIDE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export default reducer

export const display = content => {
  return {
    type: 'DISPLAY_NOTIFICATION',
    data: content
  }
}

export const hide = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}
