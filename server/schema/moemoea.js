export default `

  type Moemoea {
    id: Int!
    name: String!
    description: String
    dreamers: [User!]!
  }

  type Query {
    getMoemoea(id: Int!): Moemoea!
    allMoemoea: [Moemoea!]!
  }

  type Mutation {
    createMoemoea( 
      name: String!, 
      description: String!,
      dreamerIds: [Int!]! 
      password: String!
    ): Moemoea!
  }
`;