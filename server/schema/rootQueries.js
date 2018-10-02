const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID
} = require('graphql')

const {
  User,
  Moemoea
} = require('../models')

const {
  UserType,
  MoemoeaType
} = require('./types')


const RootQuery = new GraphQLObjectType({
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

module.exports = RootQuery