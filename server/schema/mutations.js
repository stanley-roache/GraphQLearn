const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLString
} = require('graphql')

const {
  User,
  Moemoea
} = require('../models')

const {
  UserType,
  MoemoeaType
} = require('./types')

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
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
        name: { type: new GraphQLNonNull(GraphQLString) },
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

module.exports = mutation