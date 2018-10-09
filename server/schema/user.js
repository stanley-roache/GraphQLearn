export default `

  type User {
    id: Int!
    username: String!
    email: String!
    ngaMoemoea: [Moemoea!]!
  }

  type Query {
    getUser(id: Int!): User!
    allUsers: [User!]!
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User!
  }
`;