import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from '@/pages/home/home'
import { AuthProvider } from '@/context/auth-context'
import { Login } from '@/pages/login/login'
import { Register } from '@/pages/register/register'
import { ChakraProvider } from '@chakra-ui/react'

export function App () {
  return (
    <ChakraProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/home' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  )
}
