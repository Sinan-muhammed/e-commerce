const express=require('express')
const userData=require("../models/signupModel")
const bcrypt = require('bcrypt')
const Category = require('../models/categorymodal')
const product = require('../models/productmodel')
const { name } = require('ejs')




module.exports={
    adminLoginGET:(req,res)=>{
        const message = []
          res.render('admin/admin-login',{message})
    },
    adminDashboardGET:(req,res)=>{
        const totalRevenueNumber=[]
        const ordercount=[]
        const productcount=[]
        const monthlyRevenueNumber=[]
        const order=[]
        const categorycount=[]

        res.render('admin/dashboard',{totalRevenueNumber,order,ordercount,productcount,monthlyRevenueNumber,categorycount})
    },
    usersGET:(req,res)=>{
        const users=[]
        res.render('users',{users})
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
  
    couponGET:(req,res)=>{
        try {
            const coupon=[]
            res.render('admin/coupon',{coupon})
        } catch (error) {
            console.log(error);
        }
    },
    addcouponGET:(req,res)=>{
        try {
            res.render('admin/addcoupon')
        } catch (error) {
            console.log(error);
        }
    },
    editcouponGET:(req,res)=>{
        try {
            const coupon=[]
            res.render('admin/editcoupon',{coupon})
        } catch (error) {
            console.log(error);
        }
    },
    bannerGET:(req,res)=>{
        try {
            const banner =[]
            res.render('admin/banner',{banner})
        } catch (error) {
            console.log(error);
        }
    },
    addbannerGET:(req,res)=>{
        try {
            res.render('admin/addbanner')
        } catch (error) {
            console.log(error);
        }
    },
    editbannerGET:(req,res)=>{
        try {
            const data=[]
            res.render('admin/editbanner',{data})
        } catch (error) {
            console.log(error);
        }
    },
    adminLogout:(req,res)=>{
        try {
            res.redirect('/admin')
        } catch (error) {
           console.log(error); 
        }
    },
    ordersGET:(req,res)=>{
        try {
            
            
            res.render('order',{order})
        } catch (error) {
            console.log(error);
        }
    },
    showorderGET:(req,res)=>{
        try {
            const product=[]
            const id=[]
            const order=[]
            res.render('showorder',{order,id})
        } catch (error) {
            console.log(error);
        }
    }


}