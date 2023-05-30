const express = require('express')
const router = express.Router()
const loadController = require('../controller/load.controller')

router.get('/:uid',async(req,res)=>{
    await loadController.combineTransactions(req,res)
})


module.exports = router