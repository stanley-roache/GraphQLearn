const { GraphQLSchema } = require('graphql')

module.exports = new GraphQLSchema({
  query: require('./rootQueries'),
  mutation: require('./mutations')
})