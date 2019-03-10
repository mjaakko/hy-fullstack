const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        default:
            return state
    }
}

export default notificationReducer

export const displayNotification = (notification, time) => {
    return dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: notification
        })
        setTimeout(() => dispatch({
            type: 'SET_NOTIFICATION',
            data: null
        }), time)
    }
}