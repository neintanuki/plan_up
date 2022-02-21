import React, { useState, useEffect } from "react"

export default function TaskDue({ tasks }) {
  const [dueTasks, setDueTasks] = useState([])

  useEffect(() => {
    let newDueTasks = []
    const dateNow = new Date()
    const currentDate = {
      year: dateNow.getFullYear(),
      month: dateNow.getMonth(),
      day: dateNow.getDate()
    }

    tasks.forEach(({ category }) => {
      const arr = category.data.filter(item => {
        const taskDate = new Date(item.due_date)
        const dueDate = {
          year: taskDate.getFullYear(),
          month: taskDate.getMonth(),
          day: taskDate.getDate()
        }

        return currentDate.year === dueDate.year && currentDate.month === dueDate.month && currentDate.day === dueDate.day
      })

      newDueTasks = newDueTasks.concat(arr)

    })

    setDueTasks(newDueTasks)

  }, [tasks])


  return (
    <div className="task-due h-50 p-3">
      <div className="card">
        <div className="card-header">
          <span className="fw-bold">Task Due</span>
        </div>
        <ul className="list-group list-group-flush">
          {
            dueTasks.map(task => {
              return (
                <li className="list-group-item" key={task.id}>
                  { task.name }
                </li>
              )
            })
          }
        </ul>
      </div>

    </div>
  )
}