import axios from 'axios'

const API_URL = '/api/v1'

// project
export async function create_project(payload) {
  const res = await axios.post(`${API_URL}/create/project`, JSON.stringify(payload))

  return res
}

// category
export async function create_category(payload) {
  const res = await axios.post(`${API_URL}/create/category`, payload)

  return res
}

// tasks
export async function create_task(payload) {
  const res = await axios.post(`${API_URL}/create/task`, payload)

  return res
}