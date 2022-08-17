import { api } from './api'

type Login = {
  email: string
  password: string
}

type Register = {
  fullName: string
  email: string
  password: string
}

export const login = async ({ email, password }: Login) => {
  try {
    const response = await api.post('/user/authenticate', { email, password })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const register = async ({ fullName, email, password }: Register) => {
  try {
    const response = await api.post('/user/register', { fullName, email, password })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
