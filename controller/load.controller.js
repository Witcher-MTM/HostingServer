const db = require("../db")
const CategoryController = require('./category.controller')
const TransactionController = require('./transaction.controller')
const FormattedDate = require('../module/FormattedDate')
class LoadController {

    async combineTransactions(req, res) {
        try {
            const transactions = await TransactionController.getTransactionsByUserID(req, res, true)
            const categories = await CategoryController.getCategories(req, res, true)
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
            res.status(200).send(combinedTransactions)
        } catch (err) {
            res.status(400).send(err.message)
        }
    }
}

module.exports = new LoadController()
