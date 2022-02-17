import axios from 'axios'

const API_URL = '/api/v1'

// project
export async function delete_project(payload) {
  const res = await axios.delete(`${API_URL}/destroy/project`, { data: payload })

  return res
}