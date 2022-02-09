import React from 'react'

export default function Login() {
  return (
    <form className="login p-4 w-10/12">
      <div className="header mb-4">
        <h1 className='text-4xl font-semibold my-1 text-primary'>Login</h1>
        <p>Adventure awaits</p>
      </div>

      <div className='mb-4'>
        <label className='block'>Username</label>
        <input type="text" className="border-2 border-primary/60 p-2 w-full block rounded"/>
      </div>

      <div className="mb-4">
        <label className="block">Password</label>
        <input type="password" className="border-2 border-primary/60 p-2 w-full block rounded"/>
      </div>

      <div className="footer">
        <button type="submit" className="bg-primary text-white p-4 w-full rounded">Log In</button>
      </div>
    </form>
  )
}