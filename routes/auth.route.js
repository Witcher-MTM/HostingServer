const express = require('express')
const route = express.Router();
const AuthController = require('../controller/Auth.controller')

route.post('/register',async(req,res)=>{
    await AuthController.register(req,res)
})
route.post('/login',async(req,res)=>{
    await AuthController.authenticateUser(req,res)
})

module.exports = route;