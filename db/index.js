const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER,process.env.DB_PASS,{
    dialect:"mysql",
    host:process.env.DB_HOST
})

const Account = require('./models/Account')(sequelize)
const Category = require('./models/Category')(sequelize)
const Goal = require('./models/Goal')(sequelize)
const Remainder = require('./models/Remainder')(sequelize)
const Transaction = require('./models/Transaction')(sequelize)
const User = require('./models/User')(sequelize)
const DefaultCategory = require('./models/DefaultCategory')(sequelize)
const Icon = require('./models/Icon')(sequelize)
const Avatar = require('./models/Avatar')(sequelize)
Object.freeze(sequelize)
module.exports = {
    sequelize: sequelize,
    Account : Account,
    Category : Category,
    Goal : Goal,
    Remainder : Remainder,
    Transaction : Transaction,
    User : User,
    DefaultCategory:DefaultCategory,
    Icon:Icon,
    Avatar:Avatar
}
