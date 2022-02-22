import React from 'react'
import { Outlet } from 'react-router-dom'

export default function User() {
  return (
    <div className="user vh-100 w-100 row">
      <div className="left-section col-md-7 h-100 bg-primary"></div>
      <div className="col-md-5 d-flex align-items-center h-100 p-5 overflow-scroll">
        <Outlet />
      </div>
    </div>
  )
}