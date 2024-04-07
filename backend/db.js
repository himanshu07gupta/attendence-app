const mongoose = require("mongoose")
const dotenv=require("dotenv")
const {string,number} = require("zod")

dotenv.config()
async function main(){
try{

await mongoose.connect(process.env.mongourl)
console.log("connected")
}
catch{
    console.log("error")
}}
main();

const teacher_schema = mongoose.model("teacherdata",{
    email : {type : String ,require : true},
    firstname : {type : String, require : true},
    lastname : {type: String},
    password : {type : String, require : true, minlength : 6}
})

module.exports ={
    teacher_schema
}