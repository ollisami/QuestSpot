import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

import profileService from '../services/profiles'

import { setNotification } from '../reducers/notificationReducer'
import { userChange } from '../reducers/userReducer'
import { setShowLogin } from '../reducers/loginReducer'

import '../styles/Authentication.css'

const Authentication = (props) => {
  const { user } = props

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedQuestspotUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.userChange(user)
      profileService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedQuestspotUser')
    props.userChange('')
    props.setNotification('Logged out')
    profileService.setToken('')
  }

  const loginInformation = () => {
    if (!user) {
      return (
        <p>
          <Button variant="link" onClick={() => props.setShowLogin(true)}>Log in</Button>
        </p>
      )
    }
    return (
      <p>
        <Button variant="link" onClick={() => handleLogout()}>logout</Button>
      </p>
    )
  }

  return (
    <div className="authentication-container">
      {loginInformation()}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const ConnectedAuthentication = connect(mapStateToProps, {
  setNotification,
  userChange,
  setShowLogin
})(Authentication)

export default ConnectedAuthentication
