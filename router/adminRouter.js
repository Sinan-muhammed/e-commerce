const express=require('express')
const router = express.Router()
const adminCantrollers  = require('../controller/adminController')
const categoryCantrollers = require("../controller/categoryController")
const productCantrollers = require("../controller/productcontroller")
const bannerControllers = require('../controller/bannerContrller')
const couponControllers = require('../controller/couponController')
const {upload,uploadBanner} = require('../middlewares/multer')




router.route('/').get(adminCantrollers.adminLoginGET)
// router.post('/',adminRouter)

router.route('/dashbord').get(adminCantrollers.adminDashboardGET)

// router.get('/users',usersGET)
// // router.delete('/userList/deleteUser',adminRouter)

// router.get('/report',reportGET)

router.route('/category').get(categoryCantrollers.categoryGET)

router.route('/addcategory').get(categoryCantrollers.addcategoryGET)
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

// router.get('/orders',ordersGET)
// router.get('/orders/showorders',showorderGET)
// // router.post()


router.get('/logout',adminCantrollers.adminLogout)


module.exports=router