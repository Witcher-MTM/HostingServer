const Sequelize = require('sequelize')

module.exports = function (sequelize) {
  return sequelize.define('User', {
    uid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    avatar_id: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    emailVerified: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastLoginAt: {
      type: Sequelize.STRING,
      allowNull: false
    },
    accesstoken: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    refreshtoken: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    total_cash: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true
    },
  }, {
    timestamps: false,
    tableName: 'user'
  })
}