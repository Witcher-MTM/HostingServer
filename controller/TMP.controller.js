const { User ,DefaultCategory,Account,Category} = require("../db/index")
const db = require("../db")

class TMPController{
    async Login(req,res,isLocal){
        console.log("UID: ",req.body.uid)
        console.log("Email: ",req.body.email)
        console.log("emailVerified: ",req.body.emailVerified)
        console.log("createdAt: ",req.body.createdAt)
        console.log("lastLoginAt: ",req.body.lastLoginAt)
        console.log("apiKey: ",req.body.apiKey)

        const {uid,email,emailVerified,createdAt,lastLoginAt,apiKey} = req.body
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
                apiKey:apiKey
            })
            const default_categories = await DefaultCategory.findAll()
            for (const default_category of default_categories) {
                await Category.create({
                    uid: result.uid,
                    name: default_category.name,
                    image_link: default_category.image_link,
                    image_color: default_category.image_color,
                    color: default_category.color,
                    lastUsed: null,
                    isIncome: default_category.isIncome
                })
            }
            await Account.create({
                uid: result.uid,
                name: "Total",
                cash: 0
            })
            if (isLocal) {
                return result
            }
            return res.status(200).send(result)
        } catch (err) {
            console.log(err.message)
            return res.send(err.message)

        }
    }
}

module.exports = new TMPController()
