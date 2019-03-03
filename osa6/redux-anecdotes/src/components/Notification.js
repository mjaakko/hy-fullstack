import React from 'react';

import { hide } from '../reducers/notificationReducer'

const Notification = ({ store }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (!store.getState().notification) {
    return null
  }

  setTimeout(() => store.dispatch(hide()), 5000)
  return (
    <div style={style}>
      { store.getState().notification }
    </div>
  )
}

export default Notification
