const Address = require('../models/addressmodel')
const Cart    = require('../models/cartModel')
const Order   = require('../models/orderModel')
const Product = require('../models/productmodel')
const User    = require('../models/signupModel')
const  Razorpay = require('razorpay')
const crypto  = require('crypto')
const { log } = require('console')


const instance = new Razorpay({
    key_id: process.env.RAZORPAY_ID_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY
});

// Now you can use the 'razorpay' object to make API calls



  
  module.exports = {
      
      //Place order
      placeorder: async (req, res) => {
        try {

            console.log("place order");
            const total = req.body.totalamount;
            console.log(total,'total');
            console.log(req.body);
            const userId = req.session.userId;
            const addressIndex = !req.body.address ? 0 : req.body.address;
            const paymentMethod = req.body.payment;
            console.log(paymentMethod);
            const status = paymentMethod === 'COD' ? 'placed' : 'pending';
            console.log(status);
    
            if (!req.body.address) {
                const addressData = {
                    fullName: req.body.fullName,
                    country: req.body.country,
                    housename: req.body.housename,
                    state: req.body.state,
                    city: req.body.city,
                    pincode: req.body.pincode,
                    phone: req.body.phone,
                    email: req.body.email
                };
                await Address.findOneAndUpdate(
                    { user: userId },
                    {
                        $set: { user: userId },
                        $push: { address: addressData }
                    },
                    { upsert: true, new: true }
                );
            }
    
            const addressData = await Address.findOne({ user: userId });
            const address = addressData.address[addressIndex];
            const cartData = await Cart.findOne({ user: userId });
            const totalAmount = cartData.product.reduce((acc, val) => acc + val.quantity * val.price, 0);
    
            const orderItems = cartData.product.map((product) => ({
                productId: product.productId,
                quantity: product.quantity,
                price: product.price,
                totalPrice: product.quantity * product.price,
                productstatus: 'placed'
            }));
    
            const order = new Order({
                userId: userId,
                deliveryDetails: address,
                products: orderItems,
                purchaseDate: new Date(),
                totalAmount: totalAmount,
                status: status,
                paymentMethod: paymentMethod
            });
    
            const orderData = await order.save();
    
            if (status === 'placed') {
                for (const item of orderItems) {
                    await Product.updateOne(
                        { _id: item.productId },
                        { $inc: { quantity: -item.quantity } }
                    );
                }
                await Cart.deleteOne({ user: userId });
                res.json({ placed: true });
            } else if (paymentMethod === 'onlinePayment') {
                // Handle online payment
                // Ensure that 'instance' is properly initialized
                // and that 'instance.orders.create' is a valid function call
                const options = {
                    amount: totalAmount * 100,
                    currency: 'INR',
                    receipt: "" + orderData._id
                };
                console.log(options);
                instance.orders.create(options, function (err, order) {
                    res.json({ order });
                });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    verifypayment : async (req,res)=>{
        try {
            const userId = req.session.userId;
            const paymentData = req.body
            console.log(paymentData,'kitoot');
            const cartData = await Cart.findOne({user:userId})

            await Order.findByIdAndUpdate(
                {_id: paymentData.order.receipt},
                {$set:{ status: 'placed',paymentId : paymentData.payment.razorpay_payment_id}}
            )

            await Cart.deleteOne({ user : userId})
            res.json({ placed: true });

        } catch (error) {
            console.log(error.message);
        }
    }
  }  
  
  