import React, { useState, useEffect, useContext } from "react"

export default function TaskDue({ tasks }) {
  const [dueTasks, setDueTasks] = useState([])

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

        return currentDate.year >= dueDate.year && currentDate.month >= dueDate.month && currentDate.day >= dueDate.day && !item.is_completed
      })

      newDueTasks = newDueTasks.concat(arr)

    })

    setDueTasks(newDueTasks)

  }, [tasks])


  return (
    <div className="task-due h-50 p-3 overflow-scroll">
      <div className="card">
        <div className="card-header">
          <span className="fw-bold">Task Due</span>
        </div>
        <ul className="list-group list-group-flush">
          {
            dueTasks.map(task => {
              return (
                <li className="list-group-item" key={task.id}>
                  <div className="content flex-grow-1 p-2">
                    <p className="my-1">{ task.name }</p>
                    <p className="my-1 fw-light">{ task.body }</p>
                   <p className="my-1"><strong>Due on: </strong>{ parseDate(task.due_date) }</p>
                  </div>
                </li>
              )
            })                
          }
        </ul>
        {
          dueTasks.length <= 0 &&
            <div className="empty text-center flex-grow-1">
              No tasks due
            </div>  
        }
      </div>

    </div>
  )
}