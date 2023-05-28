const UserController = require('./user.controller')
const bcrypt = require('bcrypt')
class AuthController {
  async register(req, res) {
    await UserController.addUser(req, res, true)
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