import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Notification from './components/Notification'
import Profiles from './components/Profiles'
import Profile from './components/Profile'
import Sidebar from './components/Sidebar'
import LoginForm from './components/LoginForm'

import { setNotification } from './reducers/notificationReducer'
import { initializeProfiles } from './reducers/profilesReducer'

import './styles/App.css'
import logo from './resources/logo.png'

const App = (props) => {
  const { profiles } = props

  useEffect(() => {
    props.initializeProfiles()
  },[])

  const profileByUsername = (username) =>
    profiles.find(prof => prof.username === username)

  return (
    <div id="App">
      <LoginForm/>
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'App'} />
      <div className="container" id="container">
        <Router>
          <div id="page-wrap">
            <div className="top-navi">
              <img src={logo} className="App-logo" alt="logo" />
              <Notification/>
            </div>
            <div className="main-content">
              <Route exact path="/profiles/" render={() =>
                <Profiles profiles={profiles} />} />
              <Route path="/profiles/:username" render={({ match }) =>
                <Profile profile={profileByUsername(match.params.username)} />} />
            </div>
          </div>
        </Router>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    profiles: state.profiles
  }
}

export default connect(
  mapStateToProps, {
    setNotification,
    initializeProfiles
  })(App)
