import React, { useContext, useEffect, useState } from 'react'

import { ListContext } from '../pages/Dashboard'

import { get_tasks } from '../api/read'
import { create_task } from '../api/create'
import { edit_task } from '../api/edit'
import { delete_task } from '../api/delete'

import TaskModal from './TaskModal.jsx'
import DeleteModal from './DeleteModal.jsx'

export default function Tasks() {
  const { selectedId, list } = useContext(ListContext)

  const [task, setTask] = useState({
    id: "",
    name: "",
    body: "",
    dueDate: "",
    task_id: ""
  })
  const [tasks, setTasks] = useState([])
  const [edit, setEdit] = useState(false)

  const [deleteModal, setDeleteModal] = useState(false)
  const closeDeleteModal = () => setDeleteModal(false)
  const showDeleteModal = () => setDeleteModal(true)

  const [showModal, setShowModal] = useState(false)
  const handleClose = () => setShowModal(false)
  
  function handleShow(id) {
    setTask(state => {
      return {
        ...state,
        id,
        dueDate: new Date()
      }
    })
    setShowModal(true)
  }

  function createTask() {
    const date = new Date(task.dueDate)
    const payload = {
      project_id: selectedId.project,
      category_id: task.id,
      name: task.name,
      body: task.body,
      due_date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    }

    console.log(payload)

    create_task(payload).then(res => {
      handleClose()
    })
  }

  function editTask() {
    const date = new Date(task.dueDate)
    const payload = {
      project_id: selectedId.project,
      category_id: task.id,
      id: task.task_id,
      name: task.name,
      body: task.body,
      due_date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    }


    edit_task(payload).then(res => {
      handleClose()
    })
  }

  function handleEdit(id, task_id, name, body, dueDate) {
    setTask(state => {
      return {
        ...state,
        id,
        task_id,
        name,
        body,
        dueDate
      }
    })
    setEdit(true)
    setShowModal(true)
  }

  function handleSubmit() {
    if (edit) {
      editTask()
    } else {
      createTask()
    }
  }

  function handleDelete(category_id, id) {
    const payload = {
      project_id: selectedId.project,
      category_id,
      id
    }

    delete_task(payload).then(res => {
      console.log(res)
      handleClose()
    })
  }

  useEffect(() => {
    const selectedProject = selectedId.project
    const categories = list.categories

    if (selectedProject.length > 0) {
      if (categories.length > 0) {
        categories.forEach(({ id }) => {
          get_tasks(selectedProject, id).then(res => {
            const category = res.data

            setTasks(state => {
              return [
                ...state,
                {
                  ...category,
                  id
                }
              ]              

            })
          })
        })
      }
    }
  }, [selectedId, list.categories])

  return (
    <div className="tasks col-md-9 h-100 bg-info">
      <div className="d-flex flex-wrap justify-content-around">
        {
          list.categories.map(category => {
            return (
              <div className="category card my-3" key={category.id}>
                <div className="card-header">
                  <span>{ category.title }</span>
                </div>
                <ul className="list-group list-group-flush">
                  {
                    tasks.map(task => {
                      return task.id === category.id &&
                        <ul className="list-group list-group-flush" key={task.id}>
                          {task.data.map(task => {
                            return (
                              <li className="list-group-item d-flex" key={task.id}>
                                <div className="btn-group-left">
                                    <input type="checkbox" />
                                    <label htmlFor="">-</label>
                                </div>
                                <div className="content flex-grow-1 p-2">
                                  <span>{ task.name }</span>
                                  <span>{ task.body }</span>
                                </div>
                                <div className="btn-group-right">
                                  <button className="btn btn-info"
                                  onClick={() => handleEdit(category.id, task.id, task.name, task.body, task.due_date)
                                  }>E</button>
                                  <button className="btn btn-danger"
                                  onClick={() => handleDelete(category.id, task.id)}
                                  >D</button>
                                </div>
                              </li>
                            )
                          }) }
                        </ul> 
                    })
                  }
                </ul>
                <div className="card-footer">
                  <button className="btn btn-info" onClick={() => handleShow(category.id)}>Add Task</button>
                </div>
              </div>
            )
          })
        }
      </div>

      <TaskModal show={showModal} handleClose={handleClose} handleSubmit={handleSubmit} task={task} setTask={setTask} edit={edit}/>

      <DeleteModal show={deleteModal} handleClose={closeDeleteModal} handleSubmit={handleDelete} variant="task" />
    </div>
  )
}