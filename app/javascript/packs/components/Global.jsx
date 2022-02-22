import React, { useState, useEffect, createContext } from 'react'

import { status } from '../api/auth'

export const GlobalContext = createContext()

export default function Global({ children }) {
  const [userUsername, setUserUsername] = useState("")
  const [authStatus, setAuthStatus] = useState("pending")

  useEffect(() => {
    status().then(res => {
      setAuthStatus("fulfilled")
    }).catch(err => {
      setAuthStatus("rejected")
    })
  }, [])

  return (
    <GlobalContext.Provider value={{userUsername, setUserUsername, authStatus, setAuthStatus}}>
      { children }
    </GlobalContext.Provider>
  )
}