import axios from 'axios'

const API_URL = '/api/v1'

// project
export async function edit_project(payload) {
  const res = await axios.patch(`${API_URL}/update/project`, payload)

  return res
}

// category
export async function edit_category(payload) {
  const res = await axios.patch(`${API_URL}/update/category`, payload)

  return res
}

// task
export async function edit_task(payload) {
  const res = await axios.patch(`${API_URL}/update/task`, payload)

  return res
}