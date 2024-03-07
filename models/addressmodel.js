const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')


const addressSchema = new mongoose.Schema({
    user:{
        type:ObjectId,
        ref:'signupData',
        required:true
    },
    address:[{
        fullName:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        housename:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        pincode:{
            type:String,
            required:true,
        },
        phone:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        }
    }]
})

module.exports = mongoose.model('useraddress',addressSchema)