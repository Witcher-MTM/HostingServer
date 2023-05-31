const { Category } = require("../db/index")
const db = require("../db")
const { Op } = require('sequelize');
class CategoryController {
    async getCategories(req, res, local) {
        const result = await Category.findAll({
            where: {
                image_link: {
                    [Op.not]: "tmp"
                }
            }
        }).catch((err) => {
            return res.status(400).send(err.message);
        })
        if (local) {
            return result;
        } else {
            return res.status(200).send(result);
        }
    }
    async addCategory(req, res) {
        const { uid, name, image_link, image_color, color, lastUsed, isIncome } = req.body
        try {
            const result = await Category.create({
                uid: uid,
                name: name,
                image_link: image_link,
                image_color: image_color,
                color: color,
                lastUsed: lastUsed,
                isIncome: isIncome
            })
            return res.status(200).send(result)
        } catch (error) {
            return res.status(400).send(error.message)
        }
    }
    async deleteCategoryByID(req, res) {
        try {
            const result = await Category.destroy({
                where: {
                    id: req.params.category_id,
                },
            })

            if (result === 0) {
                return res.status(400).send("Category with id " + req.params.category_id + " not found.")
            }
            else {
                return res.status(200).send("Category with id " + req.params.category_id + " deleted")
            }
        } catch (error) {
            return res.status(400).send(error.message)
        }
    }
    async patchCategoryByID(req, res) {
        try {
            const result = await Category.findOne({
                where: {
                    id: req.params.category_id,
                },
            })
            if (result === 0) {
                return res
                    .status(400)
                    .send("Category with id " + req.params.category_id + " not found.")
            } else {
                const { uid, name, image_link, image_color, color, lastUsed, isIncome } = req.body
                Category.update(
                    {
                        uid: uid ?? db.sequelize.literal("uid"),
                        name: name ?? db.sequelize.literal("name"),
                        image_link: image_link ?? db.sequelize.literal("image_link"),
                        image_color: image_color ?? db.sequelize.literal("image_color"),
                        color: color ?? db.sequelize.literal("color"),
                        lastUsed: lastUsed ?? db.sequelize.literal("lastUsed"),
                        isIncome: isIncome ?? db.sequelize.literal("isIncome"),
                    },
                    {
                        where: {
                            id: req.params.category_id,
                        },
                    }
                )
                return res.status(200).send("Category with ID: " + req.params.category_id + " was changed successful")
            }
        } catch (error) {
            return res.status(400).send(error.message)
        }
    }
    async getCategoryByUserID(req, res) {
        console.log(req.params.uid)
        try {
            const result = await Category.findAll({
                where: {
                    uid: req.params.uid,
                },
            })
            if (result.length > 0) {
                return res.status(200).send(result)
            } else {
                return res
                    .status(400)
                    .send("User with id: " + req.params.uid + " haven't any Category")
            }
        } catch (error) {
            return res.status(400).send(error.message)
        }
    }
    async getCategoryByID(req, res) {
        try {
            const result = await Category.findOne({
                where: {
                    id: req.params.category_id,
                },
            })
            if (result === 0) {
                return res
                    .status(400)
                    .send("Category with id: " + req.params.category_id + " not found")
            } else {
                return res.status(200).send(result)
            }
        } catch (error) {
            return res.status(400).send(error.message)
        }
    }
}

module.exports = new CategoryController()
