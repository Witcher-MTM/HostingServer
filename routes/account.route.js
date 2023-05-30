const express = require('express')
const router = express.Router()
const accountController = require('../controller/account.controller')

router.get('/',async(req,res)=>{
    await accountController.getAccounts(req,res)
})
router.get('/user/:uid',async(req,res)=>{
    await accountController.getAccountsByUserID(req,res)
})
router.get('/:account_id', async(req,res)=>{
    await accountController.getAccountByID(req,res)
})
router.post('/', async(req,res)=>{
    await accountController.addAccounts(req,res)
})
router.delete('/:account_id',async(req,res)=>{
    await accountController.deleteAccountByID(req,res)
})
router.patch('/:account_id',async(req,res)=>{
    await accountController.patchAccountByID(req,res)
})


module.exports = router