const User = require('../models/signupModel')
const path =require('path')
const Product = require('../models/productmodel')
const Category = require('../models/categorymodal')
const Banner = require('../models/bannermodel')
const Coupon = require('../models/couponmodel')
const Cart   = require('../models/cartModel')
const Adress  = require('../models/addressmodel')
const Order  = require('../models/orderModel')
const { log } = require('util')




module.exports={
    shopLoad: async (req,res)=>{
        try {
            const user = req.session.userId
            const locals = await User.findOne({_id:user})
            const category = await Category.find()
            const product = await Product.find()
            const cart   = await Cart.findOne({user:user})
            res.render('user/shop',{product,totalPages:'',category,locals,cart})
        } catch (error) {
            console.log(error);
        }
    },
    loadEachProduct: async (req,res)=>{
        try {

            const locals =await User.findOne({_id:req.session.userId})
            const productId = req.query.id
            const cart = await Cart.findOne({user:req.session.userId})
            const product = await Product.findOne({_id:productId})
            res.render('user/product',{product,review:[],locals,cart})
        } catch (error) {

            console.log(error);

        }
    },
    loadAccount: async (req,res)=>{
        try {
            const user = req.session.userId
           const userData = await User.findOne({_id:user})
           const addresses = await Adress.findOne({user:user})
           const  CouponData = await Coupon.find({})
           const  orders  = await Order.find({userId:user})
           console.log(orders);
           console.log(addresses,'load accound');
           console.log(userData,'load account');
           

            res.render('user/account',{userData,orders,CouponData,addresses,user})
        } catch (error) {
            console.log(error);
        }
    },

    loadOrderDetails: async (req,res)=>{
        try {
            
            const userId = req.session.userId
            const id = req.query.id
            console.log(id,'order id');
            const orderData = await Order.findOne({_id:id}).populate('products.productId')
            console.log(orderData);
            res.render('user/orderdetails',{order:orderData})
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

}