import React, { useState } from 'react'

import { login_user } from '../api/auth'

export default function Login() {

  const [auth, setAuth] = useState({
    username: "",
    password: ""
  })

  function change_auth(property, event) {
    setAuth(state => {
      const newState = {...state}
      newState[property] = event.target.value

      return newState
    })
  }

  return (
    <form className="login container" onSubmit={e => login_user(e, auth)}>
      <div className="header mb-4">
        <h1 className='my-1 text-primary'>Login</h1>
        <p>Adventure awaits</p>
      </div>

      <div className='mb-4'>
        <label className='form-label'>Username</label>
        <input
        type="text"
        className="form-control"
        onChange={e => change_auth("username", e)}
        value={auth.username}
        />
      </div>

      <div className="mb-4">
        <label className="form-label">Password</label>
        <input
        type="password"
        className="form-control"
        onChange={e => change_auth("password", e)}
        value={auth.password}
        />
      </div>

      <div className="footer">
        <button type="submit" className="btn btn-primary d-block w-100">Log In</button>
      </div>
    </form>
  )
}