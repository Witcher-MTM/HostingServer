const express = require('express')
const route = express.Router();
const AvatarController = require('../controller/avatars.controller')

route.get('/',async(req,res)=>{
    await AvatarController.GetAvatars(req,res,false)
})
route.get('/:avatar_id',async(req,res)=>{
    await AvatarController.GetAvatarByID(req,res,false)
})

module.exports = route;