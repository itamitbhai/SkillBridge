// Axios client for the SkillBridge backend. The frontend runs entirely on
// local mock data by default (see src/data/*), so nothing here is called
// unless a page explicitly opts into live-backend mode. Kept ready so wiring
// a page to the real API is a one-line change: swap the mock import for a
// call through this client.

import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env?.VITE_API_URL || 'http://localhost:4000/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ayush-connect-token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
