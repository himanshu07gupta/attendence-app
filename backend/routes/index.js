const express = require("express")
const { teacherrouter } = require("./teacher_routes")
const mainrouter = express.Router()

mainrouter.use("/teacher",teacherrouter)

module.exports ={
    mainrouter
}