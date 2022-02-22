import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { ListContext } from '../pages/Dashboard'
import { GlobalContext } from './Global.jsx'

import { logout } from '../api/auth'

export default function Nav() {
  const { list } = useContext(ListContext)
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

        <nav className="navbar-nav flex flex-row">
          {
            list.projects.map(project => {
              return (
                <div className="project-item nav-item mx-4" key={project.id}>
                  { project.title }
                </div>
              )
            })

          }        
        </nav>

        <div className="navbar-profile">
          <span>Hi, { userUsername }</span>
          <span className="line"></span>
          <span onClick={handleLogout}><img src="" alt="logout" /></span>
        </div>        
      </div>

    </header>
  )
}