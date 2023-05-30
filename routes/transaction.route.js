const express = require('express')
const router = express.Router()
const transactionController = require('../controller/transaction.controller')


router.get('/',async(req,res)=>{
    await transactionController.getTransactions(req,res)
})
router.get('/user/:uid', async(req,res)=>{
    await transactionController.getTransactionsByUserID(req,res);
})
router.get("/:transaction_id",async(req,res)=>{
    await transactionController.getTransactionByID(req,res)
})
router.post('/', async(req,res)=>{
    await transactionController.addTransaction(req,res)
})
router.delete('/:transaction_id',async(req,res)=>{
    await transactionController.deleteTransactionByID(req,res)
})
router.patch('/:transaction_id',async(req,res)=>{
    await transactionController.patchTransactionByID(req,res)
})


module.exports = router