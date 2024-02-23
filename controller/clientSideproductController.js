const User = require('../models/signupModel')
const path =require('path')
const Product = require('../models/productmodel')
const Category = require('../models/categorymodal')
const Banner = require('../models/bannermodel')
const Coupon = require('../models/couponmodel')
const Cart   = require('../models/cartModel')
const { log } = require('util')




module.exports={
    shopLoad: async (req,res)=>{
        try {
            const category = await Category.find()
            const product = await Product.find()
            res.render('user/shop',{product,totalPages:'',category})
        } catch (error) {
            console.log(error);
        }
    },
    loadEachProduct: async (req,res)=>{
        try {
            const productId = req.query.id

            const product = await Product.findOne({_id:productId})
            res.render('user/product',{product,review:[]})
        } catch (error) {

            console.log(error);

        }
    },
    loadAccount: async (req,res)=>{
        try {
           const userData = await User.findOne({_id:req.session.userId})
           console.log(userData);

            res.render('user/account',{userData,orders:'',CouponData:'',addresses:''})
        } catch (error) {
            console.log(error);
        }
    },

    loadCheckout: async(req,res)=>{
        try {
            res.render('user/checkout',{cartData:'',addresses:[],subtotal:'',disamo:'',discount:''})
        } catch (error) {
            console.log(error);
        }
    },

    loadSuccess: async (req,res)=>{
        try {
            res.render('user/success')
        } catch (error) {
            console.log(error);
        }
    },

    loadOrderDetails: async (req,res)=>{
        try {
            res.render('user/orderdetails',{order:[],product:''})
        } catch (error) {
            console.log(error);
        }
    },

    loadInvoice: async (req,res)=>{
        try {
            res.render('user/invoice',{productsData:[],orderData:[],product:[]})
        } catch (error) {
            console.log(error);
        }
    },

    loadWishlistGet: async (req,res)=>{
        try {
            res.render('user/wishlist')
        } catch (error) {
            console.log(error);
        }
    }
}