import { api } from './api'

type Login = {
  email: string
  password: string
}

type Register = {
  username: string
  email: string
  password: string
}

export const getUserLocalStorage = () => {
  const json = localStorage.getItem('token')

  if (!json) {
    return null
  }

  const user = JSON.parse(json)

  return user ?? null
}

export const login = async ({ email, password }: Login) => {
  try {
    const response = await api.post('/user/authenticate', { email, password })
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const register = async ({ username, email, password }: Register) => {
  try {
    const response = await api.post('/user', { username, email, password })
    return response.data
  } catch (error) {
    console.log(error)
  }
}
