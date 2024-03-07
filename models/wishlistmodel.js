const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const wishlistItemSchema = new mongoose.Schema({
    user:{
        type:ObjectId,
        ref:'signupData',
        required:true
    },
    product :[{
        productId:{
            type:ObjectId,
            ref:"Product",
            required:true,
        },
        quantity:{
            type:Number,
            default:1
        },
        price:{
            type:Number,
            default:0
        }
    }]
})


const wishlistItem = mongoose.model('WishlistItem', wishlistItemSchema)

module.exports = wishlistItem