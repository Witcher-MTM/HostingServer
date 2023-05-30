const Sequelize = require('sequelize')

module.exports = function(sequelize){
    return sequelize.define('Transaction', {
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
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cash: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      isIncome: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    },{
      timestamps:false,
      tableName:'transaction'
    })
}