import { useState } from 'react'
import { Button, Center, Flex, Heading, Input } from '@chakra-ui/react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '@/context/auth-context'
import { ErrorMessage } from '@/components/error-message'

export function Register () {
  const { signUp, token } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  type OnSubmitEvent = React.FormEvent<HTMLFormElement> & {
    currentTarget: {
      username: HTMLInputElement
      email: HTMLInputElement
      password: HTMLInputElement
    }
  }

  const handleSubmit = async (e: OnSubmitEvent) => {
    e.preventDefault()
    const username = e.currentTarget.username.value
    const email = e.currentTarget.email.value
    const password = e.currentTarget.password.value

    if (!username || !email || !password) {
      setError('Empty inputs are not valid')
      return
    }

    try {
      await signUp(username, email, password)
      navigate('/home')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Unknow error')
    }
  }

  const handleClose = () => {
    setError(null)
  }

  if (token) {
    return <Navigate to='/home' />
  }

  return (
    <Center mx='auto' height='100vh'>
      <Flex direction='column'>
        <Center mb='8'>
          <Heading>Cadastrar</Heading>
        </Center>
        <ErrorMessage show={!!error} message={error} onClose={handleClose} />
        <form onSubmit={handleSubmit}>
          <Flex direction='column'>
            <Input
              type='text'
              name='username'
              size='sm'
              width='sm'
              placeholder='Nome'
              marginBottom='20px'
            />
            <Input
              type='text'
              name='email'
              size='sm'
              width='sm'
              placeholder='Email'
              marginBottom='20px'
            />
            <Input
              type='password'
              name='password'
              size='sm'
              width='sm'
              placeholder='Senha'
            />
          </Flex>
          <Button type='submit' marginTop='20px' width='sm' size='lg'>Cadastrar</Button>
        </form>
      </Flex>
    </Center>
  )
}
