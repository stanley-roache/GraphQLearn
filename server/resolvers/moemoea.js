export default {
  Query: {
    getMoemoea: (parent, { id }, { models }) => 
      models.Moemoea.findOne({ 
        where: { id },
        include: [{
          model: models.User,
          through: { attributes: [] }
        }]
      }),
    allMoemoea: (parent, args, { models }) => models.Moemoea.findAll(),
  },
  Mutation: {
    createMoemoea: (parent, args, { models }) => models.Moemoea.create(args),
    updateMoemoea: (parent, args, { models }) => {
      return models.Moemoea.update( 
        { ...args },
        { 
          fields: Object.keys(args),
          where: { id: args.id }
        }
      ).then(() => models.Moemoea.findOne({ where: { id } }))
    }
  },
};