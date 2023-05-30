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
        const result = await Category.create({
            uid: uid,
            name: name,
            image_link: image_link,
            image_color: image_color,
            color: color,
            lastUsed: lastUsed,
            isIncome: isIncome
        }).then((result) => {
            return res.status(200).send(result)
        }).catch((err) => {
            return res.status(400).send(err.message)
        })
    }
    async deleteCategoryByID(req, res) {
        await Category.destroy({
            where: {
                id: req.params.category_id,
            },
        })
            .then((result) => {
                if (result === 0) {
                    return res
                        .status(400)
                        .send("Category with id " + req.params.category_id + " not found.")
                }
                return res
                    .status(200)
                    .send(
                        "Category with id " +
                        req.params.category_id +
                        " was deleted successfully."
                    )
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
    async patchCategoryByID(req, res) {
        await Category.findOne({
            where: {
                id: req.params.category_id,
            },
        })
            .then((result) => {
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
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
    async getCategoryByUserID(req, res) {
        await Category.findAll({
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
                        .send("User with id: " + req.params.uid + " haven't any Category")
                }
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
    async getCategoryByID(req, res) {

        await Category.findOne({
            where: {
                id: req.params.category_id,
            },
        })
            .then((result) => {
                if (result) {
                    return res.status(200).send(result)
                } else {
                    return res
                        .status(400)
                        .send("Category with id: " + req.params.category_id + " not found")
                }
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })

    }
}

module.exports = new CategoryController()
