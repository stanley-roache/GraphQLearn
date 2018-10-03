const knex = require('../db/connection')

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
      resolve: (parent, args) => {
        const newUser = {
          name: args.name
        }

        return knex.insert([newUser], 'id')
          .into('users')
          .then(ids => ids[0])
          .then(id => {
            return knex.insert(
              args.dream_ids.map(moemoea_id => ({ moemoea_id, user_id: id })),
              'id'
            ).into('user_moemoea_relations')
            .then(() => (
              knex('users')
                .select()
                .where({id})
                .first()
                .then(user => new UserType(user))
            ))
          })
      }
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