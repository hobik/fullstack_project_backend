const mongoose = require("mongoose")

const {Schema} = mongoose

const userSchema = new Schema({
    email:{
        type:String,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String
    }
})

const UsersSchema = mongoose.model("users",userSchema)

module.exports = UsersSchema