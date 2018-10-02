const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')

const schema = require('./schema')

const server = express()

mongoose.connect("mongodb://stan_123:4f8ayKx9iQQFiMV@ds121203.mlab.com:21203/graphqlearn", { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log('mongoose connection open')
})

server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})