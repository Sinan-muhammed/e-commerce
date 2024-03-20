const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId


const reviewSchema = mongoose.Schema({
    productId:{
        type:ObjectId,
        ref:'Product',
        required:true
    },
    userId:{
        type:ObjectId,
        ref:'signupData',
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String
    },
    votes:[{
        userId:{
            type:ObjectId,
            ref:'signupData',
            required:true
        },
        type:{
            type:String,
            enum:['like','dislike'],
            required:true
        }
    }],
    createdAt:{
        type:Date,
        default:Date.now
    }
})


module.exports = mongoose.model('Review',reviewSchema)