const graphql = require('graphql')

const { 
  GraphQLObjectType, 
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList
} = graphql

// DUMMY DATA

const users = [
  { id: 1, name: 'henry', dream_ids: [2, 1]},
  { id: 2, name: 'henru', dream_ids: [3, 2]},
  { id: 3, name: 'henro', dream_ids: [1, 3]},  
]

const ngaMoemoea = [
  { id: 1, name: "eat a pie" },
  { id: 2, name: "eat a cat" },
  { id: 3, name: "eat a bird" }
]

// BASE TYPES

const MoemoeaType = new GraphQLObjectType({
  name: 'Moemoea',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    dreamers: {
      type: new GraphQLList(UserType),
      resolve: parent => users.filter(user => !!user.dream_ids.find(id => id === parent.id))
    }
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
    name: { type: GraphQLString },
    dream_ids: { type: new GraphQLList(GraphQLID) },
    nga_moemoea: {
      type: new GraphQLList(MoemoeaType),
      resolve: parent => parent.dream_ids.map(id => ngaMoemoea.find(moemoea => moemoea.id === id))
    }
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
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: () => users
    },
    nga_moemoea: {
      type: new GraphQLList(MoemoeaType),
      resolve: () => ngaMoemoea
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})