import React from "react"
import { connect } from 'react-redux'
import { slide as Menu } from 'react-burger-menu'

import Authentication from './Authentication'

import { setNotification } from '../reducers/notificationReducer'
import { userChange } from '../reducers/userReducer'

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

        <a className="menu-item" href="/profiles">
          Search
        </a>
      </Menu>
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

export default ConnectedAuthentication