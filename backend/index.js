const express = require('express')
const { mainrouter } = require('./routes')
const app = express()
const cors = require("cors")
const dotenv=require("dotenv")
dotenv.config()

app.use(cors())
app.use(express.json())

app.use("/app/v1",mainrouter)

const port = process.env.port
app.listen(port,function(){
    console.log("app is listening on "+port)
})