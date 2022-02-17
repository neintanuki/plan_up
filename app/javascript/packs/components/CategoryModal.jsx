import React from 'react'

import { Modal, Button } from 'react-bootstrap'

export default function CategoryModal({ show, handleClose, handleSubmit, category, setCategory, edit }) {

  function handleCancel() {
    setCategory(state => {
      return {
        ...state,
        title: ""
      }
    })
    handleClose()
  }

  function handleTitle(e) {
    setCategory(state => {
      return {
        ...state,
        title: e.target.value
      }
    })
  }

  function submit() {
    handleSubmit()
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{ edit ? "Edit" : "Create" } Category</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-4">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" placeholder="Required" onChange={handleTitle} value={category.title} />
        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={submit}>
          { edit ? "Edit" : "Create" } Category
        </Button>
      </Modal.Footer>
    </Modal>
  )
}