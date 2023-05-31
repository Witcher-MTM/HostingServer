const Sequelize = require('sequelize')

module.exports = function(sequelize){
    return sequelize.define('Goal', {
        id: { 
            type: Sequelize.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        uid: {
            type: Sequelize.STRING,
            allowNull: false
          },
        category_id: { 
            type: Sequelize.INTEGER, 
            allowNull: false 
        },
        name: { 
            type: Sequelize.STRING, 
            allowNull: false 
        },
        cash: { 
            type: Sequelize.FLOAT, 
            allowNull: false 
        },
        total_cash: { 
            type: Sequelize.FLOAT, 
            allowNull: false 
        },
        last_income: { 
            type: Sequelize.FLOAT,
            allowNull: true
        },
        deadline: {
            type: Sequelize.STRING,
            allowNull: false
        },
        date_last_income: {
            type: Sequelize.STRING,
            allowNull: true
        },
      },{
        timestamps:false,
        tableName:'goal'
      })
}