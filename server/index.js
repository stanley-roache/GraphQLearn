const express = require('express')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')

const schema = require('./schema')

const server = express()

server.use(cors())

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})