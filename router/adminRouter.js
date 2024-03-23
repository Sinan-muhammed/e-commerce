const express=require('express')
const router = express.Router()
const session = require("express-session");
const adminCantrollers  = require('../controller/adminController')
const categoryCantrollers = require("../controller/categoryController")
const productCantrollers = require("../controller/productcontroller")
const bannerControllers = require('../controller/bannerContrller')
const couponControllers = require('../controller/couponController')
const {upload,uploadBanner,uploadBranded} = require('../middlewares/multer')
const brandedBannerController = require('../controller/brandedBannerController')
const adminauth = require('../middlewares/adminauth')

router.use(
    session({
        secret:'mine',
        resave:false,
        saveUninitialized:true
    })
)

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.get('/ad-signup',adminCantrollers.signupGet)
router.post('/ad-signup',adminCantrollers.signupPost)

router.get('/ad-login',adminauth.isLogout,adminCantrollers.adminLoginGET)
router.post('/ad-login',adminCantrollers.adminLoginPost)

router.get('/dashboard',adminauth.isLogin,adminCantrollers.adminDashboardGET)

router.get('/users',adminauth.isLogin,adminCantrollers.usersGET)
router.patch('/blockusers/:id',adminCantrollers.bolckeUser)

// router.get('/report',reportGET)

router.get('/category',adminauth.isLogin,categoryCantrollers.categoryGET)

router.get('/addcategory',adminauth.isLogin,categoryCantrollers.addcategoryGET)
router.post('/addcategory',adminauth.isLogin,categoryCantrollers.addcategoryPOST)

router.get('/editcategory',adminauth.isLogin,categoryCantrollers.editcategoryGET)
router.post('/editcategory',adminauth.isLogin,categoryCantrollers.editcategorypost)

router.get('/deletecategory/:id',categoryCantrollers.deleteCategoryGET)

router.get('/product',adminauth.isLogin,productCantrollers.productGET)
router.get('/addProduct',adminauth.isLogin,productCantrollers.addproductGET)
router.post('/addProduct',adminauth.isLogin,upload.array('productimg', 20),productCantrollers.addproductPOST)
router.get('/editProduct',adminauth.isLogin,productCantrollers.editproductGET)
router.post('/editProduct',adminauth.isLogin,upload.array('image1', 20),productCantrollers.editproductPOST)
router.delete('/deleteproduct/:id',productCantrollers.deleteproduct)

router.get('/coupon',adminauth.isLogin,couponControllers.couponhome)
router.get('/addcoupon',adminauth.isLogin,couponControllers.addcouponGet)
router.post('/addcoupon',adminauth.isLogin,couponControllers.addcouponPost)
router.get('/editcoupon',adminauth.isLogin,couponControllers.editCouponGet)
router.post('/editcoupon',adminauth.isLogin,couponControllers.editCouponPost)
router.delete('/deletecoupon/:id',couponControllers.deleteCouponGet)


router.get('/banner',adminauth.isLogin,bannerControllers.loadbanner)
router.get('/addbanner',adminauth.isLogin,bannerControllers.addbannerGet)
router.post('/addbanner',adminauth.isLogin,uploadBanner.single('bannerImg'),bannerControllers.addbannerPost)
router.get('/editbanner',adminauth.isLogin,bannerControllers.editbannerGet)
router.post('/editbanner',adminauth.isLogin,uploadBanner.single('image12'),bannerControllers.editbannerPost)
router.delete('/deletebanner/:id',bannerControllers.deletebanner)

router.get('/branded',adminauth.isLogin,brandedBannerController.loadBrandedBanner)
router.get('/addBrandedbanner',adminauth.isLogin,brandedBannerController.addBrandedGet)
router.post('/addBrandedbanner',adminauth.isLogin,uploadBranded.single('bannerImg'),brandedBannerController.addBrandedPost)
router.delete('/deletebrand/:id',brandedBannerController.deleteBranded)
router.get('/editbrand',adminauth.isLogin,brandedBannerController.editBrand)
router.post('/editbrand',adminauth.isLogin,uploadBranded.single('image12'),brandedBannerController.editBrandpost)

router.get('/order',adminauth.isLogin,adminCantrollers.orderGet)
router.get('/showorder',adminauth.isLogin,adminCantrollers.showOrder)
router.post('/updateProductStatus',adminauth.isLogin,adminCantrollers.updatestatus)
router.get('/chart',adminauth.isLogin,adminCantrollers.chartData)
router.get('/paymentChart',adminauth.isLogin,adminCantrollers.paymentChart)

router.get('/logout',adminCantrollers.Logout)


module.exports=router