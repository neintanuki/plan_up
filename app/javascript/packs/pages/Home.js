import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home">
      <h1>Welcome to PlanUp</h1>
      <p>Manage projects, catgories, and tasks using PlanUp. Sign up now</p>

      <div className="btn-group">
        <a href="">Sign Up</a>
        <span>or</span>
        <a href="">Log In</a>
      </div>
    </div>
  )
}