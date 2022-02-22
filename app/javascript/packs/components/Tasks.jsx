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
      console.log(res)
      get_categories(selectedId.project).then(res => {
        const { data } = res.data
        console.log(res)
        setList(state => {
          return {
            ...state,
            categories: data
          }
        })
      })
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
      getTasks()
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
                                    <input type="checkbox" />
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
                <div className="card-footer">
                  <button className="btn btn-info w-100" onClick={() => handleShow(category.id)}>Add Task</button>
                </div>
              </div>
            )
          })
        }

      </div>

      <TaskModal show={showModal} handleClose={handleClose} handleSubmit={handleSubmit} task={task} setTask={setTask} edit={edit}/>

      <DeleteModal show={deleteModal} handleClose={closeDeleteModal} handleSubmit={handleDelete} variant="task" />

      <TaskDue tasks={tasks} />
    </div>
  )
}