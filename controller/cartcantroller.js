const Cart = require('../models/cartModel')
const User = require('../models/signupModel')
const Product = require('../models/productmodel')
const mongoose = require('mongoose')
const Address = require('../models/addressmodel')
const { json } = require('express')

const {ObjectId} = require('mongodb')


module.exports ={
    loadCart: async (req,res)=>{
        try {
            const user_id = new ObjectId (req.session.userId)
            
            if(user_id){

                const cartData = await Cart.findOne({user:user_id}).populate("product.productId")
                console.log(cartData,'cartproducts');
               const subtotal = await cartData?.product?.reduce((acc,val) => acc+val.price,0)
               console.log(subtotal,'subtotal');
               res.render('user/cart',{cart:cartData,subtotal})
            }
            else{
                res.redirect('/login')
            }
        } catch (error) {
            console.log(error);
        }
    },   

    addtoCart: async (req,res)=>{
        try {
            const user_id = req.session.userId
            if(!user_id){
                return res.json({session:false, error:"You want to Login"})
            }
            else{

                const product_id = new ObjectId (req.body.productId)
   
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
                       totalPrice: productData.price,
                   }

                   console.log(data);

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
            }

        } catch (error) {
             console.log(error);   
             res.status(500).json({ error:"internal server error"})
        }     
    },

    removeCartitem : async (req,res)=>{

        const userId = new ObjectId (req.session.userId)
        const productId = new ObjectId (req.body.productId)
        
        console.log(userId);
        console.log(productId);
        
        try {
            const deleteCart = await Cart.findOneAndUpdate(
                { user: userId },
                { $pull: { product: { productId: productId } } },
                { new: true } // Return the updated document
            );
        
            console.log('product deleted');
        
            res.json({ success: true });
        } catch (error) {
            console.error("Error removing cart item:", error);
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
        
    },

    updateCart: async(req,res)=>{
        try {
            
            const user_id = req.session.userId
            const productId = req.body.productId
            const count = req.body.count

             console.log(user_id);
            console.log(productId,'prdctid');
            console.log(count,'count');

            const product = await Product.findOne({_id:productId})
            console.log(product);

            const cartD = await Cart.findOne({ user:user_id})
            if (count === -1) {
                const currentQuantity = cartD.product.find((p) => p.productId.equals(productId)).quantity;
                if (currentQuantity <= 1) {
                    return res.json({ success: false, message: 'Quantity cannot be decreased further.' });
                }
            }
            
            if (count === 1) {
                console.log('gfdf');
                const currentQuantity = cartD.product.find((p) => p.productId.equals(productId)).quantity;
                if (currentQuantity + count > product.quantity) {
                    return res.json({ success: false, message: 'Cannot add more than the quantity.' });
                }
            }
            
            const cartData = await Cart.findOneAndUpdate(
                { user: user_id, 'product.productId': productId },
                {
                    $inc: {
                        'product.$.quantity': count,
                        'product.$.totalPrice': count * product.price,
                    },
                },
                { new: true } // Return the updated document
            );
            
        

            if (!cartData) {
                console.log(125);
                return res.json({ success: false, message: 'Product not found in cart.' });
            }
            
            res.json({ success: true });

            
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, error: "Internal Server Error" });

        }
    },


    loadCheckout: async(req,res)=>{
        try {

            const UserId = req.session.userId
            const addresses = await Address.findOne({user:UserId})
            console.log(addresses);
            const cartData = await Cart.findOne({user:UserId}).populate("product.productId").populate('user')
            console.log(cartData);

            if(cartData){
                console.log(cartData.couponDiscount,'couponDiscount');
                cartData.couponDiscount!=0 ? await cartData.populate('couponDiscount') : 0
                const discountPercentage = cartData.couponDiscount !=0 ? cartData.couponDiscount.discountPercentage :0
                const maxDiscount = cartData.couponDiscount !=0 ? cartData.couponDiscount.maxDiscountAmount : 0
                const subtotal = await cartData?.product?.reduce((acc,val) => acc+val.price,0)
                const percentageDiscount = subtotal - (discountPercentage / 100) * subtotal;
                const discountAmount =subtotal - percentageDiscount;
                const discount = subtotal - maxDiscount
                console.log(discount,subtotal,"discount","subtotal")

                if(discountAmount <= maxDiscount){

                    res.render('user/checkout',{cartData,addresses,subtotal,disamo:discountAmount,discount:percentageDiscount})
                    console.log(250);
                }else{
                    console.log(252);
                    res.render('user/checkout',{cartData,addresses,subtotal,disamo:discountAmount,discount})

                }
               
            }

         
        } catch (error) {
            console.log(error);
        }
    }
}
        

/////
