import React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'react-bootstrap'

import { setNotification } from '../reducers/notificationReducer'

import '../styles/Notification.css'

const Notification = (props) => {
  if (!props.notification) return null

  return (
    <div className="notification-container" onClick={ () => props.setNotification(null)}>
      <Alert variant="success" className="notification-content">
        {props.notification}
      </Alert>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNotification = connect(mapStateToProps,
  { setNotification }
)(Notification)

export default ConnectedNotification
