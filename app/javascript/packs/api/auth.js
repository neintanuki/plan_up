import axios from "axios"

const API_URL = '/api/v1/user'

export async function login_user(e, payload) {
  e.preventDefault()

  const res = await axios.post(`${API_URL}/login`, payload)
  return res
}

export async function register_user(e, payload) {
  e.preventDefault()

  const res = await axios.post(`${API_URL}/register`, payload)

  return res
}

export async function logout() {
  const res = await axios.post(`${API_URL}/logout`)

  return res
}

export async function status() {
  const res = await axios.post(`${API_URL}/status`)

  return res
}

