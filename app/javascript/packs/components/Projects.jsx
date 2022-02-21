import React, { useEffect, useState, useContext } from 'react'

import ProjectModal from './ProjectModal.jsx'
import DeleteModal from './DeleteModal.jsx'

import { get_projects, get_categories } from '../api/read'
import { create_project } from '../api/create'
import { edit_project } from '../api/edit'
import { delete_project } from '../api/delete'

import { ListContext } from '../pages/Dashboard'

import edit_icon from 'images/edit.svg'
import add from 'images/plus-square.svg'
import remove from 'images/x-square.svg'

export default function Projects() {
  const [project, setProject] = useState({
    title: "",
    description: "",
    id: ""
  })
  const [edit, setEdit] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const closeDeleteModal = () => setDeleteModal(false)
  const showDeleteModal = () => setDeleteModal(true)

  const [showModal, setShowModal] = useState(false)
  const handleClose = () => setShowModal(false)

  const { list, setList, selectedId, setSelectedId } = useContext(ListContext)

  function handleShow(isEdit) {
    setEdit(isEdit)
    setShowModal(true)
  }

  function createProject() {
    create_project(project).then(res => {
      handleClose()
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
    })
  }

  function editProject() {
    edit_project(project).then(res => {
      console.log(res)
      handleClose()
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
    })
  }

  function deleteProject() {
    delete_project({ id: project.id }).then(res => {
      console.log(res)
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
    })
  }

  function handleDelete(id) {
    setProject(state => {
      return {
        ...state,
        id
      }
    })
    showDeleteModal()
  }

  function handleEdit(id, title, description) {
    setProject(() => {
      return { id, title, description }
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

  function selectProject(id) {
    get_categories(id).then(res => {
      const { data } = res.data
      console.log(res)

      setList(state => {
        return {
          ...state,
          categories: data
        }
      })
    })

    setSelectedId(state => {
      return {
        ...state,
        project: id
      }
    })
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
    <div className="projects mb-2 line-bottom px-4 py-2">
      <div className="header d-flex justify-content-between align-items-center">
        <h1 className="my-2 h5">Projects</h1>        
        <div className="btn-group">
          <button className="icon" onClick={() => handleShow(false)}><img src={add} alt="add" /></button>
        </div>
      </div>

      <div className="content">
        {
          list.projects.map(project => {
            return (
              <div className="project-item my-1 d-flex justify-content-between" key={project.id} onClick={() => selectProject(project.id)}>
                <span>
                  { project.title }
                </span>

                <div className="btn-group">
                  <button
                  className="icon"
                  onClick={() => handleEdit(project.id, project.title, project.description)}><img src={edit_icon} alt="edit" /></button>
                  <button className="icon" onClick={() => handleDelete(project.id)}><img src={remove} alt="remove" /></button>
                </div>
              </div>
            )
          })
        }
      </div>
      
      <ProjectModal show={showModal} handleClose={handleClose} project={project} setProject={setProject} handleSubmit={handleSubmit} onEdit={edit} />

      <DeleteModal show={deleteModal} handleClose={closeDeleteModal} handleSubmit={deleteProject} variant="Project" />

    </div>
  )
}