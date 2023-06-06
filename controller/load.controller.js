const db = require("../db")
const CategoryController = require('./category.controller')
const TransactionController = require('./transaction.controller')
const IconController = require('./icon.controller')
const DefaultCategories_Controller = require('./defaultCategory.controller')
const GoalController = require('./goal.controller')
const RemainderController = require('./remainder.controller')
const FormattedDate = require('../module/FormattedDate')
class LoadController {

    async LoadData(req, res) {
        try {
            const transactions = await TransactionController.getTransactionsByUserID(req, res, true)
            const categories = await CategoryController.getCategories(req, res, true)
            const categoriesByUserID = await CategoryController.getCategoryByUserID(req, res,true)
            const icons = await IconController.getIcons(req,res,true)
            const default_categories = await DefaultCategories_Controller.getDefaultCategories(req,res,true)
            const goalsByUserID = await GoalController.getGoalByUserID(req,res,true)
            const remaindersByUserID = await RemainderController.getRemainderByUserID(req,res,true)
            const combinedTransactions = []
            for (const transaction of transactions) {
                for (const category of categories) {
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
            const data={
                category:categoriesByUserID,
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
