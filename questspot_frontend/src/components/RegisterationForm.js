import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Form, FormControl, Image } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { useLastLocation } from 'react-router-last-location'
import ReactTags from 'react-tag-autocomplete'
import ScoopedBoxFrame from './ScoopedBoxFrame'

import ImageUpload from './ImageUpload'
import UserTypeForm from './UserTypeForm'
import UserInfoForm from './UserInfoForm'
import UserLocationFrom from './UserLocationForm'
import UserProfileInfoForm from './UserProfileInfoForm'

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
  const states = ['Type', 'UserInfo', 'Location',  'ImageUpload', 'ProfileInfo']
  const [type, setType]  = useState('')

  const [username, setUsername]  = useState('')
  const [password, setPassword]  = useState('')
  const [name, setName]  = useState('')
  const [email, setEmail]  = useState('')

  const [address, setAddress]  = useState('')
  const [postalcode, setPostalcode]  = useState('')
  const [city, setCity]  = useState('')
  const [country, setCountry]  = useState('')

  const [ pictures, setPictures ] = useState([])

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
      tags: tagList,
      images: pictures
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

  const addPictures = (newPictures) => {
    if(newPictures.length === 0) {
      props.setNotification('Please add images')
      return
    }
    setPictures(newPictures)
    setNextState()
  }

  const imageUpload = () => {
    if (states[state] !== 'ImageUpload') return null
    return (
      <ImageUpload addPictures = {addPictures} />
    )
  }



  return (
    <div className="registeration-form">
      <UserTypeForm 
        setType = {setType}
        state = {states[state]}
        type = {type}
        validateType = {validateType}
      />
      <UserInfoForm
        state = {states[state]}
        username = {username}
        setUsername = {setUsername}
        password = {password}
        setPassword = {setPassword}
        name = {name}
        setName = {setName}
        email = {email}
        setEmail = {setEmail}
        validateUserInfo = {validateUserInfo}
        setPrevState = {setPrevState}
        backgroundDiv = {backgroundDiv}
      />

      <UserLocationFrom
        state = {states[state]}
        address = {address}
        setAddress = {setAddress}
        postalCode = {postalcode}
        setPostalcode = {setPostalcode}
        city = {city}
        setCity = {setCity}
        country = {country}
        setCountry = {setCountry}
        validateLocation = {validateLocation}
        setPrevState = {setPrevState}
        backgroundDiv = {backgroundDiv}
      />
      
      {imageUpload()}
      
      <UserProfileInfoForm
        state = {states[state]}
        tags = {tags}
        suggestions = {suggestions}
        handleDelete = {handleDelete}
        handleAddition = {handleAddition}
        addProfile = {addProfile}
        description = {description}
        setDescription = {setDescription}
        setPrevState = {setPrevState}
        backgroundDiv = {backgroundDiv}
      />
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