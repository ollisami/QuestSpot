import React from 'react'
import { connect } from 'react-redux'
import { slide as Menu } from 'react-burger-menu'
import { Link, withRouter } from 'react-router-dom'
import Headroom from 'react-headroom'
import Authentication from './Authentication'

import { setNotification } from '../reducers/notificationReducer'
import { userChange } from '../reducers/userReducer'

import logo from '../resources/logo.png'
import '../styles/Sidebar.css'

const Sidebar = (props) => {
  const { user } = props

  const renderUsername = () => {
    if (user) {
      return (
        <a className="menu-item" href={`/profiles/${user.name}`}>
          {user.name}
        </a>
      )
    }
    return null
  }
  return (

    <div className="menu-background">
      <Menu>
        {renderUsername()}
        <Authentication />
        <a className="menu-item" href="/">
            Home
        </a>
        <a className="menu-item" href="/profiles/">
            Search
        </a>
      </Menu>
      <Headroom>
        <div className="top-container">
          <img src={logo} className="app-logo" alt="QuestSpot" />
        </div>
        <div className="shortcuts">
          <Link className={`shortcut-item ${props.location.pathname === '/' ? 'selected' : 'not-selected'}`} to="/">
            <i className="far fa-newspaper"></i>
          </Link>

          <Link className={`shortcut-item ${props.location.pathname === '/profiles/' ? 'selected' : 'not-selected'}`} to="/profiles/">
            <i className="fas fa-search"></i>
          </Link>
        </div>
      </Headroom>
    </div>

  )
}
const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    user: state.user
  }
}

const ConnectedAuthentication = connect(mapStateToProps, {
  setNotification,
  userChange
})(Sidebar)

export default withRouter(ConnectedAuthentication)