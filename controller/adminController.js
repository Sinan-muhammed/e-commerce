const express=require('express')
const userData=require("../models/signupModel")
const bcrypt = require('bcrypt')
const Category = require('../models/categorymodal')
const Product = require('../models/productmodel')
const Order    = require('../models/orderModel')
const { name } = require('ejs')




module.exports={

    adminLoginGET: async (req,res)=>{
        const message = []
          res.render('admin/admin-login',{message})
    },

    adminDashboardGET: async (req,res)=>{
        const totalRevenueNumber=[]
        const ordercount= await Order.find({}).countDocuments()
        const productcount= await Product.find({}).countDocuments()
        const monthlyRevenueNumber=[]
        const order= await Order.find().populate('userId')
        const categorycount= await Category.find({}).countDocuments()

        res.render('admin/dashboard',{totalRevenueNumber,order,ordercount,productcount,monthlyRevenueNumber,categorycount})
    },

    usersGET:async (req,res)=>{
        try {

            const users= await userData.find()
        res.render('admin/users',{users})
            
        } catch (error) {
            console.log(error);
        }
    },

    reportGET:(req,res)=>{
        const {startDate,endDate}= new Date
        const order=[]
        const product=[]      
        
        try {
            res.render('report',{startDate,endDate,order,product})
        } catch (error) {
            console.log(error);
        }
    },
  
    orderGet: async (req,res)=>{
        try {
            const order=await Order.find().populate('userId')
            res.render('admin/order',{order})
        } catch (error) {
            console.log(error);
        }
    },

    showOrder : async (req,res)=>{
        try {
            const order = await Order.findOne({_id:req.query.id}).populate('products.productId')
            console.log(order);
            res.render('admin/showorder',{order})
        } catch (error) {
            console.log(error);
        }
    }


}


