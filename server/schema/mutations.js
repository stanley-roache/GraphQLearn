const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
  GraphQLString
} = require('graphql')

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
      resolve: () => {}
    },
    addMoemoea: {
      type: MoemoeaType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString }
      },
      resolve: () => {}
    }
  }
})

module.exports = mutation