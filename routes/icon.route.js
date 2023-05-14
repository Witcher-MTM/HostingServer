const express = require('express');
const route = express.Router();
const IconController = require('../controller/icon.controller')
route.get('/',async(req,res)=>{
    await IconController.getIcons(req,res)
})
route.get('/:icon_id',async(req,res)=>{
    await IconController.getIconByID(req,res)
})
route.get('/category/:category_id',async(req,res)=>{
    await IconController.getIconByCategoryID(req,res)
})
route.post('/',async(req,res)=>{
    await IconController.addIcon(req,res)
})
route.delete('/:icon_id',async(req,res)=>{
    await IconController.deleteIconByID(req,res)
})
route.patch('/:icon_id',async(req,res)=>{
    await IconController.patchIconByID(req,res)
})

module.exports = route;