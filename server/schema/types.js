const {
  GraphQLID,
  GraphQLList,
  GraphQLString,
  GraphQLObjectType
} = require('graphql')

const MoemoeaType = new GraphQLObjectType({
  name: 'Moemoea',
  sqlTable: 'ngamoemoea',
  uniqueKey: 'id',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString }, //don't need to specify sqlColumn as same as field name
    description: { type: GraphQLString },
    dreamers: {
      type: new GraphQLList(UserType),
      junction: {
        sqlTable: 'user_moemoea_relations',
        sqlJoins: [
          (followerTable, junctionTable, args) => `${followerTable}.id = ${junctionTable}.moemoea_id`,
          (junctionTable, followeeTable, args) => `${junctionTable}.user_id = ${followeeTable}.id`
        ]
      }
    }
  })
})

MoemoeaType._typeConfig = {
  sqlTable: 'ngamoemoea',
  uniqueKey: 'id'
}

const UserType = new GraphQLObjectType({
  name: 'User',
  sqlTable: 'users',
  uniqueKey: 'id',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    nga_moemoea: {
      type: new GraphQLList(MoemoeaType),
      junction: {
        sqlTable: 'user_moemoea_relations',
        sqlJoins: [
          (followerTable, junctionTable, args) => `${followerTable}.id = ${junctionTable}.user_id`,
          (junctionTable, followeeTable, args) => `${junctionTable}.moemoea_id = ${followeeTable}.id`
        ]
      }
    }
  })
})

UserType._typeConfig = {
  sqlTable: 'users',
  uniqueKey: 'id'
}

module.exports = {
  MoemoeaType,
  UserType
}