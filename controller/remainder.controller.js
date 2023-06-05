const { Remainder } = require('../db/index')
const db = require("../db")
const CategoryController = require('./category.controller')
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
                cash: cash,
                dateRemainde: dateRemainde,
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
                            cash: cash ?? db.sequelize.literal("cash"),
                            dateRemainde: dateRemainde ?? db.sequelize.literal("dateRemainde")
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
    async getRemainderByUserID(req, res,isLocal) {
        const combinedRemainders = []
        try {
            const categories = await CategoryController.getCategories(req, res, true)
            const result = await Remainder.findAll({
                where: {
                    uid: req.params.uid,
                },
            })
            if (result.length > 0) {
                for (const remainder of result) {
                    for (const category of categories) {
                      if (remainder.category_id === category.id) {
                        combinedRemainders.push({
                           'id': remainder.id,
                          'uid': remainder.uid,
                          'category_id': remainder.category_id,
                          'name': remainder.name,
                          'cash': remainder.cash,
                          'dateRemainde':remainder.dateRemainde,
                          'image_link': category.image_link,
                          'image_color': category.image_color,
                          'color':category.color
                        })
                      }
                    }
                  }
                  if(isLocal){
                    return combinedRemainders
                  }
                return res.status(200).send(combinedRemainders)
            } else {
                if(isLocal){
                    return null
                  }
                return res
                    .status(400)
                    .send("User with " + req.params.uid + " haven't remainders")
            }
        } catch (error) {
            return res.status(400).send(error.message)
        }

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
                        .send("Remainder with " + req.params.remainder_id + " id not found")
                }
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
}


module.exports = new RemainderController()