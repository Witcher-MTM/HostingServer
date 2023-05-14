const express = require('express')
const router = express.Router()
const goalController = require('../controller/goal.controller')

router.get("/",async(req,res)=>{
    await goalController.getGoal(req,res)
})
router.get("/user/:user_id",async(req,res)=>{
    await goalController.getGoalByUserID(req,res)
})
router.get("/:goal_id",async(req,res)=>{
    await goalController.getGoalByID(req,res)
})
router.post("/",async(req,res)=>{
    await goalController.addGoal(req,res)
})
router.delete("/:goal_id",async(req,res)=>{
    await goalController.deleteGoalByID(req,res)
})
router.patch("/:goal_id",async(req,res)=>{
    await goalController.patchGoalByID(req,res)
})

module.exports = router