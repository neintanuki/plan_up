import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { login_user } from '../api/auth'
import Errors from './Errors.jsx'

import { GlobalContext } from './Global.jsx'

export default function Login() {
  const { setUserUsername, setAuthStatus } = useContext(GlobalContext)
  let navigate = useNavigate()

  const [auth, setAuth] = useState({
    username: "",
    password: ""
  })

  const [errors, setErrors] = useState({
    username: [],
    password: []
  })

  function change_auth(property, event) {
    setAuth(state => {
      const newState = {...state}
      newState[property] = event.target.value

      return newState
    })
  }

  function handleLogin(e) {
    login_user(e, auth).then(res => {
      const { username } = res.data
      setUserUsername(username)
      setAuthStatus("fulfilled")
      navigate("/dashboard")
    }).catch(err => {
      const { errors } = err.response.data
      let errorTemplate = {
        username: [],
        password: []
      }
      errorTemplate = {
        ...errorTemplate,
        ...errors
      }

      setErrors(errorTemplate)
    })
  }

  return (
    <form className="login container" onSubmit={handleLogin}>
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

      <div className="footer">
        <button type="submit" className="btn btn-primary d-block w-100">Log In</button>
      </div>
    </form>
  )
}