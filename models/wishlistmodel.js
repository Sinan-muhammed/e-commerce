const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const wishlistItemSchema = new mongoose.Schema({
    user:{
        type:ObjectId,
        ref:'signupData',
        required:true
    },
    product :{
            type:ObjectId,
            ref:'Product',
            required:true,
        }
})


const wishlistItem = mongoose.model('WishlistItem', wishlistItemSchema)

module.exports = wishlistItem