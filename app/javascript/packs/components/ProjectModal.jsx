import React from 'react'

import { Modal, Button } from 'react-bootstrap'

import Errors from './Errors.jsx'

export default function ProjectModal({ show, handleClose, project, setProject, handleSubmit, onEdit, errors }) {
  function handleTitle(e) {
    setProject(state => {
      return {
        ...state,
        title: e.target.value
      }
    })
  }

  function handleDescription(e) {
    setProject(state => {
      return {
        ...state,
        description: e.target.value
      }
    })
  }

  function handleCancel() {
    setProject({
      title: "",
      description: ""
    })

    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{ onEdit ? "Edit" : "Create"} Project</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-4">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" placeholder="Required" onChange={handleTitle} value={project.title}/>
          <Errors errors={errors.title} />
        </div>

        <div className="mb-4">
          <label className="form-label">Description</label>
          <input type="text" className="form-control" placeholder="Optional" onChange={handleDescription} value={project.description}/>
          <Errors errors={errors.description} />
        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          { onEdit ? "Edit" : "Create"} Project
        </Button>
      </Modal.Footer>
    </Modal>
  )
}