const express = require("express");
const router = express.Router();
const session = require("express-session");
const flash = require("connect-flash");
const auth = require('../middlewares/userauth')
const productController = require('../controller/clientSideproductController')
const userController = require("../controller/userController");
const Cartcontroller = require('../controller/cartcantroller');
const cartcantroller = require("../controller/cartcantroller");
const addresscontroller = require("../controller/addresscontroller");
const wishlistController = require('../controller/wishlistCantroller')
const Couponcontroller  = require('../controller/couponController')
const OrderController   = require('../controller/ordercontrollers')
const ReviewController    = require('../controller/reviewController');
const reviewController = require("../controller/reviewController");
const clientSideproductController = require("../controller/clientSideproductController");

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
router.post("/login",auth.isLogout, userController.loginpost);

router.get("/signup",auth.isLogout, userController.signupGET);
router.post("/signup/",auth.isLogout,userController.signupPOST);

router.get("/verifyotp/", auth.isLogout,userController.otpGET);
router.post("/verifyotp",auth.isLogout, userController.otpPOST);

router.get('/forgot',userController.loadForgetGet)
router.post('/forgot',userController.forgetPost)

router.get('/resetpassword:token',userController.loadResetPassword)
router.post('/resetpassword',userController.forgetPost)

router.get('/shop',productController.shopLoad)

router.get('/product',productController.loadEachProduct)

// router.get('/category',userRouter)

router.get('/cart',cartcantroller.loadCart)
router.patch('/addtocart',cartcantroller.addtoCart)
router.post('/updatecart',cartcantroller.updateCart)
router.post('/removecartitem',auth.isLogin,cartcantroller.removeCartitem)

router.get('/wishlist',wishlistController.loadWishlist)
router.patch('/addtowishlist',wishlistController.addtowishlist)
router.post('/removewishlist',wishlistController.removewishlist)


router.get('/account',auth.isLogin,productController.loadAccount)
router.post('/passwordchange',auth.isLogin,clientSideproductController.passwordchange)
router.get('/success/',auth.isLogin,addresscontroller.loadSuccess)


router.get('/checkout',auth.isLogin,cartcantroller.loadCheckout)
router.post('/addaddress',auth.isLogin,addresscontroller.addaddress)
router.post('/addaddresses',auth.isLogin,addresscontroller.addaddressprofile)
router.delete('/deleteaddress',auth.isLogin,addresscontroller.deleteaddress)
router.post('/editaddresses',auth.isLogin,addresscontroller.editaddress)

router.post('/placeorder',auth.isLogin,OrderController.placeorder)

router.post('/verifypayment',auth.isLogin,OrderController.verifypayment)

router.get('/orderdetails',auth.isLogin,productController.loadOrderDetails)
router.post('/cancelproduct',auth.isLogin,OrderController.cancelProduct)
router.post('/returnproduct',auth.isLogin,OrderController.returnProduct)

router.post('/checkcoupon',auth.isLogin,Couponcontroller.checkcoupon)
router.post('/removecoupon',auth.isLogin,Couponcontroller.removecoupon)

router.get('/about',userController.loadAbout)
router.get('/faq',userController.loadfaq)
router.get('/contact',userController.loadcontact)

router.get('/search',userController.productSearch)

router.get('/invoice',auth.isLogin,productController.loadInvoice)
router.post('/submit-review',auth.isLogin,reviewController.addreview)
router.post('/vote',auth.isLogin,reviewController.voting)

router.get('/logout',auth.isLogin,userController.userLogout)

module.exports = router;
