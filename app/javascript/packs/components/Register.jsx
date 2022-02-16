import React, { useState } from 'react'

import { register_user } from '../api/auth'

export default function Register() {

  const [auth, setAuth] = useState({
    username: "",
    password: "",
    confirm_password: ""
  })

  function change_auth(property, event) {
    setAuth(state => {
      const newState = {...state}
      newState[property] = event.target.value

      return newState
    })
  }


  return (
    <form className="register container" onSubmit={e => register_user(e, auth)}>
      <div className="header mb-4">
        <h1 className='my-1 text-primary'>Register</h1>
        <p>This is a valid description</p>
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

      <div className="mb-4">
        <label className="form-label">Confirm Password</label>
        <input
        type="password"
        className="form-control"
        onChange={e => change_auth("confirm_password", e)}
        value={auth.confirm_password}
        />
      </div>

      <div className="footer">
        <button type="submit" className="btn btn-primary p-3 w-100">Log In</button>
      </div>
    </form>
  )
}