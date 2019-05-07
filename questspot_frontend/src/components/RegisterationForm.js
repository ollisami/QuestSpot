import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, Button, FormControl } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { useLastLocation } from 'react-router-last-location'
import ReactTags from 'react-tag-autocomplete'

import tagService from '../services/tags'
import profileService from '../services/profiles'
import loginService from '../services/login'

import { setNotification } from '../reducers/notificationReducer'
import { userChange } from '../reducers/userReducer'

import artistBG from '../resources/artist_bg.jpg'
import studioBG from '../resources/studio_bg.jpg'
import formBG from '../resources/form_bg.jpg'
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

  const previousUrl = useLastLocation() ? useLastLocation() : '/'
  const [registerationDone, setRegisterationDone] = useState(false)

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

  const handleAddition = (input) => {
    var t = []
    input.name
      .split(' ')
      .map((s, index) => { return { id: index, name: s }})
      .forEach(tag => {
        t.push(tag)
      })
    t = t.concat(tags)
    setTags(t)
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

  const addProfile = async (event) => {
    event.preventDefault()
    const tagList = tags.map(tag => tag.name)
    const profileObject = {
      type: type,
      username: username,
      password: password,
      name: name,
      email: email,
      address: address,
      postalCode: postalcode,
      city: city,
      country: country,
      description: description,
      tags: tagList
    }
    try {
      const newProfile = await profileService.create(profileObject)
      props.setNotification(`a new profile ${newProfile.username} added`)

      //Move this to extacted login!
      const user = await loginService.login({
        username:username, password:password
      })
      window.localStorage.setItem(
        'loggedQuestspotUser', JSON.stringify(user)
      )

      props.userChange(user)
      profileService.setToken(user.token)
      setRegisterationDone(true)

    } catch (exception) {
      props.setNotification('User creation failed. Try again later')
    }
  }

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
    //Add better validation here
    if (address && postalcode && city && country)
      setNextState()
    else  props.setNotification('Please fill all required fields')
  }

  const backgroundDiv = (child) => {
    return (
      <div className="bg-image-container">
        <div className="bg-image " style={ { backgroundImage: `url(${formBG})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat', }}>
          <div className="bg-image-overlay"/>
        </div>
        {child}
      </div>
    )
  }

  const typeForm = () => {
    if (states[state] !== 'Type') return null

    return (
      <div>
        <div className='type-button' onClick={() => setType('Artist')}>
          <img src={artistBG} className="type-button-image" alt="Artist" />
          <p className="artist">Artist</p>
          <div className="type-button-overlay" />
        </div>
        <div className='type-button' onClick={() => setType('Studio')}>
          <img src={studioBG} className="type-button-image" alt="Studio" />
          <p className="studio">Studio</p>
          <div className="type-button-overlay" />
        </div>
        {type && <Button variant="primary" type="button" className="registeration-button" onClick={validateType}>
          Next &nbsp;
          <i className="fas fa-chevron-right"></i>
        </Button>}
      </div>
    )
  }

  const userInfoForm = () => {
    if (states[state] !== 'UserInfo') return null

    return (
      backgroundDiv(
        <div className="input-form">
          <FormControl
            className="registeration-input"
            type="text"
            placeholder="username"
            defaultValue={username ? username : ''}
            onChange={(event) => setUsername(event.target.value)}
          />
          <FormControl
            className="registeration-input"
            type="password"
            placeholder="Password"
            defaultValue={password ? password : ''}
            onChange={(event) => setPassword(event.target.value)}
          />
          <FormControl
            className="registeration-input"
            type="text"
            placeholder="Name"
            defaultValue={name ? name : ''}
            onChange={(event) => setName(event.target.value)}
          />
          <FormControl
            className="registeration-input"
            type="email"
            placeholder="Email"
            defaultValue={email ? email : ''}
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
    )
  }

  const locationForm = () => {
    if (states[state] !== 'Location') return null

    return (
      backgroundDiv(
        <div className="input-form">
          <FormControl
            className="registeration-input"
            type="text"
            placeholder="Address"
            defaultValue={address ? address : ''}
            onChange={(event) => setAddress(event.target.value)}
          />
          <FormControl
            className="registeration-input"
            type="text"
            placeholder="Postal Code"
            defaultValue={postalcode ? postalcode : ''}
            onChange={(event) => setPostalcode(event.target.value)}
          />
          <FormControl
            className="registeration-input"
            type="text"
            placeholder="City"
            defaultValue={city ? city : ''}
            onChange={(event) => setCity(event.target.value)}
          />
          <FormControl
            className="registeration-input"
            type="text"
            placeholder="Country"
            defaultValue={country ? country : ''}
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
    )
  }

  const profileInfoForm = () => {
    if (states[state] !== 'ProfileInfo') return null

    return (
      backgroundDiv(
        <div className="input-form">
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
          <Form onSubmit={addProfile}>
            <Form.Group>
              <Form.Control
                as="textarea"
                rows="3"
                placeholder="Description"
                defaultValue={description ? description : ''}
                onChange={(event) => setDescription(event.target.value)}
              />
              <Button variant="danger" className="registeration-button" onClick={setPrevState}>
                <i className="fas fa-chevron-left"></i>
              &nbsp; Back
              </Button>
              <Button variant="primary" type="submit" className="registeration-button">
              Next &nbsp;
                <i className="fas fa-chevron-right"></i>
              </Button>
            </Form.Group>
          </Form>
        </div>
      )
    )
  }

  return (
    <div className="registeration-form">
      {typeForm()}
      {userInfoForm()}
      {locationForm()}
      {profileInfoForm()}
      {registerationDone &&  <Redirect to={previousUrl}/>}
    </div>
  )
}

const ConnectedRegisterationForm = connect(
  null, {
    setNotification,
    userChange
  }
)(RegisterationForm)

export default ConnectedRegisterationForm