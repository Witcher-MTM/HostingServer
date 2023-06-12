const { Transaction } = require("../db/index")
const db = require("../db")
const CategoryController = require('./category.controller')
const { sequelize } = require('../db')
const moment = require("moment")

class TransactionController {
  async getTransactions(req, res) {
    const combinedTransactions = []
    try {
      const result = await Transaction.findAll()
      const categories = await CategoryController.getCategories(req, res, true)
      for (const transaction of result) {
        for (const category of categories) {
          if (transaction.category_id === category.id) {
            combinedTransactions.push({
              'x': category.name,
              'y': transaction.cash,
              'fill': category.color,
              'id': transaction.id,
              'comment': transaction.comment,
              'image_link': category.image_link,
              'image_color': category.image_color,
              'isIncome': transaction.isIncome,
              'date': moment(transaction.date).format("YYYY-MM-DD"),
              'category_id': category.id
            })
          }
        }
      }
      return res.status(200).send(combinedTransactions)
    } catch (err) {
      console.log(err.message)
      return res.status(400).send(err.message)
    }

  }
  async addTransaction(req, res) {
    var combinedTransaction = {};
    const { category_id, uid, date, comment, cash, isIncome } = req.body
    try {
      await sequelize.query("SET SESSION wait_timeout = 100;");
      await sequelize.query("SET SESSION interactive_timeout = 100;");
      const result = await Transaction.create({
        category_id: category_id,
        uid: uid,
        date: date,
        comment: comment,
        cash: cash,
        isIncome: isIncome,
      })
      console.log('result transaction', result)
      const categories = await CategoryController.getCategoryByUserID(req, res, true)
      for (const category of categories) {
        if (result.category_id === category.id) {
          combinedTransaction = {
            'x': category.name,
            'y': result.cash,
            'fill': category.color,
            'id': result.id,
            'comment': result.comment,
            'image_link': category.image_link,
            'image_color': category.image_color,
            'isIncome': result.isIncome,
            'date': moment(result.date).format("YYYY-MM-DD"),
            'category_id': category.id
          }
        }
      }
      console.log("\n\n\n\nCombined", combinedTransaction)
      return res.status(200).send(combinedTransaction)
    } catch (err) {
      console.log(err.message)
      return res.status(400).send(err.message)
    }
  }
  async deleteTransactionByID(req, res) {
    try {
      const result = await Transaction.destroy({
        where: {
          id: req.params.transaction_id,
        },
      })
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
    } catch (error) {
      return res.status(400).send(err.message)
    }
  }
  async patchTransactionByID(req, res) {
    try {
      const result = await Transaction.findOne({
        where: {
          id: req.params.transaction_id,
        },
      })
          if (result === 0) {
            return res
              .status(400)
              .send("Transaction with id " + req.params.transaction_id + " not found.")
          } else {
            const { category_id, uid, date, comment, cash, isIncome } = req.body
            await sequelize.query("SET SESSION wait_timeout = 100;");
            await sequelize.query("SET SESSION interactive_timeout = 100;");
            await Transaction.update(
              {
                category_id: category_id ?? db.sequelize.literal("category_id"),
                uid: uid ?? db.sequelize.literal("uid"),
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
            ).then(() => {
              return res.status(200).send("Transaction with ID: " + req.params.transaction_id + " was changed successful")
            })
          }    
    } catch (error) {
      return res.status(400).send(err.message)
    }

  }
  async getTransactionsByUserID(req, res, isLocal) {

    const result = await Transaction.findAll({
      where: {
        uid: req.params.uid ? req.params.uid : req.body.uid,
      },
    })
    if (result.length > 0) {
      if (isLocal) {
        return result
      } else {
        return res.status(200).send(result)
      }
    } else {
      if (isLocal) {
        return null
      }
      else {
        return res
          .status(400)
          .send("User with id: " + req.params.uid + " haven't any transaction")
      }
    }
  }
  async getTransactionByID(req, res) {
    try {
      const result = await Transaction.findOne({
        where: {
          id: req.params.transaction_id,
        },
      })
          if (result) {
            return res.status(200).send(result)
          } else {
            return res
              .status(400)
              .send("Transaction with " + req.params.transaction_id + " id not found")
          }
    } catch (error) {
      return res.status(400).send(err.message)
    }
  }
}
module.exports = new TransactionController()
