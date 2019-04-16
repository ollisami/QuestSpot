import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'

import LoginForm from './LoginForm'

import loginService from '../services/login'

import { setNotification } from '../reducers/notificationReducer'
import { userChange } from '../reducers/userReducer'

const Authentication = (props) => {

  const [username, setUsername]  = useState('')
  const [password, setPassword]  = useState('')
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

    } catch (exception) {
      props.setNotification('käyttäjätunnus tai salasana virheellinen')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedQuestspotUser')
    props.userChange('')
    setUsername('')
    setPassword('')
    props.setNotification('Uloskirjautuminen onnistui')
  }

  const loginInformation = () => {
    if (!user) return (
      <LoginForm
        setUsername={setUsername}
        setPassword={setPassword}
        handleSubmit={handleLogin}
      />
    )
    return (
      <p>
        {user.name} logged in&nbsp;
        <Button variant="link" onClick={() => handleLogout()}>logout</Button>
      </p>
    )
  }

  return (
    <div>
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
