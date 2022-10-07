import { createContext, ReactNode, useState, useContext, useEffect } from 'react'
import { getUserLocalStorage, login, register } from '@/services/auth-client'

type AuthProviderProps = {
  children: ReactNode
}

type UserAuth = {
  email?: string
  token?: string
}

type AuthContextProps = UserAuth & {
  signUp: (username: string, email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logOut: () => void
}

const AuthContext = createContext<AuthContextProps | null>(null)

export function AuthProvider ({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserAuth | null>()

  useEffect(() => {
    const user = getUserLocalStorage()

    if (user) {
      setUser(user)
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    const response = await login({ email, password })

    const payload = { token: response.token, email }

    setUser(payload)
    localStorage.setItem('token', JSON.stringify(payload))
  }

  const signUp = async (username: string, email: string, password: string) => {
    try {
      await register({ username, email, password })
    } catch (error) {
      console.log(error)
    }
  }

  const logOut = () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{
      signIn,
      signUp,
      logOut,
      ...user
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('You need a provider!')
  }
  return context
}
