const { Avatar } = require("../db/index")
const { Op } = require('sequelize');
class Avatars {
    async GetAvatars(req, res, isLocal) {
        const result = await Avatar.findAll({
            where: {
                image_link: {
                    [Op.not]: "none"
                }
            }
        }).catch((err) => {
            return res.status(400).send(err.message);
        })
        if (isLocal) {
            return result;
        } else {
            return res.status(200).send(result);
        }
    }
    async GetAvatarByID(req, res, isLocal) {
        const result = await Avatar.findOne({
            where: {
                id: req.params ? req.params : req.body,
                image_link: {
                    [Op.not]: "none"
                }
            }
        }).catch((err) => {
            return res.status(400).send(err.message);
        })
        console.log("avatar result", result)
        if (isLocal) {
            return result;
        } else {
            return res.status(200).send(result);
        }
    }
}
module.exports = new Avatars()