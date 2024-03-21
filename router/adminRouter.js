const express=require('express')
const router = express.Router()
const adminCantrollers  = require('../controller/adminController')
const categoryCantrollers = require("../controller/categoryController")
const productCantrollers = require("../controller/productcontroller")
const bannerControllers = require('../controller/bannerContrller')
const couponControllers = require('../controller/couponController')
const {upload,uploadBanner,uploadBranded} = require('../middlewares/multer')
const brandedBannerController = require('../controller/brandedBannerController')



router.get('/ad-signup',adminCantrollers.signupGet)
router.post('/ad-signup',adminCantrollers.signupPost)

router.get('/ad-login',adminCantrollers.adminLoginGET)
router.post('/ad-login',adminCantrollers.adminLoginPost)

router.get('/dashboard',adminCantrollers.adminDashboardGET)

router.get('/users',adminCantrollers.usersGET)
router.patch('/blockusers/:id',adminCantrollers.bolckeUser)

// router.get('/report',reportGET)

router.get('/category',categoryCantrollers.categoryGET)

router.get('/addcategory',categoryCantrollers.addcategoryGET)
router.post('/addcategory',categoryCantrollers.addcategoryPOST)

router.get('/editcategory',categoryCantrollers.editcategoryGET)
router.post('/editcategory',categoryCantrollers.editcategorypost)

router.get('/deletecategory/:id',categoryCantrollers.deleteCategoryGET)

     

router.get('/product',productCantrollers.productGET)
router.get('/addProduct',productCantrollers.addproductGET)
router.post('/addProduct',upload.array('productimg', 20),productCantrollers.addproductPOST)

router.get('/editProduct',productCantrollers.editproductGET)
router.post('/editProduct',upload.array('image1', 20),productCantrollers.editproductPOST)

router.delete('/deleteproduct/:id',productCantrollers.deleteproduct)


router.get('/coupon',couponControllers.couponhome)

router.get('/addcoupon',couponControllers.addcouponGet)
router.post('/addcoupon',couponControllers.addcouponPost)
router.get('/editcoupon',couponControllers.editCouponGet)
router.post('/editcoupon',couponControllers.editCouponPost)
router.delete('/deletecoupon/:id',couponControllers.deleteCouponGet)


router.get('/banner',bannerControllers.loadbanner)
router.get('/addbanner',bannerControllers.addbannerGet)
router.post('/addbanner',uploadBanner.single('bannerImg'),bannerControllers.addbannerPost)
router.get('/editbanner',bannerControllers.editbannerGet)
router.post('/editbanner',uploadBanner.single('image12'),bannerControllers.editbannerPost)
router.delete('/deletebanner/:id',bannerControllers.deletebanner)

router.get('/branded',brandedBannerController.loadBrandedBanner)
router.get('/addBrandedbanner',brandedBannerController.addBrandedGet)
router.post('/addBrandedbanner',uploadBranded.single('bannerImg'),brandedBannerController.addBrandedPost)
router.delete('/deletebrand/:id',brandedBannerController.deleteBranded)
router.get('/editbrand',brandedBannerController.editBrand)
router.post('/editbrand',uploadBranded.single('image12'),brandedBannerController.editBrandpost)

router.get('/order',adminCantrollers.orderGet)
router.get('/showorder',adminCantrollers.showOrder)
router.post('/updateProductStatus',adminCantrollers.updatestatus)

// router.get('/logout',adminCantrollers.adminLogout)


module.exports=router