import { Spinner } from '@chakra-ui/core'

import auth0 from '../utils/auth0'

function Profile({ user }) {
  console.log(user)
  return (
    <>
      {!user ? (
        <Spinner size="xl" />
      ) : (
        <>
          <img src={user.picture} alt="Profile" width="100" />

          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <code>{JSON.stringify(user, null, 2)}</code>
        </>
      )}
    </>
  )
}

export async function getServerSideProps({ req }) {
  const { user } = await auth0.getSession(req)
  return { props: { user } }
}

export default Profile
