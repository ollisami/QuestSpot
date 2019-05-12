import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

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

  const redirectToRegisteration = () => {
    cancelLogin()
    props.history.push('/registration')
  }

  return (
    <div className="login-form">
      <div className="login-container">
        <ScoopedBoxFrame
        id="Background"
        radius={20}
        children = {
          <div className="login-fields">
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
              </Form.Group>
            </Form>
            <div className="login-form-button-container">
              <ScoopedBoxFrame 
                id='submit' 
                textContent='Log in' 
                radius={20}
                primaryColor="#436151"
                clickEvent={handleLogin}
                type="box"
              />
              <ScoopedBoxFrame
                id='signup'
                textContent='Sign up'
                radius={20}
                primaryColor="#f37863"
                clickEvent={redirectToRegisteration} />
            </div>
            <Button variant="link" onClick={cancelLogin}>Cancel</Button>
          </div>
        }
        />
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

export default withRouter(ConnectedLoginForm)