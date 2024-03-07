const User = require('../models/signupModel')
const path =require('path')
const Product = require('../models/productmodel')
const Category = require('../models/categorymodal')
const Banner = require('../models/bannermodel')
const Coupon = require('../models/couponmodel')
const Cart   = require('../models/cartModel')
const Adress  = require('../models/addressmodel')
const { log } = require('util')




module.exports={
    shopLoad: async (req,res)=>{
        try {
            const user = req.session.userId
            
            const category = await Category.find()
            const product = await Product.find()
            res.render('user/shop',{product,totalPages:'',category})
        } catch (error) {
            console.log(error);
        }
    },
    loadEachProduct: async (req,res)=>{
        try {

            const locals =await User.findOne({_id:req.session.userId})
            console.log(locals);
            const productId = req.query.id

            const product = await Product.findOne({_id:productId})
            res.render('user/product',{product,review:[],locals})
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
           console.log(addresses);
           console.log(userData);

            res.render('user/account',{userData,orders:'',CouponData,addresses,user})
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

}