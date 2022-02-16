import React from 'react'

import { Modal, Button } from 'react-bootstrap'

export default function ProjectModal({ show, handleClose, setProject, createProject }) {
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

  function handleSubmit() {
    createProject()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Project</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-4">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" placeholder="Required" onChange={handleTitle} />
        </div>

        <div className="mb-4">
          <label className="form-label">Description</label>
          <input type="text" className="form-control" placeholder="Optional" onChange={handleDescription} />
        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Create Project
        </Button>
      </Modal.Footer>
    </Modal>
  )
}