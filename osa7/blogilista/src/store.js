import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

import noticationReducer from './reducers/notification';
import blogReducer from './reducers/blog';
import userReducer from './reducers/user';

const reducer = combineReducers({
  notification: noticationReducer,
  blogs: blogReducer,
  user: userReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store