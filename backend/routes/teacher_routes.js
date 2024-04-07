const express = require("express")
const teacherrouter = express.Router()
const {signup_router} = require("./api/signup")
const { signinrouter } = require("./api/signin")

const { teacher_schema } = require("../db")
const { zod_structure } = require("../zod_validation")
const dotenv = require("dotenv")

dotenv.config()


teacherrouter.use("/signup",signup_router)
teacherrouter.use("/signin",signinrouter)


module.exports = {
    teacherrouter
}