const { Tmp } = require("../db/index")
const db = require("../db")

class TMPController{
    async GetTMPAccount(req,res){
        await Tmp.findOne()
            .then((result) => {
                return res.status(200).send(result)
            })
            .catch((err) => {
                return res.status(400).send(err.message)
            })
    }
    async patchTMPAccountByID(req, res) {
        const { user_id, cash } =
            req.body
        try {
            Tmp.update(
                {
                    user_id: user_id ?? db.sequelize.literal("user_id"),
                    cash: cash ?? db.sequelize.literal("cash"),
                },
                {
                    where: {
                        id: req.params.account_id,
                    },
                }
            )
            return res.status(200).send("Account with ID: " + req.params.account_id + " was changed successful")
        } catch (err) {
            return res.status(400).send(err.message)
        }
    }
}

module.exports = new TMPController()
