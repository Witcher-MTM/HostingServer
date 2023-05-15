const UserController = require('./user.controller')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const logger = require('../module/Logger')
const FomrattedDate = require('../module/FormattedDate')
class AuthController {
  async register(req, res) {
    console.log(logger.regexSymbol('-', 50), "info")
    console.log(`start register at ${FomrattedDate.toDateTimeSeconds(new Date())}`, "info")
    const user = await UserController.addUser(req, res, true)
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
    console.log(`send info at ${FomrattedDate.toDateTimeSeconds(new Date())}`, "info")
    res.status(200).json({ token });
    console.log(`end register at ${FomrattedDate.toDateTimeSeconds(new Date())}`, "info")
    console.log(logger.regexSymbol('-', 50), "info")
  }
  async authenticateUser(req, res) {
    try {
      const user = await UserController.getUserByEmail(req, res, true);
      const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
      if (isPasswordMatch) {
        return res.status(200).send(true);
      } else {
        return res.status(401).send('Incorrect password');
      }
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }
}

module.exports = new AuthController()