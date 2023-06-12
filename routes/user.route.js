const express = require('express')
const router = express.Router()
const userController = require('../controller/user.controller')
const authenticateToken = require("../midleware/authenticateToken");

router.get("/", authenticateToken , async(req,res)=>{
    await userController.getUsers(req,res)
})
router.get("/:uid",authenticateToken,async(req,res)=>{
    await userController.getUserByID(req,res)
})
router.get("/email/:email",authenticateToken,async(req,res)=>{
    await userController.getUserByEmail(req,res)
})
router.post("/",authenticateToken,async(req,res)=>{
    await userController.addUser(req,res)
})
router.delete("/:uid",authenticateToken,async(req,res)=>{
    await userController.deleteUserByID(req,res)
})
router.patch("/:uid",authenticateToken,async(req,res)=>{
    await userController.patchUserByID(req,res)
})

module.exports = router