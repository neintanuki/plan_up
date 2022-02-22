import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { GlobalContext } from './Global.jsx'

export default function PrivateRoute({ children }) {
  const { authStatus } = useContext(GlobalContext)

  switch (authStatus) {
    case 'fulfilled':
      return children
      break
    case 'rejected':
      return <Navigate to="/user/login" />
      break
    default:
      return null
  }

}