import { Center, Flex, Heading, Text, Button } from '@chakra-ui/react'
import { useAuth } from '@/context/auth-context'
import { Navigate } from 'react-router-dom'

export function Home () {
  const { email, token, logOut } = useAuth()

  if (!token) {
    return <Navigate to='/login' />
  }
  return (
    <Center mx='auto' height='100vh'>
      <Flex direction='column'>
        <Center mb='8'>
          <Heading>Welcome 🚀</Heading>
        </Center>
        <Text>You are logged as {email}</Text>
        <Button onClick={logOut}>LogOut</Button>
      </Flex>
    </Center>
  )
}
