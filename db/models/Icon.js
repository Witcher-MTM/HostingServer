const Sequelize = require('sequelize')

module.exports = function (sequelize) {
    return sequelize.define('Icon', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        image_link: {
            type: Sequelize.STRING,
            allowNull: false
        },
        color: {
            type: Sequelize.STRING,
            allowNull: false
        },
        category_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'icon'
    })
}