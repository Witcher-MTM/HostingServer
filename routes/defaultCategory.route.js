const express = require('express')
const route = express.Router()
const DefaultCategoryController = require('../controller/defaultCategory.controller')

route.get('/', async(req,res)=>{
    await DefaultCategoryController.getDefaultCategories(req,res)
})
route.get('/:defaultcategory_id',async(req,res)=>{
    await DefaultCategoryController.getDefaultCategoryByID(req,res)
})
route.post('/',async(req,res)=>{
    await DefaultCategoryController.addCategory(req,res)
})
route.delete('/:defaultcategory_id',async(req,res)=>{
    await DefaultCategoryController.deleteDefaultCategoryByID(req,res)
})
route.patch('/:defaultcategory_id',async(req,res)=>{
    await DefaultCategoryController.patchDefaultCategoryByID(req,res)
})

module.exports = route