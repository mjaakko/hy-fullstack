import React from 'react';
import { connect } from 'react-redux'

import { hide } from '../reducers/notificationReducer'

const Notification = ({ notification, hide }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  if (!notification) {
    return null
  }

  setTimeout(hide, 5000)
  return (
    <div style={style}>
      { notification }
    </div>
  )
}

const mapStateToProps = state => {
  return { notification: state.notification }
}

const mapDispatchToProps = {
  hide
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
