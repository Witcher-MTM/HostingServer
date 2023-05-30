const { User, Category, DefaultCategory, Account } = require("../db/index")
const db = require("../db")
const { generateTokens } = require("../module/Token");
class UserController {
    async getUsers(req, res) {
        await User.findAll()
            .then((result) => {
                return res.status(200).send(result)
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
    async addUser(req, res, isLocal) {
        const {uid,email,emailVerified,createdAt,lastLoginAt,apiKey} = req.body
        const { accessToken, refreshToken } = await generateTokens(uid,email,createdAt)
        try {
            await User.findOne({
                where: {
                    email: email
                }
            }).then((candidate) => {
                if (candidate) {
                    return res.status(403).send("That email is taken")
                }
            })
            const result = await User.create({
                uid:uid,
                email: email,
                emailVerified: emailVerified,
                createdAt: createdAt,
                lastLoginAt: lastLoginAt,
                apiKey:apiKey,
                accesstoken:accessToken,
                refreshtoken:refreshToken
            })
            const default_categories = await DefaultCategory.findAll()
            for (const default_category of default_categories) {
                Category.create({
                    uid: result.uid,
                    name: default_category.name,
                    image_link: default_category.image_link,
                    image_color: default_category.image_color,
                    color: default_category.color,
                    lastUsed: null,
                    isIncome: default_category.isIncome
                })
            }
            Account.create({
                uid: result.uid,
                name: "Total",
                cash: 0
            })
            if (isLocal) {
                return result
            }
            return res.status(200).send(result)
        } catch (err) {
            return res.send(err.message)
        }
    }
    async deleteUserByID(req, res) {
        await User.destroy({
            where: {
                id: req.params.uid,
            },
        })
            .then((result) => {
                if (result === 0) {
                    return res
                        .status(400)
                        .send("User with id " + req.params.uid + " not found.")
                }
                return res
                    .status(200)
                    .send(
                        "User with id " +
                        req.params.uid +
                        " was deleted successfully."
                    )
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
    async patchUserByID(req, res) {
        await User.findOne({
            where: {
                id: req.params.uid,
            },
        })
            .then((result) => {
                if (result === 0) {
                    return res
                        .status(400)
                        .send("User with id " + req.params.uid + " not found.")
                } else {
                    const {uid,email,emailVerified,createdAt,lastLoginAt,apiKey} = req.body
                    User.update(
                        {
                            uid: uid ?? db.sequelize.literal("uid"),
                            email: email ?? db.sequelize.literal("email"),
                            emailVerified: emailVerified ?? db.sequelize.literal("emailVerified"),
                            createdAt: createdAt ?? db.sequelize.literal("createdAt"),
                            lastLoginAt: lastLoginAt ?? db.sequelize.literal("lastLoginAt"),
                            apiKey: apiKey ?? db.sequelize.literal("apiKey"),
                        },
                        {
                            where: {
                                id: req.params.uid,
                            },
                        }
                    )
                    return res.status(200).send("User with ID: " + req.params.uid + " was changed successful")
                }
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
    async getUserByID(req, res) {
        await User.findOne({
            where: {
                id: req.params.uid,
            },
        })
            .then((result) => {
                if (result) {
                    return res.status(200).send(result)
                } else {
                    return res
                        .status(400)
                        .send("User with id: " + req.params.uid + " not found")
                }
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
    async getUserByEmail(req, res, isLocal) {
        try {
            const result = await User.findOne({
                where: {
                    email: req.params.email ?? req.body.email,
                },
            })
            if (isLocal) {
                return result
            }
            else {
                return res.status(200).send(result)
            }
        } catch (err) {
            return res.status(400).send(err.message)
        }

    }
}

module.exports = new UserController()