const joinMonster = require('join-monster')
const knex = require('../db/connection')

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID
} = require('graphql')

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
      where: (usersTable, args, context) => {
        return `${usersTable}.id = ${args.id}`
      },
      resolve: (_, __, ___, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, sql => {
          return knex.raw(sql)
        })
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: (_, __, ___, resolveInfo) => {
        return joinMonster.default(resolveInfo, {}, sql => {
          return knex.raw(sql)
        })
      }
    },
    nga_moemoea: {
      type: new GraphQLList(MoemoeaType),
      resolve: (parent, args, context, resolveInfo) => (
        joinMonster.default(
          resolveInfo, 
          {}, 
          sql => knex.raw(sql)
        )
      )
    }
  }
})

module.exports = RootQuery