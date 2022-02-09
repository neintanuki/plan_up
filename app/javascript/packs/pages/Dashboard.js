import React from "react"

// components
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'

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