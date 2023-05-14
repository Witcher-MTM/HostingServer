const { User, Category, DefaultCategory } = require("../db/index")
const db = require("../db")
const bcrypt = require("bcrypt");
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
    async addUser(req, res,isLocal) {
        var { email, password, isConfirmed } = req.body
        try {
            const candidate = await User.findOne({
                where:{
                    email:email
                }
            })
            if(candidate){
                return res.status(403).send("That email is taken")
            }
            const Hashpassword = await bcrypt.hashSync(password,8)
            const result = await User.create({
                email: email,
                password: Hashpassword,
                isConfirmed: isConfirmed ?? false
            })
            const default_categories = await DefaultCategory.findAll()
                for(const default_category of default_categories){
                    await Category.create({
                        user_id:result.id,
                        name:default_category.name,
                        image_link:default_category.image_link,
                        image_color:default_category.image_color,
                        color:default_category.color,
                        lastUsed:null,
                        isIncome:default_category.isIncome
                    })
                }
            if(isLocal){
                return result
            }
            return res.status(200).send(result)
        } catch (err) {
            return res.status(400).send(err.message)
        }
    }
    async deleteUserByID(req, res) {
        await User.destroy({
            where: {
                id: req.params.user_id,
            },
        })
            .then((result) => {
                if (result === 0) {
                    return res
                        .status(400)
                        .send("User with id " + req.params.user_id + " not found.")
                }
                return res
                    .status(200)
                    .send(
                        "User with id " +
                        req.params.user_id +
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
                id: req.params.user_id,
            },
        })
            .then((result) => {
                if (result === 0) {
                    return res
                        .status(400)
                        .send("User with id " + req.params.user_id + " not found.")
                } else {
                    const { email, hashPass, isConfirmed } = req.body
                    User.update(
                        {
                            email: email ?? db.sequelize.literal("email"),
                            hashPass: hashPass ?? db.sequelize.literal("hashPass"),
                            isConfirmed: isConfirmed ?? db.sequelize.literal("isConfirmed"),
                        },
                        {
                            where: {
                                id: req.params.user_id,
                            },
                        }
                    )
                    return res.status(200).send("User with ID: " + req.params.user_id + " was changed successful")
                }
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
    async getUserByID(req, res) {
        await User.findOne({
            where: {
                id: req.params.user_id,
            },
        })
            .then((result) => {
                if (result) {
                    return res.status(200).send(result)
                } else {
                    return res
                        .status(400)
                        .send("User with id: " + req.params.user_id + " not found")
                }
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
    async getUserByEmail(req,res,isLocal){
        try {
            const result = await User.findOne({
                where: {
                    email: req.params.email ?? req.body.email,
                },
            })
            if(isLocal){
                return result
            }
            else{
                return res.status(200).send(result)
            }
        } catch (err) {
            return res.status(400).send(err.message)
        }

    }
}

module.exports = new UserController()