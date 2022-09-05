import { useAuth } from '../../context/AuthContext'

export function Home () {
  const auth = useAuth()

  if (!auth.email) {
    return (
      <>
        <h1>Você precisa estar logado!</h1>
      </>
    )
  }
  return (
    <>
      <h1>Bem Vindo</h1>
    </>
  )
}
