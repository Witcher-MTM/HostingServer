const express = require('express')
const router = express.Router()
const RemainderController = require('../controller/remainder.controller')

router.get("/",async(req,res)=>{
    await RemainderController.getRemainders(req,res)
})
router.get("/user/:user_id",async(req,res)=>{
    await RemainderController.getRemainderByUserID(req,res)
})
router.get("/:remainder_id",async(req,res)=>{
    await RemainderController.getRemainderByID(req,res)
})
router.post("/",async(req,res)=>{
    await RemainderController.addRemainder(req,res)
})
router.delete("/:remainder_id",async(req,res)=>{
    await RemainderController.deleteRemainderByID(req,res)
})
router.patch("/:remainder_id",async(req,res)=>{
    await RemainderController.patchRemainderByID(req,res)
})



module.exports = router