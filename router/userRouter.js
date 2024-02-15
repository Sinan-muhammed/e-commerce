const express = require("express");
const router = express.Router();
const session = require("express-session");
const flash = require("connect-flash");

const {
  homeGet,
  loginGET,
  loginpost,
  signupGET,
  signupPOST,
  otpGET,
  otpPOST,
} = require("../controller/userController");

router.use(
  session({
    secret: "loco",
    resave: false,
    saveUninitialized: true,
  })
);

router.get("/", homeGet);

router.get("/login", loginGET, otpPOST);
router.post("/login", loginpost);

router.get("/signup", signupGET);
router.post("/signup/", signupPOST);

router.get("/verifyotp/", otpGET);
router.post("/verifyotp", otpPOST);

// router.get('/forget_password',userRouter)
// router.post('/forget_password',userRouter)

// router.get('/reset_password',userRouter)
// router.post('/reset_password',userRouter)

// router.get('/home',userRouter)

// router.get('/product',userRouter)

// router.get('/category',userRouter)

// router.get('/cart',userRouter)
// router.delete('/cart/delete_item',userRouter)

// router.get('/wishlist',userRouter)
// router.delete('/wishlist/delete_item',userRouter)

// router.get('/account',userRouter)
// router.post('/account/profile',userRouter)

// router.get('/account/shipping_address',userRouter)
// router.post('/account/shipping_address',userRouter)

// router.get('/account/orders',userRouter)

// router.get('/checkout',userRouter)
// router.post('/checkout',userRouter)

// router.get('/payment',userRouter)
// router.post('/payment',userRouter)

// router.get('/logout',userRouter)

module.exports = router;
