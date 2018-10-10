export default (sequelize, DataTypes) => {
  const Moemoea = sequelize.define('moemoea', {
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    description: DataTypes.STRING,
  });

  Moemoea.associate = models => {
    // N:M
    Moemoea.belongsToMany(models.User, {
      through: 'dreamers',
      as: 'ngaMoemoea',
      foreignKey: {
        name: 'moemoeaId',
        field: 'moemoea_id',
      },
    });
  };

  return Moemoea
};