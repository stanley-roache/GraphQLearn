import Sequelize from 'sequelize';

const sequelize = new Sequelize('moemoea', 'moemoea', 'moemoea', {
  dialect: 'postgres',
  define: {
    underscored: true,
  },
});

const models = {
  User: sequelize.import('./user'),
  Moemoea: sequelize.import('./moemoea'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;