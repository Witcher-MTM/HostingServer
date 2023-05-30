const express = require('express')
const router = express.Router()
const categoryController = require('../controller/category.controller')


router.get('/', async(req,res)=>{
    await categoryController.getCategories(req,res)
})
router.get('/user/:uid', async(req,res)=>{
    await categoryController.getCategoryByUserID(req,res)
})
router.get('/:category_id',async(req,res)=>{
    await categoryController.getCategoryByID(req,res)
})
router.post('/', async(req,res)=>{
    await categoryController.addCategory(req,res)
})
router.delete('/:category_id', async(req,res)=>{
    await categoryController.deleteCategoryByID(req,res)
})
router.patch('/:category_id' , async(req,res)=>{
    await categoryController.patchCategoryByID(req,res)
})



module.exports = router