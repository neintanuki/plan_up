import React, { useEffect } from "react"

// components
import Nav from '../components/Nav.jsx'
import Sidebar from '../components/Sidebar.jsx'

export default function Dashboard() {
  useEffect(() => {

  }, [])


	return (
		<section className="dashboard vh-100 bg-info">
      <Nav />

      <div className="body flex h-100 bg-danger">
        <Sidebar />
      </div>
    </section>
	)
}