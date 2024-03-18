const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const adminLogin = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    }
})


adminLogin.pre('save',async function (next){
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(this.password,salt)
        this.password = hashedpassword
        next()
    } catch (error) {
        next(error)
    }
})

module.exports =mongoose.model('adminData',adminLogin)