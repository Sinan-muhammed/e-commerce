const express = require("express");
const router = express.Router();
const session = require("express-session");
const flash = require("connect-flash");
const productController = require('../controller/clientSideproductController')
const userController = require("../controller/userController");
const Cartcontroller = require('../controller/cartcantroller');
const cartcantroller = require("../controller/cartcantroller");
const addresscontroller = require("../controller/addresscontroller");
const wishlistController = require('../controller/wishlistCantroller')
const Couponcontroller  = require('../controller/couponController')
const OrderController   = require('../controller/ordercontrollers')

// Configure session middleware
router.use(
  session({
    secret: "loco",
    resave: false,
    saveUninitialized: true,
  })
);

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get("/",userController.homeGet);

router.get("/login", userController.loginGET);
router.post("/login", userController.loginpost);

router.get("/signup", userController.signupGET);
router.post("/signup/",userController.signupPOST);

router.get("/verifyotp/", userController.otpGET);
router.post("/verifyotp", userController.otpPOST);

router.get('/forgetpassword',userController.loadForgetGet)
// router.post('/forgetpassword',userRouter)

router.get('/resetpassword',userController.loadResetPassword)
// router.post('/reset_password',userRouter)

router.get('/shop',productController.shopLoad)

router.get('/product',productController.loadEachProduct)

// router.get('/category',userRouter)

router.get('/cart',cartcantroller.loadCart)
router.patch('/addtocart',cartcantroller.addtoCart)
router.post('/updatecart',cartcantroller.updateCart)
router.post('/removecartitem',cartcantroller.removeCartitem)

router.get('/wishlist',wishlistController.loadWishlist)
router.patch('/addtowishlist',wishlistController.addtowishlist)
router.post('/removewishlist',wishlistController.removewishlist)


router.get('/account',productController.loadAccount)
// router.post('/account/profile',userRouter)

router.get('/success',addresscontroller.loadSuccess)
// router.get('/account/orders',userRouter)

router.get('/checkout',cartcantroller.loadCheckout)
router.post('/addaddress',addresscontroller.addaddress)
router.post('/addaddresses',addresscontroller.addaddressprofile)
router.delete('/deleteaddress',addresscontroller.deleteaddress)
router.post('/editaddresses',addresscontroller.editaddress)

router.post('/placeorder',OrderController.placeorder)

router.get('/orderdetails',productController.loadOrderDetails)

router.post('/checkcoupon',Couponcontroller.checkcoupon)

router.get('/about',userController.loadAbout)
router.get('/faq',userController.loadfaq)
router.get('/contact',userController.loadcontact)

router.get('/invoice',productController.loadInvoice)
// router.get('/logout',userRouter)

module.exports = router;
