const { Category } = require("../db/index")
const db = require("../db")
const { Op } = require('sequelize');
const logger = require('../module/Logger')
const FomrattedDate = require('../module/FormattedDate')
class CategoryController {
    async getCategories(req, res, local) {
        console.log(logger.regexSymbol('-', 50), "info")
        console.log(`start getCategories at ${FomrattedDate.toDateTimeSeconds(new Date())}`, "info")
        const result = await Category.findAll({
            where: {
                image_link: {
                    [Op.not]: "tmp"
                }
            }
        }).then((result) => {
            if (local) {
                return result;
            } else {
                return res.status(200).send(result);
            }
        }).catch((err) => {
            return res.status(400).send(err.message);
        })
        console.log(`end getCategories at ${FomrattedDate.toDateTimeSeconds(new Date())}`, "info")
        console.log(logger.regexSymbol('-', 50), "info")
    }
    async addCategory(req, res) {
        console.log(logger.regexSymbol('-', 50), "info")
        console.log(`start addCategory at ${FomrattedDate.toDateTimeSeconds(new Date())}`, "info")
        const { user_id, name, image_link, image_color, color, lastUsed, isIncome } = req.body
        const result = await Category.create({
            user_id: user_id,
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
        console.log(`end addCategory at ${FomrattedDate.toDateTimeSeconds(new Date())}`, "info")
        console.log(logger.regexSymbol('-', 50), "info")
    }
    async deleteCategoryByID(req, res) {
        console.log(logger.regexSymbol('-', 50), "info")
        console.log(`start deleteCategoryByID at ${FomrattedDate.toDateTimeSeconds(new Date())}`, "info")
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
        console.log(`end deleteCategoryByID at ${FomrattedDate.toDateTimeSeconds(new Date())}`, "info")
        console.log(logger.regexSymbol('-', 50), "info")
    }
    async patchCategoryByID(req, res) {
        console.log(logger.regexSymbol('-', 50), "info")
        console.log(`start patchCategoryByID at ${FomrattedDate.toDateTimeSeconds(new Date())}`, "info")
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
                    const { user_id, name, image_link, image_color, color, lastUsed, isIncome } = req.body
                    Category.update(
                        {
                            user_id: user_id ?? db.sequelize.literal("user_id"),
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
        console.log(`end patchCategoryByID at ${FomrattedDate.toDateTimeSeconds(new Date())}`, "info")
        console.log(logger.regexSymbol('-', 50), "info")
    }
    async getCategoryByUserID(req, res) {
        console.log(logger.regexSymbol('-', 50), "info")
        console.log(`start getCategoryByUserID at ${FomrattedDate.toDateTimeSeconds(new Date())}`, "info")
        await Category.findAll({
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
                        .send("User with id: " + req.params.user_id + " haven't any Category")
                }
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
        console.log(`end getCategoryByUserID at ${FomrattedDate.toDateTimeSeconds(new Date())}`, "info")
        console.log(logger.regexSymbol('-', 50), "info")
    }
    async getCategoryByID(req, res) {
        console.log(logger.regexSymbol('-', 50), "info")
        console.log(`start getCategoryByID at ${FomrattedDate.toDateTimeSeconds(new Date())}`, "info")
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
        console.log(`end getCategoryByID at ${FomrattedDate.toDateTimeSeconds(new Date())}`, "info")
        console.log(logger.regexSymbol('-', 50), "info")
    }
}

module.exports = new CategoryController()
