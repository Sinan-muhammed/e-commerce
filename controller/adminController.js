const express = require("express");
const userData = require("../models/signupModel");
const bcrypt = require("bcrypt");
const Category = require("../models/categorymodal");
const Product = require("../models/productmodel");
const Order = require("../models/orderModel");
const adminData = require("../models/adminDatamodel");
const { name } = require("ejs");

module.exports = {
  signupGet: async (req, res) => {
    res.render("admin/signup");
  },
  signupPost: async (req, res) => {
    try {
      console.log(req.body);
      const { email, password, name, mobile } = req.body;

      const adminDetails = await adminData.create({
        name: name,
        email: email,
        mobile: mobile,
        password: password,
      });

      res.redirect(`/admin/ad-login?email=${email}`);
    } catch (error) {
      console.log(error);
    }
  },
  adminLoginGET: async (req, res) => {
    try {
      const email = req.query.email;
      const message = 'does not match email and password';
      res.render("admin/admin-login", { message, email });
    } catch (error) {
      console.log(error);
    }
  },
  adminLoginPost: async (req, res) => {
    try {
      const queryemail = await req.query.email;
      const { email, password } = req.body;
      const admin = await adminData.findOne({ email: email });
      req.session.adminId = admin._id;

      if (admin) {
        res.redirect(`/admin/dashboard`);
      }
    } catch (error) {
      console.log(error);
    }
  },

  adminDashboardGET: async (req, res) => {
    const ordercount = await Order.find({}).countDocuments();
    const productcount = await Product.find({}).countDocuments();
    const order = await Order.find().populate("userId");
    const categorycount = await Category.find({}).countDocuments();

    res.render("admin/dashboard", {
      order,
      ordercount,
      productcount,
      categorycount,
    });
  },

  usersGET: async (req, res) => {
    try {
      const users = await userData.find();
      res.render("admin/users", { users });
    } catch (error) {
      console.log(error);
    }
  },

  bolckeUser: async (req, res) => {
    try {
      const user = req.params.id;
      const userValue = await userData.findOne({ _id: user });
      if (userValue.is_blocked) {
        await userData.updateOne(
          { _id: user },
          { $set: { is_blocked: false } }
        );
      } else {
        await userData.updateOne({ _id: user }, { $set: { is_blocked: true } });
        req.session.user_id = null;
      }
      res.json({ block: true });
    } catch (error) {
      console.log(error.message);
    }
  },

  reportGET: (req, res) => {
    const { startDate, endDate } = new Date();
    const order = [];
    const product = [];

    try {
      res.render("admin/report", { startDate, endDate, order, product });
    } catch (error) {
      console.log(error);
    }
  },

  orderGet: async (req, res) => {
    try {
      const order = await Order.find().populate("userId");
      res.render("admin/order", { order });
    } catch (error) {
      console.log(error);
    }
  },

  showOrder: async (req, res) => {
    try {
      const order = await Order.findOne({ _id: req.query.id }).populate(
        "products.productId"
      );
      res.render("admin/showorder", { order });
    } catch (error) {
      console.log(error);
    }
  },
  updatestatus: async (req, res) => {
    try {
      const productId = req.body.productId;
      const productStatus = req.body.newStatus;
      const updatedOrder = await Order.findOneAndUpdate(
        {
          "products._id": productId,
        },
        {
          $set: {
            "products.$.productstatus": productStatus,
          },
        },
        { new: true }
      );

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
      console.log(error);
    }
  },
  Logout: async (req, res) => {
    try {
      req.session.destroy();
      res.redirect("/admin");
    } catch (error) {
      console.log(error.message);
    }
  },

  
  chartData: async (req, res) => {
    try {
      const salesData = await Order.aggregate([
        { $match: { "products.productstatus": "Delivered" } },
        {
          $group: {
            _id: { $month: "$purchaseDate" },
            totalAmount: { $sum: "$totalAmount" },
          },
        },
        {
          $project: {
            _id: 0,
            month: "$_id",
            totalAmount: 1,
          },
        },
        {
          $sort: { month: 1 },
        },
      ]);

      res.json(salesData);
    } catch (error) {
      console.error("Error fetching data from database:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  paymentChart: async (req, res) => {
    try {
      const paymentData = await Order.aggregate([
        {
          $match: { "products.productstatus": "Delivered" },
        },
        {
          $group: {
            _id: "$paymentMethod",
            totalAmount: { $sum: "$totalAmount" },
          },
        },
      ]);
  
      res.json(paymentData);
    } catch (error) {
      console.error(
        "Error fetching payment data from the database:",
        error.message
      );
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};
