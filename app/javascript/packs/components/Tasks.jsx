import React, { useContext, useEffect, useState } from 'react'

import { ListContext } from '../pages/Dashboard'

import { get_tasks, get_categories } from '../api/read'
import { create_task } from '../api/create'
import { edit_task } from '../api/edit'
import { delete_task } from '../api/delete'

import TaskModal from './TaskModal.jsx'
import DeleteModal from './DeleteModal.jsx'
import TaskDue from './TaskDue.jsx'

import edit_icon from 'images/edit.svg'
import remove from 'images/x-square.svg'

export default function Tasks() {
  const { selectedId, list, setList } = useContext(ListContext)

  const [task, setTask] = useState({
    id: "",
    name: "",
    body: "",
    is_completed: false,
    dueDate: "",
    task_id: ""
  })
  const [tasks, setTasks] = useState([])
  const [edit, setEdit] = useState(false)

  const [errors, setErrors] = useState({
    name: [],
    body: []
  })

  const [deleteModal, setDeleteModal] = useState(false)
  const closeDeleteModal = () => setDeleteModal(false)
  const showDeleteModal = () => setDeleteModal(true)

  const [showModal, setShowModal] = useState(false)

  function handleClose() {
    setShowModal(false)
    setErrors({
      name: [],
      body: []
    })
    setTask({
      id: "",
      name: "",
      body: "",
      dueDate: "",
      task_id: ""
    })
  }
  
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
      },
      is_completed: task.is_completed
    }

    console.log(payload)

    create_task(payload).then(res => {
      console.log(res)
      get_categories(selectedId.project).then(res => {
        const { data } = res.data
        handleClose()
        setList(state => {
          return {
            ...state,
            categories: data
          }
        })
      })
    }).catch(err => {
        const { errors } = err.response.data
        let newErrors = {
          namee: [],
          body: []
        }
        newErrors = {
          ...newErrors,
          ...errors
        }
        setErrors(newErrors)
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
      },
      is_completed: task.is_completed
    }


    edit_task(payload).then(res => {
      handleClose()
      getTasks()
    }).catch(err => {
        const { errors } = err.response.data
        let newErrors = {
          namee: [],
          body: []
        }
        newErrors = {
          ...newErrors,
          ...errors
        }
        setErrors(newErrors)
      })
  }

  function handleEdit(id, task_id, name, body, dueDate, is_completed = false) {
    setTask(state => {
      return {
        ...state,
        id,
        task_id,
        name,
        body,
        dueDate,
        is_completed
      }
    })
    setEdit(true)
    setShowModal(true)
  }

  function markComplete(id, task_id, name, body, dueDate, is_completed = false) {
    const date = new Date(dueDate)
    const payload = {
      project_id: selectedId.project,
      category_id: id,
      id: task_id,
      name,
      body,
      due_date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      },
      is_completed
    }

    edit_task(payload).then(res => {
      console.log(res)
      getTasks()
    })
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
      getTasks()
    })
  }

  function getTasks() {
    const selectedProject = selectedId.project
    const categories = list.categories
    let newTasks = []

    categories.forEach(({ id }) => {
      get_tasks(selectedProject, id).then(res => {
        const category = res.data

        newTasks = [
          ...newTasks,
          {
            id,
            category
          }
        ]

        if (categories.length === newTasks.length) {
          setTasks(newTasks)
        }


      })
    })
  }

  function parseDate(date) {
    date = new Date(date)
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ]
    return `${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`
  }

  useEffect(() => {
    getTasks()
  }, [selectedId.project, list.categories])

  return (
    <div className="tasks col-md-9 h-100">
      <div className="d-flex flex-wrap justify-content-around h-50 overflow-scroll">
        {
          list.categories.map(category => {
            return (
              <div className="category card my-3 d-flex flex-column" key={category.id}>
                <div className="card-header fw-bold text-center">
                  <span>{ category.title }</span>
                </div>
                <ul className="list-group list-group-flush">
                  {
                    tasks.map(el => {
                      return el.id === category.id &&
                        <ul className="list-group list-group-flush" key={el.id}>
                          {el.category.data.map(el => {
                            return (
                              <li className="list-group-item d-flex align-items-baseline" key={el.id}>
                                <div className="btn-group-left">
                                    <input type="checkbox"
                                    onChange={() => markComplete(category.id, el.id, el.name, el.body, el.due_date, !el.is_completed)}
                                    checked={el.is_completed}
                                    />
                                </div>
                                <div className="content flex-grow-1 p-2">
                                  <p className="my-1">{ el.name }</p>
                                  <p className="my-1 fw-light">{ el.body }</p>
                                  <p className="my-1"><strong>Due on: </strong>{ parseDate(el.due_date) }</p>
                                </div>
                                <div className="btn-group-right">
                                  <button className="icon"
                                  onClick={() => handleEdit(category.id, el.id, el.name, el.body, el.due_date)
                                  }><img src={edit_icon} alt="edit" /></button>
                                  <button className="icon"
                                  onClick={() => handleDelete(category.id, el.id)}
                                  ><img src={remove} alt="remove" /></button>
                                </div>
                              </li>
                            )
                          }) }
                        </ul> 
                    })
                  }
                </ul>
                <div className="card-footer p-relative bottom-0">
                  <button className="btn btn-info w-100" onClick={() => handleShow(category.id)}>Add Task</button>
                </div>
              </div>
            )
          })
        }

      </div>

      <TaskModal show={showModal} handleClose={handleClose} handleSubmit={handleSubmit} task={task} setTask={setTask} edit={edit} errors={errors}/>

      <DeleteModal show={deleteModal} handleClose={closeDeleteModal} handleSubmit={handleDelete} variant="task" />

      <TaskDue tasks={tasks} />
    </div>
  )
}