const { graphqlExpress, graphiqlExpress } = require ('apollo-server-express')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas')
const path = require('path')
const { makeExecutableSchema } = require('graphql-tools')

const server = express()

const models = require('./models')

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

server.use(cors('*'))

server.use('/graphql', 
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      models,
      user: {
        id: 1,
      },
    },
  }),
)

server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

const PORT = process.env.PORT || 4000

models.sequelize.sync({}).then(() => {
  server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
  })
});