import React, { useEffect, useState } from 'react'

import ProjectModal from './ProjectModal.jsx'

import { get_projects } from '../api/read'
import { create_project } from '../api/create'

export default function Projects() {
  const [project, setProject] = useState({
    title: "",
    description: ""
  })

  const [showModal, setShowModal] = useState(false)
  const handleClose = () => setShowModal(false)
  const handleShow = () => setShowModal(true)

  function createProject() {
    create_project(project).then(res => {
      handleClose
    })
  }

  useEffect(() => {
    get_projects().then(res => {
      console.log("success")
    })
  }, [])


  return (
    <div className="projects">
      <div className="header d-flex justify-content-between align-items-center">
        <h1 className="my-2 h5">Projects</h1>        
        <div className="btn-group">
          <button className="btn btn-success" onClick={handleShow}>+</button>
        </div>
      </div>
      
      <ProjectModal show={showModal} handleClose={handleClose} setProject={setProject} createProject={createProject} />

    </div>
  )
}