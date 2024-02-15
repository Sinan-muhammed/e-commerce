const express=require('express')
const router = express.Router()
const adminCantrollers  = require('../controller/adminController')
const categoryCantrollers = require("../controller/categoryController")
const productCantrollers = require("../controller/productcontroller")
const bannerControllers = require('../controller/bannerContrller')
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


// router.get('/coupons',couponGET)

// router.get('/coupons/addcoupons',addcouponGET)
// // router.post('/coupons/addcoupons',adminRouter)
// router.get('/coupons/editcoupons',editcouponGET)
// // router.post('/coupons/editcoupons',addcouponGET)
// // router.delete('/coupons/deletecoupons',adminRouter)


router.get('/banner',bannerControllers.loadbanner)
router.get('/addbanner',bannerControllers.addbannerGet)
router.post('/addbanner',uploadBanner.single('image'),bannerControllers.addbannerPost)
// router.get('/banner/editbanner',editbannerGET)
// // router.post('/banner/editbanner',editbannerGET)

// router.get('/orders',ordersGET)
// router.get('/orders/showorders',showorderGET)
// // router.post()


router.get('/logout',adminCantrollers.adminLogout)


module.exports=router