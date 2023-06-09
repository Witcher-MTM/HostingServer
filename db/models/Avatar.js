const Sequelize = require('sequelize')

module.exports = function(sequelize){
    return sequelize.define('Avatar', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      image_link: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },{
      timestamps:false,
      tableName:'avatars'
    })
}