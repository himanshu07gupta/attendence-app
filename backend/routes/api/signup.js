const express = require("express");
const { zod_signupstructure } = require("../../zod_validation");
const { teacher_schema } = require("../../db");
const signup_router = express.Router();
const jwt = require("jsonwebtoken")



signup_router.post("/",async function(req,res){
    const teacher_data = req.body
    
    // zod validation (for signup)
    const validate = zod_signupstructure.safeParse(teacher_data)
    if(!validate.success){
        return res.status(400).json({
            message : "incorrect data format"
        })
    }
    
    // is user already exist (from mogo table)
    const is_already = await teacher_schema.findOne({
        email : teacher_data.email
    })

    if(is_already){
        return res.status(411).json({
            message : "teacher with id already exists"
        })
    }
    
    // create new user in mongo
    const teacher_row= await teacher_schema.create({
        email : teacher_data.email,
        firstname : teacher_data.firstname,
        lastname : teacher_data.lastname,
        password : teacher_data.password
    })

    const id = teacher_row._id

// create token
 const token = jwt.sign({
    id
 },process.env.jwt_password)


 res.json({
    message : "data is added succesfully",
    email : teacher_data.email,
    token : "Bearer "+token
 })
})


module.exports ={
    signup_router
}