import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'

import Notification from './components/Notification'
import Profiles from './components/Profiles'

import { setNotification } from './reducers/notificationReducer'
import { initializeProfiles } from './reducers/profilesReducer'

import './styles/App.css'
import logo from './resources/logo.png';
const App = (props) => {

  const { profiles } = props

  useEffect(() => {
    props.initializeProfiles()
  },[])

  return (
    <div className="container">
      <Router>
        <div>
          <div className="top-navi">
            <img src={logo} className="App-logo" alt="logo" />
            <Notification/>
          </div>
          <div className="main-content">
            <Route path="/profiles" render={() => <Profiles profiles={profiles} />} />
          </div>
        </div>
      </Router>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    profiles: state.profiles
  }
}

export default connect(
  mapStateToProps, {
    setNotification,
    initializeProfiles
  })(App)
