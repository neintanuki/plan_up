import React from 'react'
import { Outlet } from 'react-router-dom'


export default function User() {
  return (
    <div className="user vh-100 w-100 row">
      <div className="col-md-7 h-100 bg-primary"></div>
      <div className="col-md-5 d-flex align-items-center p-5">
        <Outlet />
      </div>
    </div>
  )
}