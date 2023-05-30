const Sequelize = require('sequelize')

module.exports = function(sequelize){
    return sequelize.define('Category', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        uid: {
          type: Sequelize.STRING,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        image_link: {
          type: Sequelize.STRING,
          allowNull: false
        },
        image_color: {
          type: Sequelize.STRING,
          allowNull: false
        },
        color: {
          type: Sequelize.STRING,
          allowNull: false
        },
        lastUsed: {
          type: Sequelize.DATE,
          allowNull: true
        },
        isIncome: {
          type: Sequelize.BOOLEAN,
          allowNull: false
        }
      },{
        timestamps:false,
        tableName:'category'
      })
}