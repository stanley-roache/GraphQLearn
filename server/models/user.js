export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: DataTypes.STRING,
    alias: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
  });

  User.associate = models => {
    // N:M
    User.belongsToMany(models.Moemoea, {
      through: 'dreamers',
      as: 'dreamers',
      foreignKey: {
        name: 'userId',
        field: 'user_id',
      },
    });
  };

  return User;
};