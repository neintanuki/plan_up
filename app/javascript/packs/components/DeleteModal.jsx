import React from 'react'

import { Modal, Button } from 'react-bootstrap'

export default function DeleteModal({ show, handleClose, handleSubmit, variant }) {

  function deleteProject() {
    handleSubmit()
    handleClose()
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete { variant }</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure do you want to delete this project?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={deleteProject}>
          Delete { variant }
        </Button>
      </Modal.Footer>
    </Modal>
  )
}