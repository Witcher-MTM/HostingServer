const {Remainder} = require('../db/index')
const db = require("../db")

class RemainderController {
    async getRemainders(req, res) {
        await Remainder.findAll()
            .then((result) => {
                return res.status(200).send(result)
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
    async addRemainder(req, res) {
        const { uid, category_id, name, cash, dateRemainde } = req.body
        try {

            const result = await Remainder.create({
                uid: uid,
                category_id: category_id,
                name: name,
                cash:cash,
                dateRemainde:dateRemainde,
            })
            return res.status(200).send(result)
        } catch (err) {
            return res.status(400).send(err.message)
        }
    }
    async deleteRemainderByID(req, res) {
        await Remainder.destroy({
            where: {
                id: req.params.remainder_id,
            },
        })
            .then((result) => {
                if (result === 0) {
                    return res
                        .status(400)
                        .send("Remainder with id " + req.params.remainder_id + " not found.")
                }
                return res
                    .status(200)
                    .send(
                        "Remainder with id " +
                        req.params.remainder_id +
                        " was deleted successfully."
                    )
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
    async patchRemainderByID(req, res) {
        await Remainder.findOne({
            where: {
                id: req.params.remainder_id,
            },
        })
            .then((result) => {
                if (result === 0) {
                    return res
                        .status(400)
                        .send("Remainder with id " + req.params.remainder_id + " not found.")
                } else {
                    const { uid, category_id, name, cash, dateRemainde } = req.body
                    Remainder.update(
                        {
                            uid: uid ?? db.sequelize.literal("uid"),
                            category_id: category_id ?? db.sequelize.literal("category_id"),
                            name: name ?? db.sequelize.literal("name"),
                            cash:cash ?? db.sequelize.literal("cash"),
                            dateRemainde:dateRemainde ?? db.sequelize.literal("dateRemainde")
                        },
                        {
                            where: {
                                id: req.params.remainder_id,
                            },
                        }
                    )
                    return res.status(200).send("Remainder with ID: " + req.params.remainder_id + " was changed successful")
                }
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
    async getRemainderByUserID(req, res) {
        await Remainder.findAll({
            where: {
                uid: req.params.uid,
            },
        })
            .then((result) => {
                if (result.length > 0) {
                    return res.status(200).send(result)
                } else {
                    return res
                        .status(400)
                        .send("User with " + req.params.uid + " haven't remainders")
                }
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
    async getRemainderByID(req, res) {
        await Remainder.findOne({
            where: {
                id: req.params.remainder_id,
            },
        })
            .then((result) => {
                if (result) {
                    return res.status(200).send(result)
                } else {
                    return res
                        .status(400)
                        .send("Remainder with "+ req.params.remainder_id + " id not found")
                }
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
}


module.exports = new RemainderController()