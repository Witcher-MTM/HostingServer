const express = require('express')
const route = express.Router()
const TMPController = require('../controller/TMP.controller')
route.get('/',async(req,res)=>{
    await TMPController.GetTMPAccount(req,res)
})

route.patch('/:account_id', async(req,res)=>{
    await TMPController.patchTMPAccountByID(req,res)
})

module.exports = route