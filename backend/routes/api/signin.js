const express = require("express");
const { zod_signinstructure } = require("../../zod_validation");
const { teacher_schema } = require("../../db");
const signinrouter = express.Router();

const jwt = require("jsonwebtoken")


signinrouter.post("/", async function(req,res){
    const is_correctdata= req.body

    const validation = zod_signinstructure.safeParse(is_correctdata)
   
    if(!validation.success){
        console.log("from here")
        return res.status(411).json({
            message : " wrong data type"
        })
    }

    const is_exist = teacher_schema.findOne({
        email : is_correctdata.email
    })
    if(!is_exist){
        return res.send(404).json({
            message : "teacher doesn't exist"
        })
    }

    const validate_teacher = await teacher_schema.findOne({
        email : is_correctdata.email,
        password : is_correctdata.password
    })
    const id = validate_teacher._id
   
    if(validate_teacher){
        const token = jwt.sign({
            id
        },process.env.jwt_password)
       

        return res.json({
               message : validate_teacher.email,
               token : "Bearer "+token
        })
     }
     else{
        return res.status(401).json({
            message : " wrong username or password"
        })
     }


})
module.exports={
    signinrouter
}