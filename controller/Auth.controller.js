const UserController = require('./user.controller')
const jwt= require('jsonwebtoken')
const {User} = require('../db/index')
class AuthController {
  async register(req, res) {
    await UserController.addUser(req, res)
  }
  async login(req, res) {
    const {accessToken} = req.body
    if(await jwt.verify(accessToken,process.env.SECRET_KEY)){
      try {
        const result = await User.findOne({
          where:{
            accesstoken : accessToken
          }
        })
        if(result){
          res.status(200).send(result)
        }
        else{
          res.status(400).send(result)
        }
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