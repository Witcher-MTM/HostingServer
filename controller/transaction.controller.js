const { Transaction } = require("../db/index")
const db = require("../db")
const CategoryController = require('./category.controller')
const FormattedDate = require('../module/FormattedDate')
class TransactionController {
  async getTransactions(req, res) {
    const combinedTransactions = []
    try {
      const result = await Transaction.findAll()
      const categories = await CategoryController.getCategories(req, res, true)
      if (!categories) {
        throw new Error('Categories not found')
      }
      for (const transaction of result) {
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

      return res.status(200).send(combinedTransactions)
    } catch (err) {
      return res.status(400).send(err.message)
    }

  }
  async addTransaction(req, res) {
    var combinedTransaction = {};
    const { category_id, user_id, date, comment, cash, isIncome } = req.body
    try {
      const result = await Transaction.create({
        category_id: category_id,
        user_id: user_id,
        date: date,
        comment: comment,
        cash: cash,
        isIncome: isIncome,
      })
      const categories = await CategoryController.getCategories(req, res, true)
      if (!categories) {
        throw new Error('Categories not found')
      }
      for (const category of categories) {
        if (result.category_id === category.id) {
          const formattedDate = FormattedDate.toDate(result.date)
          combinedTransaction = ({
            'x': category.name,
            'y': result.cash,
            'fill': category.color,
            'id': result.id,
            'comment': result.comment,
            'image_link': category.image_link,
            'image_color': category.image_color,
            'isIncome': result.isIncome,
            'date': formattedDate,
            'category_id': category.id
          })
        }
      }
      return res.status(200).send(combinedTransaction)
    } catch (err) {
      return res.status(400).send(err.message)
    }
  }
  async deleteTransactionByID(req, res) {
    await Transaction.destroy({
      where: {
        id: req.params.transaction_id,
      },
    })
      .then((result) => {
        if (result === 0) {
          return res
            .status(400)
            .send("Transaction with id " + req.params.transaction_id + " not found.")
        }
        return res
          .status(200)
          .send(
            "Transaction with id " +
            req.params.transaction_id +
            " was deleted successfully."
          )
      })
      .catch((err) => {
        return res.status(400).send(err.message)
      })
  }
  async patchTransactionByID(req, res) {
    await Transaction.findOne({
      where: {
        id: req.params.transaction_id,
      },
    })
      .then((result) => {
        if (result === 0) {
          return res
            .status(400)
            .send("Transaction with id " + req.params.transaction_id + " not found.")
        } else {
          const { category_id, user_id, date, comment, cash, isIncome } =
            req.body
          Transaction.update(
            {
              category_id: category_id ?? db.sequelize.literal("category_id"),
              user_id: user_id ?? db.sequelize.literal("user_id"),
              date: date ?? db.sequelize.literal("date"),
              comment: comment ?? db.sequelize.literal("comment"),
              cash: cash ?? db.sequelize.literal("cash"),
              isIncome: isIncome ?? db.sequelize.literal("isIncome"),
            },
            {
              where: {
                id: req.params.transaction_id,
              },
            }
          )
          return res.status(200).send("Transaction with ID: " + req.params.transaction_id + " was changed successful")
        }
      })
      .catch((err) => {
        return res.status(400).send(err.message)
      })
  }
  async getTransactionsByUserID(req, res, isLocal) {

    const result = await Transaction.findAll({
      where: {
        user_id: req.body == null ? req.body.user_id : req.params.user_id,
      },
    })
    if (result.length > 0) {
      if (isLocal) {
        return result
      }
      return res.status(200).send(result)
    } else {
      return res
        .status(400)
        .send("User with id: " + req.params.user_id + " haven't any transaction")
    }
  }
  async getTransactionByID(req, res) {
    await Transaction.findOne({
      where: {
        id: req.params.transaction_id,
      },
    })
      .then((result) => {
        if (result) {
          return res.status(200).send(result)
        } else {
          return res
            .status(400)
            .send("Transaction with " + req.params.transaction_id + " id not found")
        }
      })
      .catch((err) => {
        return res.status(400).send(err.message)
      })
  }
}
module.exports = new TransactionController()
