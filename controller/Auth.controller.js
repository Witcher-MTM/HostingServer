const UserController = require('./user.controller')
const jwt= require('jsonwebtoken')
const {User} = require('../db/index')
class AuthController {
  async register(req, res) {
    await UserController.addUser(req, res)
  }
  async login(req, res) {
    const {accessToken} = req.body
    console.log("token", accessToken)
    if(jwt.verify(accessToken,process.env.SECRET_KEY)){
      console.log("jwt verified")
      try {
        const result = await User.findOne({
          where:{
            accesstoken : accessToken
          }
        })
        console.log("result:", result)
        res.status(200).send(result)
      } catch (error) {
        res.status(400).send(error.message)
      }
        
    }else{
      console.log("jwt not verified")
      res.status(403).send("jwt not verified")
    }
    
  }
}

module.exports = new AuthController()