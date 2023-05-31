const { Account } = require("../db/index")
const db = require("../db")
const { Op } = require('sequelize');
const FomrattedDate = require('../module/FormattedDate')
class AccountController {
    async getAccounts(req, res) {
        try {
            const result = await Account.findAll()
            return res.status(200).send(result)
        } catch (error) {
            return res.status(400).send(error.message)
        }
    }
    async getAccountByID(req, res) {
        try {
            const result = await Account.findOne({
                where: {
                    id: req.params.account_id,
                },
            })
            if (result == 0) {
                return res.status(200).send(result)
            } else {
                return res.status(400).send("Account with id: " + req.params.account_id + " not found")
            }
        } catch (error) {
            return res.status(400).send(error.message)
        }
    }
    async getAccountsByUserID(req, res) {
        try {
            const result = await Account.findAll({
                where: {
                    uid: req.params.uid,
                },
            })
            if (result) {
                return res.status(200).send(result)
            } else {
                return res.status(400).send("User with id:" + req.params.account_id + " hasn't no one Account")
            }
        } catch (error) {
            return res.status(400).send(error.message)
        }
    }
    async addAccounts(req, res) {
        const { uid, name, cash } = req.body
        try {
            const result = await Account.create({
                uid: uid,
                name: name,
                cash: cash,
            })
            return res.status(200).send(result)
        } catch (error) {
            return res.status(400).send(error.message)
        }
    }
    async deleteAccountByID(req, res) {
        try {
            const result = await Account.destroy({
                where: {
                    id: req.params.account_id,
                    name: {
                        [Op.not]: "Total"
                    }
                },
            })
            if (result === 0) {
                return res.status(400).send("Account with id " + req.params.account_id + " not found. Or it has name 'Total'")
            }
            return res.status(200).send("Account with id " + req.params.account_id + " was deleted successfully.")
        } catch (error) {
            return res.status(400).send(error.message)
        }
    }
    async patchAccountByID(req, res) {
        const { uid, name, cash } = req.body

        try {
            const result = await Account.update(
                {
                    uid: uid ?? db.sequelize.literal("uid"),
                    name: name ?? db.sequelize.literal("name"),
                    cash: cash ?? db.sequelize.literal("cash"),
                },
                {
                    where: {
                        id: req.params.account_id,
                    },
                }
            )
            return res.status(200).send("Account with ID: " + req.params.account_id + " was changed successful")
        } catch (error) {
            return res.status(400).send(error.message)
        }
    }
}

module.exports = new AccountController()