module.exports = function(sequelize, DataTypes) {
  return sequelize.define('role', {
    slug: DataTypes.STRING,
    permissions: DataTypes.TEXT
  },
  {
    classMethods: {
      defineRelationship: function(api){
        api.models.role.hasMany(api.models.user, {as: 'users', through: 'usersToRoles'});
      },
    },
  });
};
