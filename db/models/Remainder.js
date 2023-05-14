const Sequelize = require('sequelize')

module.exports = function (sequelize) {
    return sequelize.define('Remainder', {
        id: 
        { 
            type: Sequelize.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        user_id: 
        { 
            type: Sequelize.INTEGER, 
            allowNull: false 
        },
        category_id:{
            type: Sequelize.INTEGER, 
            allowNull: false 
        },
        name: 
        { 
            type: Sequelize.STRING, 
            allowNull: false 
        },
        cash: 
        { 
            type: Sequelize.FLOAT, 
            allowNull: false 
        },
        dateRemainde: 
        { 
            type: Sequelize.DATE, 
            allowNull: false 
        }
    },{
        timestamps:false,
        tableName:'remainder'
      })
}