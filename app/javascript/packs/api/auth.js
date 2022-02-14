import axios from "axios"

const API_URL = '/api/v1/user'

export async function login_user(e, payload) {
  e.preventDefault()

  const res = await axios.post(`${API_URL}/login`, payload)

  console.log(res)
}

export async function register_user(e, payload) {
  e.preventDefault()

  const res = await axios.post(`${API_URL}/register`, payload)

  console.log(res)
}