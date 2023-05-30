const { Account } = require("../db/index")
const db = require("../db")
const { Op } = require('sequelize');
const FomrattedDate = require('../module/FormattedDate')
class AccountController {
    async getAccounts(req, res) {
        await Account.findAll()
            .then((result) => {
                return res.status(200).send(result)
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })

    }
    async getAccountByID(req, res) {
        await Account.findOne({
            where: {
                id: req.params.account_id,
            },
        })
            .then((result) => {
                if (result) {
                    return res.status(200).send(result)
                } else {
                    return res
                        .status(400)
                        .send("Account with id: " + req.params.account_id + " not found")
                }
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
    async getAccountsByUserID(req, res) {

        await Account.findAll({
            where: {
                uid: req.params.uid,
            },
        })
            .then((result) => {
                if (result) {
                    return res.status(200).send(result)
                } else {
                    return res
                        .status(400)
                        .send("User with id:" + req.params.account_id + " hasn't no one Account")
                }
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
    async addAccounts(req, res) {
        const { uid, name, cash } = req.body
        await Account.create({
            uid: uid,
            name: name,
            cash: cash,
        }).then((result) => {

            return res.status(200).send(result)
        }).catch((err) => {
            return res.status(400).send(err.message)
        })
    }
    async deleteAccountByID(req, res) {
        await Account.destroy({
            where: {
                id: req.params.account_id,
                name: {
                    [Op.not]: "Total"
                }
            },
        })
            .then((result) => {
                if (result === 0) {
                    return res
                        .status(400)
                        .send("Account with id " + req.params.account_id + " not found. Or it has name 'Total'")
                }
                return res
                    .status(200)
                    .send(
                        "Account with id " +
                        req.params.account_id +
                        " was deleted successfully."
                    )
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
            

    }
    async patchAccountByID(req, res) {
        const { uid, name, cash } = req.body

        await Account.update(
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
        ).then(() => {
            return res.status(200).send("Account with ID: " + req.params.account_id + " was changed successful")
        }).catch((err) => {
            return res.status(400).send(err.message)
        })
    }
}

module.exports = new AccountController()