export const schema = gql`
  type User {
    id: Int!
    email: String!
    given_name: String!
    email_verified: Boolean!
    family_name: String!
    picture: String!
    locale: String!
    updated_at: DateTime!
    sub: String!
    works: Work
  }

  type Query {
    users: [User]
    user(id: Int!): User
  }
  type Mutation {
    createUser(input: UserInput!): User
    updateUser(id: Int!, input: UserInput!): User
    deleteUser(id: Int!): User
  }

  input UserInput {
    email: String
    given_name: String
    email_verified: Boolean
    family_name: String
    picture: String
    locale: String
    updated_at: DateTime
    sub: String
    works: Int
  }
`
