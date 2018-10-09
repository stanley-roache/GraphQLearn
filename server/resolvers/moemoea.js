export default {
  Query: {
    getMoemoea: (parent, { id }, { models }) => models.Moemoea.findOne({ where: { id } }),
    allUsers: (parent, args, { models }) => models.Moemoea.findAll(),
  },
  Mutation: {
    createMoemoea: (parent, args, { models }) => models.Moemoea.create(args),
  },
};