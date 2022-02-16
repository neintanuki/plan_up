import React from 'react'

export default function Nav() {
  return (
    <header className="navbar container-fluid bg-primary px-4 py-2 position-fixed top-0 left-0">
      <div className="container-fluid d-flex justify-content-between">
        <div className="navbar-brand">
          <span>Plan Up</span>
        </div>

        <nav className="navbar-nav flex flex-row">
          <span className="mx-4 nav-item">Plan 1</span>
          <span className="mx-4 nav-item">Plan 2</span>
          <span className="mx-4 nav-item">Plan 3</span>        
        </nav>

        <div className="navbar-profile">
          <span>Profile</span>
        </div>        
      </div>

    </header>
  )
}