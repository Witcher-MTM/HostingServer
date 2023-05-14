const Sequelize = require('sequelize')

module.exports = function(sequelize){
    return sequelize.define('Account', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cash: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      }
    },{
      timestamps:false,
      tableName:'account'
    })
}