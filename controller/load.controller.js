const db = require("../db")
const CategoryController = require('./category.controller')
const TransactionController = require('./transaction.controller')
const IconController = require('./icon.controller')
const DefaultCategories_Controller = require('./defaultCategory.controller')
const GoalController = require('./goal.controller')
const RemainderController = require('./remainder.controller')
const FormattedDate = require('../module/FormattedDate')
const { sequelize } = require('../db')
const avatarsController = require("./avatars.controller")
class LoadController {

    async LoadData(req, res) {
        console.log("\n\n\n\n\n\nLOAD START\n\n")
        console.log("req in load",req.params)
        try {
            await sequelize.query("SET SESSION wait_timeout = 400;");
            await sequelize.query("SET SESSION interactive_timeout = 400;");
            const transactions = await TransactionController.getTransactionsByUserID(req, res, true)
            const categoriesByUserID = await CategoryController.getCategoryByUserID(req, res,true)
            const icons = await IconController.getIcons(req,res,true)
            const default_categories = await DefaultCategories_Controller.getDefaultCategories(req,res,true)
            const goalsByUserID = await GoalController.getGoalByUserID(req,res,true)
            const remaindersByUserID = await RemainderController.getRemainderByUserID(req,res,true)
            const avatar = await avatarsController.GetAvatarByID(req,res,true)
            const combinedTransactions = []
            if(transactions != null){
                for (const transaction of transactions) {
                    for (const category of categoriesByUserID) {
                        if (transaction.category_id === category.id) {
                            const formattedDate = FormattedDate.toDate(transaction.date)
                            combinedTransactions.push({
                                'x': category.name,
                                'y': transaction.cash,
                                'fill': category.color,
                                'id': transaction.id,
                                'comment': transaction.comment,
                                'image_link': category.image_link,
                                'image_color': category.image_color,
                                'isIncome': transaction.isIncome,
                                'date': formattedDate,
                                'category_id': category.id
                            })
                        }
                    }
                }
            }
            const data={
                category:categoriesByUserID,
                avatar:avatar,
                icons:icons,
                default_categories:default_categories,
                goal:goalsByUserID,
                remainder:remaindersByUserID,
                transaction:combinedTransactions
            }
            res.status(200).send(data)
        } catch (err) {
            res.status(400).send(err.message)
        }
    }
}

module.exports = new LoadController()
