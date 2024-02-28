const Cart = require('../models/cartModel')
const User = require('../models/signupModel')
const Product = require('../models/productmodel')
const Wishlist = require('../models/wishlistmodel')

const {ObjectId} = require('mongodb')


module.exports = {
   loadWishlist : async (req,res)=>{
    try {
        const user_id = new ObjectId(req.session.userId)
        console.log(user_id);
        
    } catch (error) {
        
    }
   }
}