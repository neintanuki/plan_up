import React from 'react'

export default function Nav() {
  return (
    <header className="navbar bg-green-300 px-6 flex justify-between items-center h-header">
      <div className="navbar-brand">
        <span>Plan Up</span>
      </div>

      <nav className="navbar-nav flex">
        <span className="mx-4">Plan 1</span>
        <span className="mx-4">Plan 2</span>
        <span className="mx-4">Plan 3</span>        
      </nav>

      <div className="navbar-profile">
        <span>Profile</span>
      </div>
    </header>
  )
}