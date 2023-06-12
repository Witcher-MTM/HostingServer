const express = require('express')
const router = express.Router()
const transactionController = require('../controller/transaction.controller')
const authenticateToken = require("../midleware/authenticateToken");


router.get('/',authenticateToken,async(req,res)=>{
    await transactionController.getTransactions(req,res)
})
router.get('/user/:uid',authenticateToken, async(req,res)=>{
    await transactionController.getTransactionsByUserID(req,res);
})
router.get("/:transaction_id",authenticateToken,async(req,res)=>{
    await transactionController.getTransactionByID(req,res)
})
router.post('/',authenticateToken, async(req,res)=>{
    await transactionController.addTransaction(req,res)
})
router.delete('/:transaction_id',authenticateToken,async(req,res)=>{
    await transactionController.deleteTransactionByID(req,res)
})
router.patch('/:transaction_id',authenticateToken,async(req,res)=>{
    await transactionController.patchTransactionByID(req,res)
})


module.exports = router