import axios from 'axios'

const API_URL = '/api/v1'

export async function get_projects() {
  const res = await axios.get(`${API_URL}/projects`)

  return res
}