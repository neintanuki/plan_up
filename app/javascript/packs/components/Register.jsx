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
    <form className="register p-4 w-10/12" onSubmit={e => register_user(e, auth)}>
      <div className="header mb-4">
        <h1 className='text-4xl font-semibold my-1 text-primary'>Register</h1>
        <p>This is a valid description</p>
      </div>

      <div className='mb-4'>
        <label className='block'>Username</label>
        <input
        type="text"
        className="border-2 border-primary/60 p-2 w-full block rounded"
        onChange={e => change_auth("username", e)}
        value={auth.username}
        />
      </div>

      <div className="mb-4">
        <label className="block">Password</label>
        <input
        type="password"
        className="border-2 border-primary/60 p-2 w-full block rounded"
        onChange={e => change_auth("password", e)}
        value={auth.password}
        />
      </div>

      <div className="mb-4">
        <label className="block">Confirm Password</label>
        <input
        type="password"
        className="border-2 border-primary/60 p-2 w-full block rounded"
        onChange={e => change_auth("confirm_password", e)}
        value={auth.confirm_password}
        />
      </div>

      <div className="footer">
        <button type="submit" className="bg-primary text-white p-4 w-full rounded">Log In</button>
      </div>
    </form>
  )
}