import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Button, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useLastLocation } from 'react-router-last-location'
import ReactTags from 'react-tag-autocomplete'

import tagService from '../services/tags'
import { setNotification } from '../reducers/notificationReducer'

import '../styles/RegisterationForm.css'

const RegisterationForm = (props) => {

  const [state, setState]  = useState(0)
  const states = ['Type', 'UserInfo', 'Location', 'ProfileInfo']
  const [type, setType]  = useState('')

  const [username, setUsername]  = useState('')
  const [password, setPassword]  = useState('')
  const [name, setName]  = useState('')
  const [email, setEmail]  = useState('')

  const [address, setAddress]  = useState('')
  const [postalcode, setPostalcode]  = useState('')
  const [city, setCity]  = useState('')
  const [country, setCountry]  = useState('')

  const [description, setDescription]  = useState('')
  const [tags, setTags]  = useState([])

  const [suggestions, setSuggestions] = useState([])

  const previousUrl = useLastLocation() ? useLastLocation() : "/"

  useEffect(() => {
    getSuggestionsFromServer()
  },[])

  const getSuggestionsFromServer = async () => {
    let suggestionList = await tagService.getAll()
    suggestionList = suggestionList.map((s, index) => { return { id: index, name: s }})
    setSuggestions(suggestionList)
  }

  const handleDelete = (i) => {
    const newTags = tags.slice(0)
    newTags.splice(i, 1)
    setTags(newTags)
  }

  const handleAddition = (tag) => {
    const newTags = [].concat(tags, tag)
    setTags(newTags)
  }

  const clampState = (val) => {
    if (val < 0) return 0
    return val >= states.length ? states.length : val
  }

  const setNextState = () =>
    setState(clampState(state + 1))
  

  const setPrevState = () => {
    setState(clampState(state - 1))
  }
  
  
    /*
    const addBlog = async (event) => {
      event.preventDefault()
      const blogObject = {
        title: newTitle.value,
        author: newAuthor.value,
        url: newUrl.value,
        likes: 0,
      }
  
      const newBlog = await blogService.create(blogObject)
      props.createBlog(newBlog)
      props.setNotification(`a new blog ${newTitle.value} by ${newAuthor.value} added`)
      newTitle.reset()
      newAuthor.reset()
      newUrl.reset()
    }*/

    const validateType = () => {
      if (type)
        setNextState()
      else  props.setNotification('Please select profile type')
    }

    const validateUserInfo = () => {
      //Add better validation here (Check username is available, email is in right format etc)
      if (username && password && name && email) 
        setNextState()
      else  props.setNotification('Please fill all required fields')
    }

    const validateLocation = () => {
      //Add better validation here (Check username is available, email is in right format etc)
      if (address && postalcode && city && country) 
        setNextState()
      else  props.setNotification('Please fill all required fields')
    }

    const typeForm = () => {
      if (states[state] !== 'Type') return null

      return (
        <div>
          <p>I am:</p>
          <div className="flex-div">
            <div className="col">
              <Button
                className={`type-button ${(type === 'Artist' ? 'type-selected ' : 'type-not-selected')}`}
                variant="outline-success"
                onClick={() => setType('Artist')}>
                <i className="fas fa-palette"></i>
              </Button>
              <p>Artist</p>
            </div>
            <div className="col">
              <Button
                className={`type-button ${(type === 'Studio' ? 'type-selected ' : 'type-not-selected')}`}
                variant="outline-success"
                onClick={() => setType('Studio')}>
                <i className="fas fa-home"></i>
              </Button>
              <p>Studio</p>
            </div>
          </div>
          <Button variant="danger" className="registeration-button" onClick={setPrevState}>
            <i className="fas fa-chevron-left"></i>
            &nbsp; Back
          </Button>
          <Button variant="primary" type="button" className="registeration-button" onClick={validateType}>
            Next &nbsp; 
            <i className="fas fa-chevron-right"></i>
          </Button>
        </div>
      )
    }

    const userInfoForm = () => {
      if (states[state] !== 'UserInfo') return null

      return (
        <div>
          <FormControl
            className="registeration-input"
            type="text"
            placeholder="username"
            defaultValue={username ? username : ""}
            onChange={(event) => setUsername(event.target.value)}
          />
          <FormControl
            className="registeration-input"
            type="password"
            placeholder="Password"
            defaultValue={password ? password : ""}
            onChange={(event) => setPassword(event.target.value)}
          />
          <FormControl
            className="registeration-input"
            type="text"
            placeholder="Name"
            defaultValue={name ? name : ""}
            onChange={(event) => setName(event.target.value)}
          />
          <FormControl
            className="registeration-input"
            type="email"
            placeholder="Email"
            defaultValue={email ? email : ""}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Button variant="danger" className="registeration-button" onClick={setPrevState}>
              <i className="fas fa-chevron-left"></i>
              &nbsp; Back
            </Button>
            <Button variant="primary" type="submit" className="registeration-button" onClick={validateUserInfo}>
              Next &nbsp; 
              <i className="fas fa-chevron-right"></i>
            </Button>
          </div>
      )
    }     
  
    const locationForm = () => {
      if (states[state] !== 'Location') return null

      return (
        <div>
          <FormControl
            className="registeration-input"
            type="text"
            placeholder="Address"
            defaultValue={address ? address : ""}
            onChange={(event) => setAddress(event.target.value)}
          />
          <FormControl
            className="registeration-input"
            type="text"
            placeholder="Postal Code"
            defaultValue={postalcode ? postalcode : ""}
            onChange={(event) => setPostalcode(event.target.value)}
          />
          <FormControl
            className="registeration-input"
            type="text"
            placeholder="City"
            defaultValue={city ? city : ""}
            onChange={(event) => setCity(event.target.value)}
          />
          <FormControl
            className="registeration-input"
            type="text"
            placeholder="Country"
            defaultValue={country ? country : ""}
            onChange={(event) => setCountry(event.target.value)}
          />
          <Button variant="danger" className="registeration-button" onClick={setPrevState}>
              <i className="fas fa-chevron-left"></i>
              &nbsp; Back
            </Button>
            <Button variant="primary" type="submit" className="registeration-button" onClick={validateLocation}>
              Next &nbsp; 
              <i className="fas fa-chevron-right"></i>
            </Button>
          </div>
      )
    } 

    const profileInfoForm = () => {
      if (states[state] !== 'ProfileInfo') return null

      return (
        <div>
          <ReactTags
            tags={tags}
            suggestions={suggestions}
            handleDelete={handleDelete.bind(this)}
            handleAddition={handleAddition.bind(this)}
            autofocus={false}
            placeholder={'Add tag'}
            addOnBlur={true}
            allowNew={true}

          />
          <Form.Group>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Description"
              defaultValue={description ? description : ""}
              onChange={(event) => setDescription(event.target.value)}
             />
          </Form.Group>

          <Button variant="danger" className="registeration-button" onClick={setPrevState}>
              <i className="fas fa-chevron-left"></i>
              &nbsp; Back
            </Button>
            <Button variant="primary" type="submit" className="registeration-button" onClick={setNextState}>
              Next &nbsp; 
              <i className="fas fa-chevron-right"></i>
            </Button>
          </div>
      )
    } 

    return (
      <div className="registeration-form">
        <p>Registeration</p>
        {typeForm()}
        {userInfoForm()}
        {locationForm()}
        {profileInfoForm()}
        <Link to={previousUrl}>Cancel</Link>
      </div>
    )
  }
  
  const ConnectedRegisterationForm = connect(
    null, { setNotification }
  )(RegisterationForm)
  
  export default ConnectedRegisterationForm