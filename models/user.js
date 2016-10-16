module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    nameId: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
  },
  {
    classMethods: {
      defineRelationship: function(api){
        api.models.user.hasMany(api.models.role, {as: 'roles', through: 'usersToRoles'});
      },
    }
  });
};
