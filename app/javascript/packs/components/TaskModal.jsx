import React, { useState, useEffect } from 'react'

import { Modal, Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import date_css from 'react-datepicker/dist/react-datepicker.css'

import Errors from './Errors.jsx'

export default function TaskModal({ show, handleClose, handleSubmit, task, setTask, edit, errors }) {

  const [startDate, setStartDate] = useState(new Date())


  function handleName(e) {
    setTask(state => {
      return {
        ...state,
        name: e.target.value
      }
    })
  }

  function handleBody(e) {
    setTask(state => {
      return {
        ...state,
        body: e.target.value
      }
    })
  }

  function handleDate(date) {
    setStartDate(date)
    setTask(state => {
      return {
        ...state,
        dueDate: date
      }
    })
  }

  function submit() {
    setTask(state => {
      return {
        ...state,
        dueDate: startDate
      }
    })
    handleSubmit()
  }

  useEffect(() => {
    if (edit) {
      setStartDate(new Date(task.dueDate))
    }
  }, [edit])

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{ edit ? "Edit" : "Create" } Task</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-4">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" placeholder="Required" onChange={handleName} value={task.name}/>
          <Errors errors={errors.name} />
        </div>

        <div className="mb-4">
          <label className="form-label">Body</label>
          <textarea type="text" className="form-control" placeholder="Optional" onChange={handleBody} value={task.body}></textarea>
          <Errors errors={errors.body} />
        </div>

        <div className="mb-4">
          <label className="form-label">Due Date</label>
          <DatePicker selected={startDate} onChange={handleDate} />
        </div>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} >
          Cancel
        </Button>
        <Button variant="primary" onClick={submit}>
          { edit ? "Edit" : "Create" } Task
        </Button>
      </Modal.Footer>
    </Modal>
  )
}