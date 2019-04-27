import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location'

import Notification from './components/Notification'
import Profiles from './components/Profiles'
import Profile from './components/Profile'
import News from './components/News'
import Sidebar from './components/Sidebar'
import LoginForm from './components/LoginForm'
import RegisterationForm from './components/RegisterationForm'

import { setNotification } from './reducers/notificationReducer'
import { initializeProfiles } from './reducers/profilesReducer'
import { initializeNews } from './reducers/newsReducer'

import './styles/App.css'
import logo from './resources/logo.png'

const App = (props) => {
  const { profiles, news } = props

  useEffect(() => {
    props.initializeProfiles()
  },[])

  useEffect(() => {
    props.initializeNews()
  },[])

  const profileByUsername = (username) =>
    profiles.find(prof => prof.username === username)

  const splitFilters = (filters) =>
    filters.split(';')

  return (
    <div id="App">
      <LoginForm/>
      <Sidebar pageWrapId={'page-wrap'} outerContainerId={'App'} />
      <div className="container" id="container">
        <Router>
          <LastLocationProvider>
            <div id="page-wrap">
              <div className="top-navi">
                <img src={logo} className="App-logo" alt="logo" />
                <Notification/>
              </div>
              <div className="main-content">
                <Route exact path="/" render={() =>
                  <News news={news} />} />
                <Route exact path="/profiles/" render={() =>
                  <Profiles profiles={profiles} />} />
                <Route exact path="/profiles/:filters" render={({ match }) =>
                  <Profiles profiles={profiles} filters={splitFilters(match.params.filters)} />} />
                <Route path="/profile/:username" render={({ match }) =>
                  <Profile profile={profileByUsername(match.params.username)} />} />
                <Route exact path="/registeration/" render={() =>
                  <RegisterationForm />} />
              </div>
            </div>
          </LastLocationProvider>
        </Router>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    profiles: state.profiles,
    news: state.news
  }
}

export default connect(
  mapStateToProps, {
    setNotification,
    initializeProfiles,
    initializeNews
  })(App)
