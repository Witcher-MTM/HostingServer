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
      await User.findOne({
        where:{
          accesstoken : accessToken
        }
      }).then((result)=>{
        res.status(200).send(result)
      }).catch((e)=>{
        res.status(400).send(e.message)
      })
    }else{
      console.log("jwt not verified")
      res.status(403).send("jwt not verified")
    }
    
  }
}

module.exports = new AuthController()