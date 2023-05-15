const { Account } = require("../db/index")
const db = require("../db")
const { Op } = require('sequelize');
const logger = require('../module/Logger')
const FomrattedDate = require('../module/FormattedDate')
class AccountController {
    async getAccounts(req, res) {
        logger.writeLog(logger.regexSymbol('-',50),"info")
        logger.writeLog(`start getaccounts at ${FomrattedDate.toDateTimeSeconds(new Date())}`,"info")
        await Account.findAll()
            .then((result) => {
                logger.writeLog(`send info at ${FomrattedDate.toDateTimeSeconds(new Date())}`,"info")
                return res.status(200).send(result)
            })
            .catch((err) => {
                logger.writeLog(`Error at ${FomrattedDate.toDateTimeSeconds(new Date())}\nmessage: ${err.message}`,"error")
                return res.status(400).send(err.message)
            })
            
        logger.writeLog(`end getAccounts at ${FomrattedDate.toDateTimeSeconds(new Date())}`,"info")
        logger.writeLog(logger.regexSymbol('-',50),"info")
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
                user_id: req.params.user_id,
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

        const { user_id, name, cash } = req.body
        try {
            const result = await Account.create({
                user_id: user_id,
                name: name,
                cash: cash,
            })
            return res.status(200).send(result)
        } catch (err) {
            return res.status(400).send(err.message)
        }
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
        const { user_id, name, cash } =
            req.body
        try {
            await Account.update(
                {
                    user_id: user_id ?? db.sequelize.literal("user_id"),
                    name: name ?? db.sequelize.literal("name"),
                    cash: cash ?? db.sequelize.literal("cash"),
                },
                {
                    where: {
                        id: req.params.account_id,
                    },
                }
            ).then(()=>{
                return res.status(200).send("Account with ID: " + req.params.account_id + " was changed successful")
            })
        } catch (err) {
            return res.status(400).send(err.message)
        }
    }
}

module.exports = new AccountController()