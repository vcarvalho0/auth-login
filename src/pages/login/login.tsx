import { useState } from 'react'
import { Button, Center, Flex, Heading, Input } from '@chakra-ui/react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/auth-context'
import { ErrorMessage } from '@/components/error-message'

export function Login () {
  const { signIn, token } = useAuth()
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  type OnSubmitEvent = React.FormEvent<HTMLFormElement> & {
    currentTarget: {
      email: HTMLInputElement
      password: HTMLInputElement,
    }
  }

  const handleSubmit = async (e: OnSubmitEvent) => {
    e.preventDefault()

    const email = e.currentTarget.email.value
    const password = e.currentTarget.password.value

    if (!email || !password) {
      setError('Empty inputs are not valid')
      return
    }

    try {
      await signIn(email, password)
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
          <Heading>Entrar</Heading>
        </Center>
        <ErrorMessage show={!!error} message={error} onClose={handleClose} />
        <form onSubmit={handleSubmit}>
          <Flex direction='column'>
            <Input
              type='text'
              placeholder='Email'
              name='email'
              size='sm'
              width='sm'
              marginBottom='20px'
            />
            <Input
              type='password'
              placeholder='Password'
              name='password'
              size='sm'
              width='sm'
              marginBottom='20px'
            />
          </Flex>
          <Button type='submit' marginTop='20px' width='sm' size='lg'>Entrar</Button>
        </form>
      </Flex>
    </Center>
  )
}
