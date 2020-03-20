export const schema = gql`
  type Task {
    id: Int!
    task_name: String!
    price: Int!
    type: String!
    work: Work
  }

  type Query {
    tasks: [Task]
    task(id: Int!): Task
  }

  input TaskInput {
    task_name: String
    price: Int
    type: String
    work: Int
  }
  type Mutation {
    createTask(input: TaskInput!): Task
    updateTask(id: Int!, input: TaskInput!): Task
    deleteTask(id: Int!): Task
  }
`
