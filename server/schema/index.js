const graphql = require('graphql')

const User = require('../models/user')
const Moemoea = require('../models/moemoea')

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
      resolve: parent => User.find({ dream_ids: parent.id }) // TODO
    }
  })
})

// const TaskType = new GraphQLObjectType({
//   name: 'Task',
//   fields: () => ({
//     id: { type: GraphQLID },
//     name: { type: GraphQLString },
//     description: { type: GraphQLString }
//   })
// })

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    dream_ids: { type: new GraphQLList(GraphQLID) },
    nga_moemoea: {
      type: new GraphQLList(MoemoeaType),
      resolve: parent => parent.dream_ids.map(dreamID => Moemoea.findById(dreamID)) // TODO
    }
  })
})

// ROOT QUERIES

const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve: ( parent, args ) => User.findById(args.id)
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: () => User.find({})
    },
    nga_moemoea: {
      type: new GraphQLList(MoemoeaType),
      resolve: () => Moemoea.find({})
    }
  }
})

//  MUTATUIONS

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        dream_ids: { type: new GraphQLList(GraphQLID) }
      },
      resolve: ( _, args ) => {
        let newUser = new User({
          name: args.name,
          dream_ids: args.dream_ids
        })
        return newUser.save() // mongoose magic
      }
    },
    addMoemoea: {
      type: MoemoeaType,
      args: {
        name: { type: GraphQLString },
        description: { type: GraphQLString }
      },
      resolve: ( _, args ) => {
        let newMoemoea = new Moemoea({
          name: args.name,
          description: args.description
        })
        return newMoemoea.save()
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query,
  mutation
})