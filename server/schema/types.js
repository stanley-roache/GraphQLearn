const {
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLObjectType
} = require('graphql')

const {
  User,
  Moemoea
} = require('../models')

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

module.exports = {
  MoemoeaType,
  UserType
}