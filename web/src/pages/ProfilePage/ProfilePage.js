import { Spinner } from '@chakra-ui/core'

import { useAuth0 } from '../../react-auth0-spa'
import MainLayout from '../../layouts/MainLayout'
const ProfilePage = () => {
  const { loading, user } = useAuth0()

  return (
    <MainLayout>
      {loading || !user ? (
        <Spinner size="xl" />
      ) : (
        <>
          <img src={user.picture} alt="Profile" width="100" />

          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <code>{JSON.stringify(user, null, 2)}</code>
        </>
      )}
    </MainLayout>
  )
}

export default ProfilePage
