exports.default = {
  sequelize: function(api){
    return {
      "logging"       : true,
      "database"    : process.env.DBNAME | "rikleimt",
      "dialect"     : "mysql",
      "port"        : 3306,
      "host"        : process.env.DBHOST | "127.0.0.1",
      "username"    : process.env.DBUSER | "root",
      "password"    : process.env.DBPASSWORD | "",
      "autoMigrate": false
    };
  }
};
