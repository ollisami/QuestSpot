import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

import '../styles/LoginForm.css'

const LoginForm = ({
  handleCancel,
  handleSubmit,
  setUsername,
  setPassword
}) => {
  return (
    <div className="login-form">
      <Form onSubmit={handleSubmit} className="overlay-content">
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
          <Button variant="danger" onClick={handleCancel} className="loginform-button">Cancel</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default LoginForm