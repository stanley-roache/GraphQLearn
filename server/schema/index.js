const graphql = require('graphql')

const { 
  GraphQLObjectType, 
  GraphQLID,
  GraphQLString,
  GraphQLSchema
} = graphql

// DUMMY DATA

const users = [
  { id: '1', name: 'henry'},
  { id: '2', name: 'henru'},
  { id: '3', name: 'henro'},  
]

// BASE TYPES

const MoemoeaType = new GraphQLObjectType({
  name: 'Moemoea',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  })
})

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  })
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }
  })
})

// ROOT QUERIES

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve: ( parent, args ) => users.find(user => user.id == args.id)
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})