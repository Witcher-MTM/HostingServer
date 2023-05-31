const { Goal } = require('../db/index')
const db = require('../db')

class GoalController {
    async getGoal(req, res) {
        await Goal.findAll()
            .then((result) => {
                return res.status(200).send(result)
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
    async addGoal(req, res) {
        const { uid, category_id, name, cash, total_cash, last_income,deadline,date_last_income  } = req.body
        try {
            const result = await Goal.create({
                uid: uid,
                category_id: category_id,
                name: name,
                cash: cash,
                total_cash: total_cash,
                last_income: last_income,
                deadline: deadline,
                date_last_income:date_last_income
            })
            return res.status(200).send(result)
        } catch (err) {
            return res.status(400).send(err.message)
        }
    }
    async deleteGoalByID(req, res) {
        await Goal.destroy({
            where: {
                id: req.params.goal_id,
            },
        })
            .then((result) => {
                if (result === 0) {
                    return res
                        .status(400)
                        .send("Goal with id " + req.params.goal_id + " not found.")
                }
                return res
                    .status(200)
                    .send(
                        "Goal with id " +
                        req.params.goal_id +
                        " was deleted successfully."
                    )
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
    async patchGoalByID(req, res) {
        try {
            const result = await Goal.findOne({
                where: {
                    id: req.params.goal_id,
                },
            })
            if (!result) {
                return res.status(400).send("Goal with id " + req.params.goal_id + " not found.")
            } else {
                const { uid, category_id, name, cash, total_cash, last_income,deadline,date_last_income  } = req.body
                Goal.update(
                    {
                        uid: uid ?? db.sequelize.literal("uid"),
                        category_id: category_id ?? db.sequelize.literal("category_id"),
                        name: name ?? db.sequelize.literal("name"),
                        cash: cash ?? db.sequelize.literal("cash"),
                        total_cash: total_cash ?? db.sequelize.literal("total_cash"),
                        last_income: last_income ?? db.sequelize.literal("last_income"),
                        deadline: deadline ?? db.sequelize.literal("deadline"),
                        date_last_income: date_last_income ?? db.sequelize.literal("date_last_income")
                    },
                    {
                        where: {
                            id: req.params.goal_id,
                        },
                    }
                )
                return res.status(200).send("Goal with ID: " + req.params.goal_id + " was changed successful")
            }
        } catch (error) {
            return res.status(500).send(error.message)
        }
        
    }
    async getGoalByUserID(req, res) {
        await Goal.findAll({
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
                        .send("User with " + req.params.uid + " haven't Goals")
                }
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
    async getGoalByID(req, res) {
        await Goal.findOne({
            where: {
                id: req.params.goal_id,
            },
        })
            .then((result) => {
                if (result) {
                    return res.status(200).send(result)
                } else {
                    return res
                        .status(400)
                        .send("Goal with " + req.params.goal_id + " id not found")
                }
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
}


module.exports = new GoalController()