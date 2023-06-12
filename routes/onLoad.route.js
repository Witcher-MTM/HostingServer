const express = require('express')
const router = express.Router()
const loadController = require('../controller/load.controller')
const authenticateToken = require("../midleware/authenticateToken");
router.get('/:uid',authenticateToken,async(req,res)=>{
    await loadController.LoadData(req,res)
})


module.exports = router