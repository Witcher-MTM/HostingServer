const Sequelize = require('sequelize')

module.exports = function(sequelize){
    return sequelize.define('Goal', {
        id: { 
            type: Sequelize.INTEGER, 
            primaryKey: true, 
            autoIncrement: true 
        },
        user_id: { 
            type: Sequelize.INTEGER, 
            allowNull: false 
        },
        name: { 
            type: Sequelize.STRING, 
            allowNull: false 
        },
        total_cash: { 
            type: Sequelize.INTEGER, 
            allowNull: false 
        },
        cash: { 
            type: Sequelize.INTEGER, 
            allowNull: false 
        },
        deadline: { 
            type: Sequelize.DATE, 
            allowNull: false 
        },
        color: { 
            type: Sequelize.STRING(20) 
        },
        category_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
      },{
        timestamps:false,
        tableName:'goal'
      })
}