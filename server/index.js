const { ApolloServer } = require('apollo-server')
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas')
const path = require('path')

const models = require('./models')

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: {
    models,
    user: {
      id: 1,
    },
  }
 });

const PORT = process.env.PORT || 4000

models.sequelize.sync({}).then(() => {
  server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
  })
});