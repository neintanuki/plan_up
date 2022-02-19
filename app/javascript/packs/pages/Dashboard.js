import React, { useEffect, useState, createContext } from "react"

// components
import Nav from '../components/Nav.jsx'
import Sidebar from '../components/Sidebar.jsx'
import Tasks from '../components/Tasks.jsx'

export const ListContext = createContext()

export default function Dashboard() {
  const [list, setList] = useState({
    projects: [],
    categories: []
  })

  const [selectedId, setSelectedId] = useState({
    project: ""
  })

	return (
    <ListContext.Provider value={{list, setList, selectedId, setSelectedId}}>
  		<section className="dashboard vh-100 bg-info">
        <Nav />

        <div className="body d-flex h-100 bg-danger">
          <Sidebar />
          <Tasks />

        </div>
      </section>
    </ListContext.Provider>
	)
}