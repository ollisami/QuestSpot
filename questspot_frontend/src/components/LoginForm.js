import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

import loginService from '../services/login'
import profileService from '../services/profiles'

import { setShowLogin } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { userChange } from '../reducers/userReducer'

import '../styles/LoginForm.css'

const LoginForm = (props) => {

  if (!props.showLogin) return null

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username, password: password
      })
      console.log('user', user)
      window.localStorage.setItem(
        'loggedQuestspotUser', JSON.stringify(user)
      )

      props.userChange(user)
      profileService.setToken(user.token)
      setUsername('')
      setPassword('')
      props.setNotification(`Welcome ${user.name}!`)
      props.setShowLogin(false)

    } catch (exception) {
      props.setNotification('Invalid username or password')
    }
  }

  const cancelLogin = () => {
    props.setShowLogin(false)
  }

  return (
    <div className="login-form">
      <Form onSubmit={handleLogin} className="overlay-content">
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <br></br>
          <Button variant="primary" type="submit" className="loginform-button">Submit</Button>
          <Button variant="danger" onClick={cancelLogin} className="loginform-button">Cancel</Button>

        </Form.Group>
      </Form>
      <div className="scoopedBox">
        <svg>
          <mask id='m' fill='#fff'>
            <rect id='b' width='100%' height='100%'/>
            <circle id='c' r='50' fill='#000'/>
            <use href='#c' x='100%'/>
            <use href='#c' y='100%'/>
            <use href='#c' x='100%' y='100%'/>
          </mask>
          <use href='#b' mask='url(#m)'/>
        </svg>
        <p>SCOOPITY SCOOP</p>
      </div>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    showLogin: state.showLogin,
  }
}

const ConnectedLoginForm = connect(mapStateToProps,
  {
    setShowLogin,
    setNotification,
    userChange
  }
)(LoginForm)

export default ConnectedLoginForm