const express = require('express')
const router = express.Router()
const userController = require('../controller/user.controller')

router.get("/",async(req,res)=>{
    await userController.getUsers(req,res)
})
router.get("/:user_id",async(req,res)=>{
    await userController.getUserByID(req,res)
})
router.get("/email/:email",async(req,res)=>{
    await userController.getUserByEmail(req,res)
})
router.post("/",async(req,res)=>{
    await userController.addUser(req,res)
})
router.delete("/:user_id",async(req,res)=>{
    await userController.deleteUserByID(req,res)
})
router.patch("/:user_id",async(req,res)=>{
    await userController.patchUserByID(req,res)
})

module.exports = router