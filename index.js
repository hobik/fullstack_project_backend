const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const UsersSchema = require("./models/users.model")
const { error } = require("console")
require('dotenv').config()

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.post("/register", (req, res )=>{

    const user = new UsersSchema(req.body)

    user.save().then((response)=>{
        //
        return res.status(200).send({
            message:"Successful",
            data:user
        })
    }).catch((error)=>{
       return res.status(500).send({
            message:"Fail",
            data:error
        })
    })   

})

app.post("/login",async (req,res)=>{
    const user = await UsersSchema.findOne(req.body)
    if(!user) {
    return res.status(500).send({
        message:"User not found",
    })
    }

    return res.status(200).send({
        message:"Successful",
        data:user
    })
})

mongoose.connect(process.env.MONGO_URL).then(
    ()=>{
        console.log("Database Connected !!")
    },
    (error)=>{
        console.log("Database cant be connected :", error)
    }
)

const server = app.listen(3000 || process.env.PORT,(err)=>{
    if(err){console.log(err)}
    else{
        console.log("Port Started. Port number %d", server.address().port)
    }
})