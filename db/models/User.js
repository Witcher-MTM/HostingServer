const Sequelize = require('sequelize')

module.exports = function(sequelize){
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
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        isConfirmed: {
            type: Sequelize.BOOLEAN,
            allowNull: false
          }
      },{
        timestamps:false,
        tableName:'user'
      })
}