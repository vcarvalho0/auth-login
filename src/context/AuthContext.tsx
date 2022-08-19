import { createContext, ReactNode, useState, useContext } from 'react'

import { login, register } from '../services/auth-client'

type AuthProviderProps = {
  children: ReactNode
}

type UserAuth = {
  email?: string
  token?: string
}

type UserSignUp = {
  username: string
  email: string
  password: string
}

type AuthContextProps = UserAuth & {
  signUp: (user: UserSignUp) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logOut: () => void
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthProvider ({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserAuth | null>()

  const signIn = async (email: string, password: string) => {
    const response = await login({ email, password })

    const payload = { token: response.token, email }

    setUser(payload)
  }

  const signUp = async (user: UserSignUp) => {
    return await register(user)
  }

  const logOut = () => {
    setUser(null)
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
