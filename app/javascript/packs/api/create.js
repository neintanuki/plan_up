import axios from 'axios'

const API_URL = '/api/v1'

// project
export async function create_project(payload) {
  const res = await axios.post(`${API_URL}/create/project`, JSON.stringify(payload))

  return res
}