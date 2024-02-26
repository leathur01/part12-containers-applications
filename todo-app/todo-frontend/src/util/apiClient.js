import axios from 'axios'

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || undefined

const apiClient = axios.create({
  baseURL: BACKEND_URL,
})

export default apiClient