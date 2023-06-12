const UserController = require('./user.controller')
const { sequelize } = require('../db')
const { User } = require('../db/index')
const { verifyAccessToken, refreshToken, refreshUserToken } = require('../module/Token')
class AuthController {
  async register(req, res) {
    await UserController.addUser(req, res)
  }
  async login(req, res) {
    const { email } = req.body
    try {
      const result = await User.findOne({
        where: {
          email: email
        }
      })

      if (result) {
        const verifyResult = await verifyAccessToken(result.accesstoken);
        console.log("Status in verify", verifyResult);
        if (!verifyResult) {
          const refreshResult = await refreshUserToken(result.refreshtoken);
          console.log("Status in refresh", refreshResult);
          result.accesstoken = refreshResult;
          await User.update(
            { accesstoken: refreshResult ?? db.sequelize.literal("accesstoken") },
            { where: { accesstoken: accesstoken } }
          );
        }
        res.status(200).send(result)
      }
      else {
        res.status(400).send(result)
      }
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
  async loginByToken(req, res) {
    const { accessToken } = req.body
    try {
      await sequelize.query("SET SESSION wait_timeout = 400;");
      await sequelize.query("SET SESSION interactive_timeout = 400;");
      console.log("log by token")
      const result = await User.findOne({
        where: {
          accesstoken: accessToken
        }
      })
        const verifyResult = await verifyAccessToken(result.accesstoken);
        console.log("Status in verify", verifyResult);
        if (!verifyResult) {
          const refreshResult = await refreshUserToken(result.refreshtoken);
          console.log("Status in refresh", refreshResult);
          result.accesstoken = refreshResult;
          await User.update(
            { accesstoken: refreshResult ?? db.sequelize.literal("accesstoken") },
            { where: { accesstoken: accessToken } }
          );
        }
        return res.status(200).send(result);
      } catch (error) {
        res.status(400).send(error.message);
      }      
  }
}

module.exports = new AuthController()