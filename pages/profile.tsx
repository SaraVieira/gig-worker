import { Spinner } from "@chakra-ui/core";

import auth0 from "../utils/auth0";
import { FC } from "react";
import { NextPageContext } from "next";

type ProfileProps = {
  user: {
    picture: string;
    name: string;
    email: string;
  };
};

const Profile: FC<ProfileProps> = ({ user }) => {
  console.log(user);
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
  );
};

export async function getServerSideProps({ req }: NextPageContext) {
  if (!req) {
    return {};
  }
  const session = await auth0.getSession(req);
  if (!session) {
    return {};
  }
  const { user } = session;
  return { props: { user } };
}

export default Profile;
