const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')


const cartSchema = new mongoose.Schema({
    user:{
        type:ObjectId,
        ref:'signupData',
        required:true
    },
    product : [{
        productId:{
            type:ObjectId,
            ref:'Product',
            required:true,
        },
        quantity:{
            type:Number,
            default:1
        },
        price:{
            type:Number,
            default:0
        },
        totalprice:{
            type:Number,
            default:0
        }
    }],
    couponDiscount:{
        type: String,
        ref:'Coupon'
    }
})

module.exports = mongoose.model('cart',cartSchema)