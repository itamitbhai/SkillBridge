import { createContext, useContext, useEffect, useState } from 'react'
import { demoUsers } from '../data/users'

const AuthContext = createContext(null)
const STORAGE_KEY = 'ayush-connect-auth'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      else localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore storage errors (private browsing, etc.)
    }
  }, [user])

  const login = async (_email, _password, role = 'student') => {
    await new Promise((r) => setTimeout(r, 500))
    const account = demoUsers[role] || demoUsers.student
    setUser(account)
    return account
  }

  const loginAsDemo = (role = 'student') => {
    setUser(demoUsers[role] || demoUsers.student)
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, role: user?.role, isAuthenticated: !!user, login, loginAsDemo, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
