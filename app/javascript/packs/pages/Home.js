import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="home">
      <h1>This is your homepage</h1>
      <Link to='/user/login'>Login</Link>
    </div>
  )
}