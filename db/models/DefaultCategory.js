const Sequelize = require('sequelize')

module.exports = function (sequelize) {
    return sequelize.define('default_category', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
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
        isIncome: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'default_category'
    })
}