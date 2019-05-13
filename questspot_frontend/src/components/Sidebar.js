import React, { useState } from 'react'
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
      <Menu isOpen={isMenuOpen} onStateChange={(state) => handleStateChange(state)}>
        {renderUsername()}
        <Authentication />
        <Link className="menu-item" onClick={() => closeMenu()} to="/">
          Home
        </Link>
        <Link className="menu-item" onClick={() => closeMenu()} to="/profiles/">
          Search
        </Link>
      </Menu>
      <Headroom >
        <HeaderMenu props={props} alt={true} />
      </Headroom>
    </div>

  )
}

const HeaderMenu = ({ props, alt }) => {
  if (alt) return (
    <div className='headerBoxAlt' height='5em'>
      <svg id='headerBack' width='100%' height='5em'>
        <rect height='100%' width='100%' fill='#436151' />
        <rect height='4.8em' x='15%' width='70%' fill='#f0f0db' />
        <rect height='4.8em' width='100%' fill='#436151' y='-.2em' />
      </svg>

      <img src={logo} className='app-logo' alt="GuestSpot" />
      <div className="shortcuts">
        <Link className={`shortcut-item ${props.location.pathname === '/' ? 'selected' : 'not-selected'}`} to="/">
          <i className="far fa-newspaper"></i>
        </Link>

        <Link className={`shortcut-item ${props.location.pathname === '/profiles/' ? 'selected' : 'not-selected'}`} to="/profiles/">
          <i className="fas fa-search"></i>
        </Link>
      </div>

      <svg id='headerFront' width='100%' height='5em'>
        <mask id='maskBack' fill='#fff'>
          <rect id='boxBack' width='100%' height='4.8em' />
          <ellipse id='ellBack' fill='#000' cx='50%' cy='100%' rx='6.3em' ry='4.5em' />
        </mask>
        <use href='#boxBack' mask='url(#maskBack)' fill='#f0f0db' />

        <mask id='maskFront' fill='#fff'>
          <rect id='boxFront' width='100%' height='4.8em' />
          <ellipse id='ellFront' fill='#000' cx='50%' cy='100%' rx='6.5em' ry='4.7em' />
        </mask>
        <use href='#boxFront' mask='url(#maskFront)' fill='#436151' />
      </svg>
    </div>
  )


  return (
    <div className='headerBox' >
      <svg width='100%' height='5em'>
        <rect height='100%' width='100%' fill='#f0f0db' />
        <rect height='100%' width='100%' fill='#436151' y='-.2em' />
        <rect id='boxBack' width='100%' height='50%' />
        <ellipse id='ellBack' cx='50%' cy='30%' rx='7em' ry='70%' />
        <rect id='boxFront' width='100%' height='50%' />
        <ellipse id='ellFront' cx='50%' cy='30%' rx='6.8em' ry='70%' />
      </svg>
      <img src={logo} className='app-logo' alt="GuestSpot" />
    </div>
  )
}



/* Old header
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
*/


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