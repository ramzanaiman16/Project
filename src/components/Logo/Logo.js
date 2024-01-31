import React from 'react'
import './logo.css'
import logo from '../Logo/icons/logo.svg';

const Logo = () => {
  return (
    <>
       <div className="logo-container">
      <img src={logo} alt="Your Logo" />
    </div>
    </>
  )
}

export default Logo
