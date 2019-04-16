import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({
  handleSubmit,
  setUsername,
  setPassword
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>käyttäjätunnus</Form.Label>
          <Form.Control
            type="text"
            placeholder="username"
            onChange={(event) => setUsername(event.target.value)}
          />
          <Form.Label>Salasana</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <br></br>
          <Button variant="primary" type="submit">kirjaudu</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default LoginForm