export default `

  type User {
    id: Int!
    name: String!
    alias: String!
    ngaMoemoea: [Moemoea!]!
  }

  type Query {
    getUser(id: Int!): User!
    allUsers: [User!]!
  }

  type Mutation {
    createUser(
      name: String!, 
      alias: String!, 
      moemoeaIds: [Int!]
      password: String!
    ): User!
  }
`;