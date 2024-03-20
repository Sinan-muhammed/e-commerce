const Coupon = require("../models/couponmodel");
const Cart = require('../models/cartModel')

module.exports = {
  couponhome: async (req, res) => {
    try {
      const coupon = await Coupon.find({});
      res.render("admin/coupon", { coupon });
    } catch (error) {
      console.log(error);
    }
  },

  addcouponGet: async (req, res) => {
    try {
      res.render("admin/addcoupon");
    } catch (error) {
      console.log(error);
    }
  },

  addcouponPost: async (req, res) => {
    try {
      const couponData = await Coupon.findOne({
        couponCode: req.body.couponCode,
      });

      if (couponData) {
        res.redirect("/admin/addcoupon");
      }

      const data = new Coupon({
        name: req.body.name,
        couponCode: req.body.couponCode,
        discountPercentage: req.body.discountPercentage,
        maxDiscountAmount: req.body.maxDiscountAmount,
        activationDate: req.body.activationDate,
        expiryDate: req.body.expiryDate,
        criteriaAmount: req.body.criteriaAmount,
      });

      await data.save();
      res.redirect("/admin/coupon");
    } catch (error) {
      console.log(error);
    }
  },

  editCouponGet: async (req, res) => {
    try {
      const couponId = req.query.id;
      const coupon = await Coupon.findById(couponId);
      console.log(couponId);

      res.render("admin/editcoupon", { coupon });
    } catch (error) {
      console.log(error);
    }
  },

  editCouponPost: async (req, res) => {
    try {
      const couponId = req.query.id;
      const couponData = await Coupon.findById(couponId);
      console.log(couponData);

      await Coupon.updateOne(
        { _id: couponData },
        {
          $set: {
            name: req.body.name,
            couponCode: req.body.couponCode,
            discountPercentage: req.body.discountPercentage,
            maxDiscountAmount: req.body.maxDiscountAmount,
            expiryDate: req.body.expiryDate,
            criteriaAmount: req.body.criteriaAmount,
          },
        }
      );

      res.redirect("/admin/coupon");
    } catch (error) {
      console.log(error);
    }
  },

  deleteCouponGet: async (req,res)=>{
    try {
        
        const id = req.params.id
        console.log(id);

        await Coupon.deleteOne({_id:id})

        res.status(200).json({message:'the coupon deleted successfully'})
        console.log('vggggv');
    } catch (error) {
        console.log(error);
    }
  },

  checkcoupon : async(req,res)=>{
    try {
      const userId = req.session.userId
      const couponcode = req.body.coupon
      const currentDate = new Date()
      const cartData = await Cart.findOne({user:userId})
      const cartTotal = cartData.product.reduce((acc,val)=>acc+val.totalprice,0)
      const coupondata = await Coupon.findOne({couponCode:couponcode})

      if(coupondata){
        if(currentDate >= coupondata.activationDate && currentDate <= coupondata.expiryDate){
          const exists = coupondata.usedUsers.includes(userId)
          if(!exists){
            if(cartTotal>=coupondata.criteriaAmount){
              await Coupon.findOneAndUpdate({couponCode:couponcode},{$push:{usedUsers:userId}})
              await Cart.findOneAndUpdate({user:userId},{$set:{couponDiscount:coupondata._id}})
              res.json({coupon:true})
            }else{
              res.json({coupon:'amountIssue'})
            }
          }else{
            res.json({coupon:'used'})
          }
        }else{
          res.json({coupon:'notAct'})
        }
      }else{
        res.json({coupon:false})
      }
    } catch (error) {
      console.log(error);
    }
  },
  
};
