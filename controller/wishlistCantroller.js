const Cart = require('../models/cartModel')
const User = require('../models/signupModel')
const Product = require('../models/productmodel')
const Wishlist = require('../models/wishlistmodel')

const {ObjectId} = require('mongodb')


module.exports = {
   loadWishlist : async (req,res)=>{
    try {
        const user_id = new ObjectId(req.session.userId)

        if(user_id){
            const wishlistData = await Wishlist.findOne({user:user_id}).populate('product.productId')
            console.log(user_id);
            res.render("user/wishlist",{wishlist:wishlistData})
        }
        else{
            res.redirect('/login')
        }
    } catch (error) {
        console.log(error);
    }
   },

   addtowishlist : async(req,res)=>{
    try {
        const user_id = req.session.userId
        
        if(!user_id){
            return res.json({session:false, error:"You want to Login"})
        }

        const productId = req.body.productId
        const productdata = await Product.findById(productId)
        console.log(productdata);
        console.log(2);

        if(productdata.quantity ==0){
            return res.json({ quantity: false, error: 'Product is out of stock' });
        }
        if(productdata.quantity >0){
            const wishListProduct = await Wishlist.findOne({ user:user_id, 'product.productId':productId})

            if(wishListProduct){
                return res.status(200).json({ success: false, error: 'Product already in cart' });
            }

            const data = {
                productId:productId,
                price:productdata.price
            }
            await Wishlist.findOneAndUpdate(
                { user:user_id},
                {
                    $set:{user:user_id},
                    $push:{product:data}
                },
    
                { upsert: true, new: true }
    
            )

            return res.json({ success: true, stock: true });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
   },
   removewishlist: async (req,res)=>{
    try {
        
        const userId = new ObjectId (req.session.userId)
        const productId = new ObjectId (req.body.productId)

        console.log(userId);
        console.log(productId);

        const deletewishlist = await Wishlist.findOneAndUpdate(
            {user:userId},
            {$pull:{product:{productId:productId}}},
            {new:true}
        )

       return res.json({success:true})

    } catch (error) {
        console.error("Error removing cart item:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
   }
}