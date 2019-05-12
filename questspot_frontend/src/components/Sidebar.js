import React , { useState }  from 'react'
import { connect } from 'react-redux'
import { slide as Menu } from 'react-burger-menu'
import { Link, withRouter } from 'react-router-dom'
import Headroom from 'react-headroom'
import Authentication from './Authentication'
import { Button } from 'react-bootstrap'

import { setNotification } from '../reducers/notificationReducer'
import { userChange } from '../reducers/userReducer'
import { setShowLogin } from '../reducers/loginReducer'

import logo from '../resources/logo.png'
import '../styles/Sidebar.css'

const Sidebar = (props) => {
  const { user } = props
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleStateChange = (state) => {
    setIsMenuOpen(state.isOpen)
  }
  
  // This can be used to close the menu, e.g. when a user clicks a menu item
  const closeMenu = () => {
    setIsMenuOpen(false)
    window.scrollTo(0, 0)
  }

  const showLogIn = () => {
    closeMenu()
    props.setShowLogin(true)
  }

  //props.setShowLogin(true)

  const renderUsername = () => {
    if (user) {
      return (
        <Link className="menu-item" onClick={() => closeMenu()} to={`/profiles/${user.name}`}>
          {user.name}
        </Link>
      )
    }
    return (          
      <p>
        <Button variant="link" onClick={() => showLogIn()}>Log in</Button>
      </p>
    )
  }
  return (

    <div className="menu-background">
      <Menu isOpen={ isMenuOpen } onStateChange={(state) => handleStateChange(state)}>
        {renderUsername()}
        <Authentication />
        <Link className="menu-item" onClick={() => closeMenu()} to="/">
            Home
        </Link>
        <Link className="menu-item" onClick={() => closeMenu()} to="/profiles/">
            Search
        </Link>
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
  userChange,
  setShowLogin
})(Sidebar)

export default withRouter(ConnectedAuthentication)