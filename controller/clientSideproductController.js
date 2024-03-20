const User = require('../models/signupModel')
const path = require('path')
const ejs   = require('ejs')
const  puppeteer = require('puppeteer')
const browser    = require('browser')
const Product = require('../models/productmodel')
const Category = require('../models/categorymodal')
const Banner = require('../models/bannermodel')
const Coupon = require('../models/couponmodel')
const Cart   = require('../models/cartModel')
const Adress  = require('../models/addressmodel')
const Order  = require('../models/orderModel')
const reviewModel = require('../models/reviewModel')
const { log } = require('util')
const { ObjectId } = require('mongodb')




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
            const productId = new ObjectId(req.query.id)
            
            const cart = await Cart.findOne({user:req.session.userId})
            const product = await Product.findOne({_id:productId})

           const review = await reviewModel.aggregate([
                { $match: { productId: productId } }
            ]);

            console.log(review,'review');
            res.render('user/product',{product,review,locals,cart})
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
            
            const userId = new ObjectId (req.session.userId)
            console.log(userId,'user id');
            const id = new ObjectId (req.query.id,'order id')
            const orderData = await Order.findOne({_id:id}).populate('products.productId')
            console.log(orderData);
            res.render('user/orderdetails',{order:orderData})
        } catch (error) {
            console.log(error);
        }
    },

    
   
    loadInvoice: async (req,res)=>{
        try {
            const productId = req.query.productId
            const orderId = req.query.orderId
            console.log(orderId,1,productId);
            const orderData = await Order.findOne({_id:orderId}).populate('userId')
            const productsData = await Promise.all(
                orderData.products.map(async(product)=>{
                    const productDetails = await Product.findOne({_id:productId})
                    return{
                        ...product.toObject(),
                        productDetails
                    }
                })
            )
            console.log(productsData,'details');

            const projectRoot = path.join(__dirname,'..')

            const invoiceTemplatePath = path.join(projectRoot,'views',"user",'invoice.ejs')
            const htmlContent    = await ejs.renderFile(invoiceTemplatePath,{productsData,orderData})

            const browser = await puppeteer.launch()
            const page = await browser.newPage()

            await page.setContent(htmlContent)

            // Genarate Pdf 
            const pdfBuffer = await page.pdf()

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=invoice.pdf`);
            res.send(pdfBuffer);

            await browser.close();

        } catch (error) {
            console.error('Error generating invoice:', error.message);
            res.status(500).send('Internal Server Error');
        }
    },

}