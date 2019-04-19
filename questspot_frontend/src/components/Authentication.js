import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

import LoginForm from './LoginForm'

import loginService from '../services/login'

import { setNotification } from '../reducers/notificationReducer'
import { userChange } from '../reducers/userReducer'

import '../styles/Authentication.css'

const Authentication = (props) => {

  const [username, setUsername]  = useState('')
  const [password, setPassword]  = useState('')
  const [showLogin, setShowLogin]  = useState(false)
  const { user } = props

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedQuestspotUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.userChange(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username:username, password:password
      })
      console.log('user', user)
      window.localStorage.setItem(
        'loggedQuestspotUser', JSON.stringify(user)
      )

      props.userChange(user)
      setUsername('')
      setPassword('')
      props.setNotification(`Welcome ${user.name}!`)

    } catch (exception) {
      props.setNotification('Invalid username or password')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedQuestspotUser')
    props.userChange('')
    setUsername('')
    setPassword('')
    setShowLogin(false)
    props.setNotification('Logged out')
  }

  const cancelLogin = () => {
    setShowLogin(false)
  }

  const loginInformation = () => {
    if (!user) {
      if (showLogin) {
        return (
          <LoginForm
            handleCancel={cancelLogin}
            setUsername={setUsername}
            setPassword={setPassword}
            handleSubmit={handleLogin}
          />
        )
      } else {
        return (
          <p>
            <Button variant="link" onClick={() => setShowLogin(true)}>Log in</Button>
          </p>
        )
      }
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
    notification: state.notification,
    user: state.user
  }
}

const ConnectedAuthentication = connect(mapStateToProps, {
  setNotification,
  userChange
})(Authentication)

export default ConnectedAuthentication
