import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home } from '../src/pages/Home/Home'
import { AuthProvider } from './context/AuthContext'
import { SignIn } from './pages/SignIn/SingIn'
import { SignUp } from './pages/SingUp/SingUp'

export function App () {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<SignUp />} />
          <Route path='/login' element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
