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

export const display = (content, time) => {
  return dispatch => {
    setTimeout(() => dispatch({ type: 'HIDE_NOTIFICATION' }), time * 1000);
    dispatch({
      type: 'DISPLAY_NOTIFICATION',
      data: content
    })
  }
}