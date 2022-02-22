import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home w-100 vh-100 d-flex justify-content-center align-items-center">
      <div className="content container p-4 text-center">
        <h1>Welcome to PlanUp</h1>
        <p>Manage projects, catgories, and tasks using PlanUp. Sign up now</p>

        <div className="btn-group d-flex align-items-center justify-content-center">
          <Link to="/user/register" className="rounded-pill py-3 px-5 bg-info text-light">Sign Up</Link>
          <span className="px-4 text-light">or</span>
          <Link to="/user/login" className="rounded-pill py-3 px-5 bg-info text-light">Log In</Link>
        </div>      
      </div>

    </div>
  )
}