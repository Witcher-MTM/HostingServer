const UserController = require('./user.controller')
const jwt = require('jsonwebtoken')
const {sequelize} = require('../db')
const { User } = require('../db/index')
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
      await sequelize.query("SET SESSION wait_timeout = 3600;");
      await sequelize.query("SET SESSION interactive_timeout = 3600;");
      console.log("log by token")
      const result = await User.findOne({
        where: {
          accesstoken: accessToken
        }
      })
      if (result) {
        res.status(200).send(result)
      }
      else {
        res.status(400).send(result)
      }
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
}

module.exports = new AuthController()