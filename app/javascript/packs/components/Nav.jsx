import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { GlobalContext } from './Global.jsx'

import { logout } from '../api/auth'

import log_out_icon from 'images/log-out.svg'

export default function Nav() {
  const { userUsername, setUserUsername } = useContext(GlobalContext)
  let navigate = useNavigate()

  function handleLogout() {
    logout().then(res => {
      console.log(res)
      setUserUsername("")
      navigate('/user/login')
    })
  }

  return (
    <header className="navbar container-fluid bg-light px-4 py-2 position-fixed top-0 left-0 shadow">
      <div className="container-fluid d-flex justify-content-between">
        <div className="navbar-brand">
          <span>Plan Up</span>
        </div>

        <div className="navbar-profile d-flex align-items-center">
          <span>Hi, { userUsername }</span>
          <span className="line mx-2"></span>
          <span onClick={handleLogout}><img src={log_out_icon} alt="logout" /></span>
        </div>        
      </div>

    </header>
  )
}