export const schema = gql`
  type Work {
    id: Int!
    can_contact: Boolean!
    user: User!
    donate_link: String!
    description: String!
    tasks: Task
  }

  type Query {
    works: [Work]
    work(id: Int!): Work
  }

  input WorkInput {
    can_contact: Boolean
    user: Int
    donate_link: String
    description: String
    tasks: Int
  }

  type Mutation {
    createWork(input: WorkInput!): Work
    updateWork(id: Int!, input: WorkInput!): Work
    deleteWork(id: Int!): Work
  }
`
