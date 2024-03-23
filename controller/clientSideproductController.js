const User = require("../models/signupModel");
const path = require("path");
const ejs = require("ejs");
const bcrypt = require("bcrypt");
const puppeteer = require("puppeteer");
const browser = require("browser");
const Product = require("../models/productmodel");
const Category = require("../models/categorymodal");
const Banner = require("../models/bannermodel");
const Coupon = require("../models/couponmodel");
const Cart = require("../models/cartModel");
const Adress = require("../models/addressmodel");
const Order = require("../models/orderModel");
const reviewModel = require("../models/reviewModel");
const { log } = require("util");
const { ObjectId } = require("mongodb");

module.exports = {
  shopLoad: async (req, res) => {
    try {
      let showProducts;
      const user = req.session.userId;
      const searchValue = req.query.search;
      const categoriesValue = req.query.category;
      const sortedprice = req.query.priceFilter;
      if (searchValue || categoriesValue || sortedprice) {
        if (searchValue) {
          showProducts = await Product.find({
            name: { $regex: searchValue, $options: "i" },
          });
        }
        if (categoriesValue) {
          showProducts = await Product.find({ category: categoriesValue });
        }
        if (sortedprice) {
          if (sortedprice == "high-to-low") {
            showProducts = await Product.find({}).sort({ price: -1 });
          } else if (sortedprice == "low-to-high") {
            showProducts = await Product.find({}).sort({ price: 1 });
          }
        }
      } else {
        showProducts = await Product.find();
      }
      const locals = await User.findOne({ _id: user });
      const category = await Category.find();
      const cart = await Cart.findOne({ user: user });

      res.render("user/shop", {
        product: showProducts,
        totalPages: "",
        category,
        locals,
        cart,
      });
    } catch (error) {
      console.log(error);
    }
  },
  loadEachProduct: async (req, res) => {
    try {
      const locals = await User.findOne({ _id: req.session.userId });
      const productId = new ObjectId(req.query.id);

      const cart = await Cart.findOne({ user: req.session.userId });
      const product = await Product.findOne({ _id: productId });

      console.log(reviewModel);
      const review = await reviewModel.find({});

      console.log(review, "review");
      res.render("user/product", { product, review, locals, cart });
    } catch (error) {
      console.log(error);
    }
  },
  loadAccount: async (req, res) => {
    try {
      const user = req.session.userId;
      const userData = await User.findOne({ _id: user });
      const addresses = await Adress.findOne({ user: user });
      const CouponData = await Coupon.find({});
      const orders = await Order.find({ userId: user });

      res.render("user/account", {
        userData,
        orders,
        CouponData,
        addresses,
        user,
      });
    } catch (error) {
      console.log(error);
    }
  },

  loadOrderDetails: async (req, res) => {
    try {
      const userId = new ObjectId(req.session.userId);

      const id = new ObjectId(req.query.id, "order id");
      const orderData = await Order.findOne({ _id: id }).populate(
        "products.productId"
      );

      res.render("user/orderdetails", { order: orderData });
    } catch (error) {
      console.log(error);
    }
  },

  passwordchange: async (req, res) => {
    try {
      const userData = await User.findById(req.session.userId);

      if (
        req.body.currentpassword ||
        (req.body.newpassword && req.body.newpassword2)
      ) {
        if (
          !req.body.newpassword ||
          req.body.newpassword.trim() === "" ||
          !req.body.newpassword2 ||
          req.body.newpassword2.trim() === ""
        ) {
          return res.render("user/account", {
            message: "New passwords cannot be empty.",
          });
        }

        if (req.body.newpassword !== req.body.newpassword2) {
          return res.render("user/account", {
            message: "New passwords do not match.",
          });
        }

        if (req.body.newpassword.length < 8) {
          return res.render("user/account", {
            message: "New password must be at least 8 characters long.",
          });
        } else {
          const matchPassword = await bcrypt.compare(
            req.body.currentpassword,
            userData.password
          );

          if (matchPassword) {
            sPassword = await securePassword(req.body.newpassword);
          } else {
            return res.render("user/account", {
              message:
                "Please enter either a current password or new passwords.",
            });
          }
        }
      } else {
        sPassword = userData.password;
        return res.render("user/account", {
          message: "Please enter either a current password or new passwords.",
        });
      }
      await User.findOneAndUpdate(
        { email: userData.email },
        {
          $set: { password: sPassword },
        },
        { new: true }
      );
      res.redirect("/account");
    } catch (error) {
      console.log(error);
    }
  },

  loadInvoice: async (req, res) => {
    try {
      const productId = req.query.productId;
      const orderId = req.query.orderId;
      const orderData = await Order.findOne({ _id: orderId }).populate(
        "userId"
      );
      const productsData = await Promise.all(
        orderData.products.map(async (product) => {
          const productDetails = await Product.findOne({ _id: productId });
          return {
            ...product.toObject(),
            productDetails,
          };
        })
      );

      const projectRoot = path.join(__dirname, "..");

      const invoiceTemplatePath = path.join(
        projectRoot,
        "views",
        "user",
        "invoice.ejs"
      );
      const htmlContent = await ejs.renderFile(invoiceTemplatePath, {
        productsData,
        orderData,
      });

      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.setContent(htmlContent);

      // Genarate Pdf
      const pdfBuffer = await page.pdf();

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=invoice.pdf`);
      res.send(pdfBuffer);

      await browser.close();
    } catch (error) {
      console.error("Error generating invoice:", error.message);
      res.status(500).send("Internal Server Error");
    }
  },
};
