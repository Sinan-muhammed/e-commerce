const express = require("express");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("connect-flash");
const userData = require("../models/signupModel");
const Cart    = require('../models/cartModel')
const Banner  = require('../models/bannermodel')
const Product = require('../models/productmodel')
const objectID = require("mongodb").objectID;
const { name } = require("ejs");

const accountSid = "AC1985e94c73acdc5f1a3f408c8cad231a";
const authToken = "507a2d6b03f5e7658f85d306de19b592";
const verifySid = "VA2daca26d9d84268f6700c93859333e0e";
const client = require("twilio")(accountSid, authToken);

module.exports = {
  homeGet: async (req, res) => {
    try {

      if(req.session.userId){
        const locals =await userData.findOne({_id:req.session.userId})

        const cart= await Cart.findOne({user:req.session.userId})
        const banner = await Banner.find({}) ;
        const product = await Product.find()
        res.render("user/home", { banner,locals,cart,product});

      }
      else{
        res.redirect('/login')
      }
    } catch (error) {
      console.log(error);
    }
  },

  loginGET: (req, res) => {
    const email = req.query.email;

    res.render(`user/login`, { email });
  },

  loginpost: async (req, res) => {

    const queryemail = await req.query.email;
   
    try {
      const { email, password } = req.body;
      const user = await userData.findOne({ email: email });


      req.session.userId = user._id
      console.log(req.session.userId);

      if (user) {
        if (user.is_verified === true) {
          res.redirect("/");
        } else {
          console.log(`otp verification cheyyathe thendi ${email}`);
          const USER = await userData.findOne({ email: email });
          const number = USER.mobile;
          res.redirect(`/verifyotp?email=${email}&number=${number}`);
          client.verify.v2
            .services(verifySid)
            .verifications.create({ to: `+91${number}`, channel: "sms" })
            .then((verification) => console.log(verification.status))
            .then(() => {
              console.log("5");

              const readline = require("readline").createInterface({
                input: process.stdin,
                output: process.stdout,
              });
            });
          console.log("6");

          console.log("user verification is true");
        }
      }
    } catch (error) {
      console.log(error);
    }
  },

  signupGET: (req, res) => {
    res.render("user/signup");
  },
  
  signupPOST: async (req, res) => {
  
    const { email, password, name, mobile } = req.body;

    async function signupData() {
      const userDatas = await userData.create({
        name: name,
        email: email,
        mobile: mobile,
        password: password,
        Role: "user",
      });
    }



    signupData();
    
    try {
      client.verify.v2
        .services(verifySid)
        .verifications.create({ to: `+91${mobile}`, channel: "sms" })
        .then((verification) => console.log(verification.status))
        .then(() => {
          console.log("5");

          const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
          });
        });
      console.log("6");

      console.log("signup completed");
      res.status(200).redirect(`/verifyotp?number=${mobile}&email=${email}`);
    } catch (error) {
      console.log("7");

      res
        .status(error?.status || 400)
        .send(error?.message || `something went wrong`);
    }
    console.log(300);
  },
  // 
  otpGET: async (req, res) => {
    const number = req.query.number;
    const email = req.query.email;

    const userotpveri = await userData.findOne({ email: email });

    if (userotpveri === email) {
      const usernumber = userotpveri.mobile;
      console.log(usernumber, "user number");
      res.redirect(`/verifyotp?usernumber=${usernumber}`);
      if (usernumber) {
        try {
          client.verify.v2
            .services(verifySid)
            .verifications.create({ to: `+91${usernumber}`, channel: "sms" })
            .then((verification) => console.log(verification.status))
            .then(() => {
              console.log("otp verify cheyyatha aalk otp aykanam");
              console.log("5");

              const readline = require("readline").createInterface({
                input: process.stdin,
                output: process.stdout,
              });
            });
        } catch {
          res
            .status(error?.status || 400)
            .send(error?.message || `something went wrong`);
        }
      }
    }

    res.render("user/otp", { id: "", number, email });
  },
  otpPOST: async (req, res) => {
    console.log("ff");
    const { otp } = req.body;
    const number = req.query.number;
    const email = req.query.email;
    const usernumber = req.query.usernumber;

    console.log(number);
    console.log(email);
    console.log(usernumber);

    try {
      const verification_check = await client.verify.v2
        .services(verifySid)
        .verificationChecks.create({
          to: `+91${number || usernumber}`,
          code: otp,
        });

      console.log("58");

      console.log(verification_check.status);

      if (verification_check.status === "approved") {
        const upadatedata = await userData.findOneAndUpdate(
          { email: email },
          { $set: { is_verified: true } },
          { new: true }
        );
        console.log(upadatedata);
        res.status(200).redirect(`/login?email=${email}`);
      } else {
        res.status(402).redirect(`/verifyotp`);
      }
    } catch (error) {
      console.log("142");
      console.log(error);
      res
        .status(error?.status || 400)
        .send(error?.message || "something went rong");
    }
  },

  loadForgetGet: async (req,res)=>{
    try {
      res.render("user/forgot")
    } catch (error) {
      console.log(error);
    }
  },

  loadResetPassword: async (req,res)=>{
    try {
      res.render('user/resetPassword',{token:''})
    } catch (error) {
      console.log(error);
    }
  },
 
  loadAbout: async (req,res)=>{
    try {
      res.render('user/about')
    } catch (error) {
      console.log(error);
    }
  },

  loadfaq: async (req,res)=>{
    try {
      res.render('user/faq')
    } catch (error) {
      console.log(error);
    }
  },

  loadcontact: async (req,res)=>{
    try {
      res.render('user/contact')
    } catch (error) {
      console.log(error);
    }
  }

};
