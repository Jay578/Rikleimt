exports.default = {
  sequelize: function(api){
    return {
      "logging"       : true,
      "database"    : "esports_admin",
      "dialect"     : "mysql",
      "port"        : 3306,
      "host"        : "127.0.0.1",
      "username"    : "root",
      "password"    : "",
      "autoMigrate": false
    };
  }
};
