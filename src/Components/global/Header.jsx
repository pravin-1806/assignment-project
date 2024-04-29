import React from 'react'
import Logo from './assets/solver-logo.png'
import "./Header.css"

const header = () => {

  return (
    <div>
      <header>
        <img src={Logo} alt="logo-img" className="logo"/>
      </header>
    </div>
  )
}

export default header
