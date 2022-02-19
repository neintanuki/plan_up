import axios from 'axios'

const API_URL = '/api/v1'

export async function get_projects() {
  const res = await axios.get(`${API_URL}/projects`)

  return res
}


export async function get_categories(project_id) {
  const res = await axios.get(`${API_URL}/categories/${project_id}`)

  return res
}

export async function get_tasks(project_id, category_id) {
  const res = await axios.get(`${API_URL}/tasks/${project_id}/${category_id}`)

  return res
}