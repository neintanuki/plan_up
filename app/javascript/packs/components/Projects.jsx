import React, { useEffect, useState, useContext } from 'react'

import ProjectModal from './ProjectModal.jsx'

import { get_projects } from '../api/read'
import { create_project } from '../api/create'
import { edit_project } from '../api/edit'

import { ListContext } from '../pages/Dashboard'

export default function Projects() {
  const [project, setProject] = useState({
    title: "",
    description: ""
  })
  const [edit, setEdit] = useState(false)

  const { list, setList } = useContext(ListContext)

  const [showModal, setShowModal] = useState(false)
  const handleClose = () => setShowModal(false)

  function handleShow(isEdit) {
    setEdit(isEdit)
    setShowModal(true)
  }

  function createProject() {
    create_project(project).then(res => {
      handleClose
    })
  }

  function editProject() {
    edit_project(project).then(res => {
      handleClose
    })
  }

  function handleEdit(project_id, title, description) {
    setProject(() => {
      return { project_id, title, description }
    })

    handleShow(true)
  }

  function handleSubmit() {
    if (edit) {
      editProject()
    } else {
      createProject()
    }
  }

  useEffect(() => {
    get_projects().then(res => {
      const { data } = res.data
      console.log(res)
      setList(state => {
        return {
          ...state,
          projects: data
        }
      })
    })
  }, [])


  return (
    <div className="projects">
      <div className="header d-flex justify-content-between align-items-center">
        <h1 className="my-2 h5">Projects</h1>        
        <div className="btn-group">
          <button className="btn btn-success" onClick={() => handleShow(false)}>+</button>
        </div>
      </div>

      <div className="content">
        {
          list.projects.map(project => {
            return (
              <div className="project-item my-1 d-flex justify-content-between" key={project.id}>
                <span>
                  { project.title }
                </span>

                <div className="btn-group">
                  <button
                  className="btn-btn-success"
                  onClick={() => handleEdit(project.id, project.title, project.description)}>edit</button>
                  <button className="btn btn-success">-</button>
                </div>
              </div>
            )
          })
        }
      </div>
      
      <ProjectModal show={showModal} handleClose={handleClose} project={project} setProject={setProject} handleSubmit={handleSubmit} onEdit={edit} />

    </div>
  )
}