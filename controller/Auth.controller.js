const UserController = require('./user.controller')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
class AuthController{
    async register(req,res){
        const user = await UserController.addUser(req,res,true)
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);

        res.status(200).json({ token });
    }
    async authenticateUser(req, res) {
        try {
          const user = await UserController.getUserByEmail(req, res, true);
          const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
          if (isPasswordMatch) {
            return res.status(200).send('true');
          } else {
            return res.status(401).send('Incorrect password');
          }
        } catch (err) {
          return res.status(500).send(err.message);
        }
      }
}

module.exports = new AuthController()