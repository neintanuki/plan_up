import axios from 'axios'

const API_URL = '/api/v1'

// project
export async function edit_project(payload) {
  const res = await axios.post(`${API_URL}/update/project`, payload)

  return res
}