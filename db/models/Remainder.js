const Sequelize = require('sequelize')

module.exports = function (sequelize) {
    return sequelize.define('Remainder', {
        id: 
        { 
            type: Sequelize.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        uid: {
            type: Sequelize.STRING,
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
            type: Sequelize.STRING, 
            allowNull: false 
        }
    },{
        timestamps:false,
        tableName:'remainder'
      })
}