const express = require("express");
const { zod_signinstructure } = require("../../zod_validation");
const { teacher_schema } = require("../../db");
const signinrouter = express.Router();

signinrouter.post("/",function(req,res){
    const is_correctdata= req.body

    const validation = zod_signinstructure.safeParse(is_correctdata)
    if(!validation.sucees){
        return res.status(411).json({
            message : " incorrect user type"
        })
    }

    const is_exist = teacher_schema.findOne({
        emali : is_correctdata.emali
    })
})
module.exports={
    signinrouter
}