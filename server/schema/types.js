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
      resolve: () => {}
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
      resolve: () => {}
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