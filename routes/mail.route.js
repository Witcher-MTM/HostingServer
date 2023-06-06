const express = require("express");
const mailController = require("../controller/mail.controller");
const route = express.Router();

route.post('/codesend',async(req,res)=>{
    await mailController.sendEmailWithCode(req,res)
})
module.exports = route;