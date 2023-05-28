const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  return sequelize.define('User', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    isConfirmed: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    accessToken: {
      type: Sequelize.STRING,
      allowNull: false
    },
    refreshToken: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'user'
  })
}