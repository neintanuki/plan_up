import React, { useContext } from "react"

import Projects from "./Projects.jsx"
import Categories from "./Categories.jsx"

import { ListContext } from '../pages/Dashboard'


export default function Sidebar() {
  const { selectedId } = useContext(ListContext)

  return (
	  <div className="sidebar col-md-3 h-100 bg-light">
      <Projects />

      { selectedId.project && <Categories /> }
    </div>
	)
}