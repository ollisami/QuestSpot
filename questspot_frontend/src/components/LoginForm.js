import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

import loginService from '../services/login'
import profileService from '../services/profiles'

import { setShowLogin } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import { userChange } from '../reducers/userReducer'

import ScoopedBoxFrame from './ScoopedBoxFrame'

import '../styles/LoginForm.css'
import '../styles/ScoopedFrame.css'


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

  // test text content for frames


  return (
    <div className="login-form">
      <div style={{maxWidth: '40em'}}>
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

          </Form.Group>
        </Form>
        <ScoopedBoxFrame radius={20} top='-2em' width='95%' height='20em' />
        <div style={{
          display: 'flex', marginLeft: '3em', marginRight: '3em'
        }}>
          <ScoopedBoxFrame id='canc' textContent='SUBMIT' radius={20}
            top='-10em' width='7em' type='submitButton' clickEvent={handleLogin} />
          <ScoopedBoxFrame id='canc' textContent='CANCEL' radius={20}
            top='-10em' width='7em' type='cancelButton' clickEvent={cancelLogin} />
        </div>
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