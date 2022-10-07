import { Alert, AlertIcon, AlertTitle, CloseButton } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

type ErrorType = {
  message: string | null
  show: boolean
  onClose: () => void
}

export const ErrorMessage = ({ message, show, onClose }: ErrorType) => {
  const [shouldShow, setShouldShow] = useState(show)

  useEffect(() => {
    setShouldShow(show)
  }, [show])

  if (!shouldShow) {
    return null
  }

  return (
    <Alert status='error' variant='left-accent' mb='2'>
      <AlertIcon />
      <AlertTitle>{message}</AlertTitle>
      <CloseButton onClick={onClose} position='absolute' right='8px' top='8px' />
    </Alert>
  )
}
