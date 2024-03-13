const { truncateSync } = require('fs')
const Address = require ('../models/addressmodel')
const User    = require('../models/signupModel')
const Orders  = require('../models/orderModel')
const { errorMonitor } = require('events')

const {ObjectId} = require('mongodb')


module.exports ={
    addaddress : async (req,res)=>{
        try {
            
            const userId = req.session.userId
            console.log(userId);

            const data = {
                fullName:req.body.fullName,
                country: req.body.country,
                housename: req.body.housename,
                state: req.body.state,
                city: req.body.city,
                pincode: req.body.pincode,
                phone: req.body.phone,
                email: req.body.email
             
            }

            console.log(data);

            await Address.findOneAndUpdate(
                {user:userId},
                {  $push: {address: data}},
                
            )
                console.log('fsfsddsdfs');
            res.redirect('/checkout');
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        }
    },

    addaddressprofile : async (req,res)=>{
        try {
            
            const userId = req.session.userId

            const data = {
                fullName:req.body.fullName,
                country: req.body.country,
                housename: req.body.housename,
                state: req.body.state,
                city: req.body.city,
                pincode: req.body.pincode,
                phone: req.body.phone,
                email: req.body.email
             
            }

            // update the address

            const updatedAddress = await Address.findOneAndUpdate(
                { user:userId},
                {$set :{ user:userId},$push:{ address: data } },
                { upsert: true, new: true }
            )
            
            res.json({ add: true, address: updatedAddress });


        } catch (error) {
            console.error(error);
            res.status(500).json({ add: false, error: "Internal Server Error" });
        }
    },

    deleteaddress : async(req,res)=>{
        try {
            
            const userId = req.session.userId
            const addressId = req.body.id
            console.log(addressId);

            await Address.updateOne({user:userId},{$pull:{address:{_id:addressId}}})

            res.json({deleted:true
            })
        } catch (error) {
            
        }
    },

    loadSuccess: async (req,res)=>{
        try {
            const id = req.query.id
            console.log(id);
            // const order = await Orders.find({})
            // console.log(order);
            res.render('user/success',{order:''})
        } catch (error) {
            console.log(error);
        }
    },

    editaddress : async(req,res)=>{
        try {
            
            const userId = req.session.userId
           
           const addressId = req.body.addressId
           

           const updatedAddress = await Address.findOneAndUpdate(
            { user:userId, 'address._id': addressId},
            {
                $set:{
                    'address.$.fullName': req.body.fullName,
                    'address.$.country': req.body.country,
                    'address.$.housename': req.body.housename, 
                    'address.$.state': req.body.state,
                    'address.$.city': req.body.city,
                    'address.$.pincode': req.body.pincode,
                    'address.$.phone': req.body.phone,
                    'address.$.email': req.body.email,
                }
            },
            {new: true}
           )

           res.setHeader('Content-Type', 'application/json');
           res.json({ success: true});

        } catch (error) {
            console.error(error.message);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }
}