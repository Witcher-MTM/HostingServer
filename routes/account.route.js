const express = require('express')
const router = express.Router()
const accountController = require('../controller/account.controller')
const authenticateToken = require("../midleware/authenticateToken");

router.get('/',authenticateToken,async(req,res)=>{
    await accountController.getAccounts(req,res)
})
router.get('/user/:uid',authenticateToken,async(req,res)=>{
    await accountController.getAccountsByUserID(req,res)
})
router.get('/:account_id',authenticateToken, async(req,res)=>{
    await accountController.getAccountByID(req,res)
})
router.post('/',authenticateToken, async(req,res)=>{
    await accountController.addAccounts(req,res)
})
router.delete('/:account_id',authenticateToken,async(req,res)=>{
    await accountController.deleteAccountByID(req,res)
})
router.patch('/:account_id',authenticateToken,async(req,res)=>{
    await accountController.patchAccountByID(req,res)
})


module.exports = router