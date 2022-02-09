import React from 'react'
import { Outlet } from 'react-router-dom'


export default function User() {
  return (
    <div className="user flex w-screen h-screen">
      <div className="left-side bg-primary w-7/12 h-100">

      </div>
      <div className="right-side w-5/12 h-100 flex justify-center items-center">
        <Outlet />
      </div>
    </div>
  )
}