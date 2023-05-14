const Sequelize = require('sequelize')

module.exports = function (sequelize) {
    return sequelize.define('Tmp', {
        id: 
        { 
            type: Sequelize.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        cash: 
        { 
            type: Sequelize.INTEGER, 
            allowNull: false 
        },
        user_id: 
        { 
            type: Sequelize.INTEGER, 
            allowNull: false 
        },
    },{
        timestamps:false,
        tableName:'tmp'
      })
}