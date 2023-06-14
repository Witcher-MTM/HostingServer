const { Icon } = require("../db/index")
const db = require("../db")
class IconController {
    async getIcons(req, res,isLocal) {
        try {
            const result = await Icon.findAll()
            if(isLocal){
                return result
            }
            return res.status(200).send(result)
            
        } catch (error) {
            if(isLocal){
                return null
            }
            return res.status(400).send()
        }
    }
    async addIcon(req, res) {
        const { image_link, color, category_id } = req.body
        try {
            const result = await Icon.create({
                image_link: image_link,
                color: color,
                category_id: category_id,
            })
            return res.status(200).send(result)
        } catch (err) {
            return res.status(400).send(err.message)
        }
    }
    async deleteIconByID(req, res) {
        await Icon.destroy({
            where: {
                id: req.params.icon_id,
            },
        })
            .then((result) => {
                if (result === 0) {
                    return res
                        .status(400)
                        .send("Icon with id " + req.params.icon_id + " not found.")
                }
                return res
                    .status(200)
                    .send(
                        "Icon with id " +
                        req.params.icon_id +
                        " was deleted successfully."
                    )
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
    async patchIconByID(req, res) {
        await Icon.findOne({
            where: {
                id: req.params.icon_id,
            },
        })
            .then((result) => {
                if (result === 0) {
                    return res
                        .status(400)
                        .send("Icon with id " + req.params.icon_id + " not found.")
                } else {
                    const { image_link, color, category_id } = req.body
                    Icon.update(
                        {
                            image_link: image_link ?? db.sequelize.literal("image_link"),
                            color: color ?? db.sequelize.literal("color"),
                            category_id: category_id ?? db.sequelize.literal("category_id"),
                        },
                        {
                            where: {
                                id: req.params.icon_id,
                            },
                        }
                    )
                    return res.status(200).send("Icon with ID: " + req.params.icon_id + " was changed successful")
                }
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
    async getIconByID(req, res) {
        await Icon.findOne({
            where: {
                id: req.params.icon_id,
            },
        })
            .then((result) => {
                if (result) {
                    return res.status(200).send(result)
                } else {
                    return res
                        .status(400)
                        .send("Icon with id: " + req.params.icon_id + " not found")
                }
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
    async getIconByCategoryID(req, res) {
        await Icon.findAll({
            where: {
                category_id: req.params.category_id,
            },
        })
            .then((result) => {
                if (result.length > 0) {
                    return res.status(200).send(result)
                } else {
                    return res
                        .status(400)
                        .send("Icon with category id: " + req.params.category_id + " not found")
                }
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
}

module.exports = new IconController()
