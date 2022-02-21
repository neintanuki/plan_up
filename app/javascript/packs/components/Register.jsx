import React, { useState } from 'react'

import { register_user } from '../api/auth'
import Errors from './Errors.jsx'

export default function Register() {

  const [auth, setAuth] = useState({
    username: "",
    password: "",
    confirm_password: ""
  })
  const [errors, setErrors] = useState({
    username: [],
    password: [],
    confirm_password: []    
  })

  function change_auth(property, event) {
    setAuth(state => {
      const newState = {...state}
      newState[property] = event.target.value

      return newState
    })
  }

  function register(e) {
    register_user(e, auth).then(res => {
      console.log(res)
      alert("Account Created")
      window.location.href = "/user/login"
    }).catch(err => {
      const { errors } = err.response.data
      let errorTemplate = {
        username: [],
        password: [],
        confirm_password: []
      }
      errorTemplate = {
        ...errorTemplate,
        ...errors
      }

      setErrors(errorTemplate)
    })
  }


  return (
    <form className="register container" onSubmit={register}>
      <div className="header mb-4">
        <h1 className='my-1 text-primary'>Register</h1>
        <p>Register for free</p>
      </div>

      <div className='mb-4'>
        <label className='form-label'>Username</label>
        <input
        type="text"
        className="form-control"
        onChange={e => change_auth("username", e)}
        value={auth.username}
        />
        <Errors errors={errors.username} />
      </div>

      <div className="mb-4">
        <label className="form-label">Password</label>
        <input
        type="password"
        className="form-control"
        onChange={e => change_auth("password", e)}
        value={auth.password}
        />
        <Errors errors={errors.password} />
      </div>

      <div className="mb-4">
        <label className="form-label">Confirm Password</label>
        <input
        type="password"
        className="form-control"
        onChange={e => change_auth("confirm_password", e)}
        value={auth.confirm_password}
        />
        <Errors errors={errors.confirm_password} />
      </div>

      <div className="footer">
        <button type="submit" className="btn btn-primary p-3 w-100">Register</button>
      </div>
    </form>
  )
}