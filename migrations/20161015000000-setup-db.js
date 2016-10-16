module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable(
      'roles',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: {
          type: DataTypes.DATE
        },
        updatedAt: {
          type: DataTypes.DATE
        },
        slug: DataTypes.STRING,
        permissions: DataTypes.TEXT
      },
      {
        charset: 'utf8' // default: null
      }
    );

    migration.createTable(
      'users',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: {
          type: DataTypes.DATE
        },
        updatedAt: {
          type: DataTypes.DATE
        },
        nameId: {
          type: DataTypes.STRING,
          unique: true
        },
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: {
          type: DataTypes.STRING,
          unique: true
        }
      },
      {
        charset: 'utf8' // default: null
      }
    );

    migration.createTable(
      'usersToRoles',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        createdAt: {
          type: DataTypes.DATE,
        },
        updatedAt: {
          type: DataTypes.DATE
        },
        userId: DataTypes.INTEGER,
        roleId: DataTypes.INTEGER
      },
      {
        charset: 'utf8' // default: null
      }
    );


    done(); // sets the migration as finished
  },

  down: function(migration, DataTypes, done) {
    migration.dropAllTables().complete(function() {
      done(); // sets the migration as finished
    });
  }
};
