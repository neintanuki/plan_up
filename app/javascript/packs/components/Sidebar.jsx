import React from "react"

import Projects from "./Projects.jsx"

export default function Sidebar() {
  return (
	  <div className="sidebar col-md-3 h-100 bg-primary px-4">
      <Projects />
    </div>
	)
}