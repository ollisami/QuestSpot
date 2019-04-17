import React from "react"
import { slide as Menu } from 'react-burger-menu'

import '../styles/Sidebar.css'

const Sidebar = (props) => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>

      <a className="menu-item" href="/burgers">
        Search
      </a>

      <a className="menu-item" href="/pizzas">
        Pizzas
      </a>

      <a className="menu-item" href="/desserts">
        Desserts
      </a>
    </Menu>
  )
}

export default Sidebar