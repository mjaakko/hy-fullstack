import blogService from '../services/blogs'
import loginService from '../services/login'
import { displayNotification } from './notification'

const userReducer = (state = null, action) => {
    switch(action.type) {
        case 'SET_USER':
            return action.data
        default: 
            return state
    }
}

export default userReducer

export const initializeUser = () => {
    const loggedUserJSON = window.localStorage.getItem('user')
    const user = JSON.parse(loggedUserJSON)

    if (loggedUserJSON) {
      blogService.setToken(user.token)
    }

    return dispatch => {
        dispatch({
            type: 'SET_USER',
            data: user
        })
    }
}

export const login = (username, password) => {
    return async dispatch => {
        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('user', JSON.stringify(user))

            dispatch(displayNotification(`logged in as ${user.name}`, 2500))
            blogService.setToken(user.token)
            dispatch({
                type: 'SET_USER',
                data: user
            })
        } catch (error) {
            dispatch(displayNotification('invalid username or password', 2500))
        }
    }
}

export const logout = () => {
    return dispatch => {
        window.localStorage.removeItem('user')
        blogService.setToken(null)
        dispatch({
            type: 'SET_USER',
            data: null
        })
    }
}