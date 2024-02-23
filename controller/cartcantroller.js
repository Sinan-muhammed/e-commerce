const Cart = require('../models/cartModel')
const User = require('../models/signupModel')
const Product = require('../models/productmodel')
const mongoose = require('mongoose')
const Address = require('../models/addressmodel')




module.exports ={
    loadCart: async (req,res)=>{
        try {
            const user_id = req.session.userId
            console.log(user_id);

             const cartData = await Cart.findOne({user:user_id}).populate('product.productId')
             console.log(cartData);
            const subtotal = await cartData?.product.reduce((acc,val) => acc+val.price,0)
            console.log(subtotal,'subtotal');
            res.render('user/cart',{cart:cartData,subtotal})
        } catch (error) {
            console.log(error);
        }
    },

    addtoCart: async (req,res)=>{
        try {
            const user_id = req.session.userId
            if(!user_id){
                return res.json({session:false,error:'You want to Login'})
            }
             console.log(req.session);
             const product_id = req.body.productId

             const productData = await Product.findById(product_id)
             console.log(productData);

             if(productData.quantity == 0){
                   return res.json({quantity:false, error: "product is out of stock"})
             }
             if(productData.quantity > 0){
                const cartProduct = await Cart.findOne({user:user_id,"product.productId": product_id})

                if(cartProduct){
                    return res.status(200).json({success : false, error:"product alredy in cart"})
                }

                const data = {
                    productId :product_id,
                    price: productData.price,
                    totalPrice: productData.price
                }

                await Cart.findOneAndUpdate(
                    {user : user_id},
                    {
                          $set:{ user : user_id, couponDiscount:0},
                          $push:{product: data}
                    },
                    {upsert: true, new:true}
                    
                    )

                    return res.json({ success: true, stock:true})
             }

        } catch (error) {
             console.log(error);   
             res.status(500).json({ error:"internal server error"})
        }
    },
}