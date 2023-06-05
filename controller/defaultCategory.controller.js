const { DefaultCategory } = require("../db/index")
const db = require("../db")
class DefaultCategoryController {
    async getDefaultCategories(req, res,isLocal) {
        try {
            const result = await DefaultCategory.findAll()      
            if(isLocal){
                return result
            }
            return res.status(200).send(result)
        } catch (error) {
            if(isLocal){
                return null
            }
            return res.status(400).send(err.message)
        }
    }
    async addCategory(req, res) {
        const { name, image_link, image_color, color, isIncome } = req.body
        try {
            const result = await DefaultCategory.create({
                name: name,
                image_link: image_link,
                image_color: image_color,
                color: color,
                isIncome: isIncome,
            })
            return res.status(200).send(result)
        } catch (err) {
            return res.status(400).send(err.message)
        }
    }
    async deleteDefaultCategoryByID(req, res) {
        await DefaultCategory.destroy({
            where: {
                id: req.params.defaultcategory_id,
            },
        })
            .then((result) => {
                if (result === 0) {
                    return res
                        .status(400)
                        .send("Default category with id " + req.params.defaultcategory_id + " not found.")
                }
                return res
                    .status(200)
                    .send(
                        "Default category with id " +
                        req.params.defaultcategory_id +
                        " was deleted successfully."
                    )
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
    async patchDefaultCategoryByID(req, res) {
        await DefaultCategory.findOne({
            where: {
                id: req.params.defaultcategory_id,
            },
        })
            .then((result) => {
                if (result === 0) {
                    return res
                        .status(400)
                        .send("Default category with id " + req.params.defaultcategory_id + " not found.")
                } else {
                    const { name, image_link, image_color, color, isIncome } = req.body
                    DefaultCategory.update(
                        {
                            name: name ?? db.sequelize.literal("name"),
                            image_link: image_link ?? db.sequelize.literal("image_link"),
                            image_color: image_color ?? db.sequelize.literal("image_color"),
                            color: color ?? db.sequelize.literal("color"),
                            isIncome: isIncome ?? db.sequelize.literal("isIncome"),
                        },
                        {
                            where: {
                                id: req.params.defaultcategory_id,
                            },
                        }
                    )
                    return res.status(200).send("Default category with ID: " + req.params.defaultcategory_id + " was changed successful")
                }
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
    async getDefaultCategoryByID(req, res) {
        await DefaultCategory.findOne({
            where: {
                id: req.params.defaultcategory_id,
            },
        })
            .then((result) => {
                if (result) {
                    return res.status(200).send(result)
                } else {
                    return res
                        .status(400)
                        .send("Default category with id: " + req.params.defaultcategory_id + " not found")
                }
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
}

module.exports = new DefaultCategoryController()
