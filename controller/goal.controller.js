const {Goal} = require('../db/index')
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
        const { user_id, name, cash, deadline, color } = req.body
        try {
            const result = await Goal.create({
                user_id: user_id,
                name: name,
                cash:cash,
                deadline:deadline,
                color:color,
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
        await Goal.findOne({
            where: {
                id: req.params.goal_id,
            },
        })
            .then((result) => {
                if (result === 0) {
                    return res
                        .status(400)
                        .send("Goal with id " + req.params.goal_id + " not found.")
                } else {
                    const { user_id, name, cash, deadline, color } = req.body
                    Goal.update(
                        {
                            user_id: user_id ?? db.sequelize.literal("user_id"),
                            name: name ?? db.sequelize.literal("name"),
                            cash:cash ?? db.sequelize.literal("cash"),
                            deadline:deadline ?? db.sequelize.literal("deadline"),
                            color:color ?? db.sequelize.literal("color"),
                        },
                        {
                            where: {
                                id: req.params.goal_id,
                            },
                        }
                    )
                    return res.status(200).send("Goal with ID: " + req.params.goal_id + " was changed successful")
                }
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
    async getGoalByUserID(req, res) {
        await Goal.findAll({
            where: {
                user_id: req.params.user_id,
            },
        })
            .then((result) => {
                if (result.length > 0) {
                    return res.status(200).send(result)
                } else {
                    return res
                        .status(400)
                        .send("User with " + req.params.user_id + " haven't Goals")
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