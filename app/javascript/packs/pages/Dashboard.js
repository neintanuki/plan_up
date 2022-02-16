import React from "react"

// components
import Nav from '../components/Nav.jsx'
import Sidebar from '../components/Sidebar.jsx'

export default function Dashboard() {
	return (
		<section className="dashboard">
      <Nav />

      <div className="body flex relative h-body">
        <Sidebar />
      </div>
    </section>
	)
}