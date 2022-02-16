import React, { useEffect, useState, createContext } from "react"

// components
import Nav from '../components/Nav.jsx'
import Sidebar from '../components/Sidebar.jsx'

export const ListContext = createContext()

export default function Dashboard() {
  const [list, setList] = useState({
    projects: []
  })

	return (
    <ListContext.Provider value={{list, setList}}>
  		<section className="dashboard vh-100 bg-info">
        <Nav />

        <div className="body flex h-100 bg-danger">
          <Sidebar />
        </div>
      </section>
    </ListContext.Provider>
	)
}