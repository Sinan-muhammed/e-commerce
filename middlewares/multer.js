const multer =require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/assets/images/products')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

  const BannerStorege = multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null, './public/assets/images/banner')
    },
    filename:(req,file,cb)=>{
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })    

  const BrandedBanner = multer.diskStorage({

    destination :  function(req,file,cb){
      cb(null,'./public/assets/images/Branded')
    },
    filename:(req,file,cb)=>{
      const uniqueSuffix =  Math.round(Math.random() * 1E9)
      cb(null,uniqueSuffix  + '-' +   file.originalname  )
    }
  })
  
  const upload = multer({ storage: storage })

  const uploadBanner =multer({storage:BannerStorege})
  const uploadBranded = multer({storage:BrandedBanner})

  module.exports = {  
             upload,
             uploadBanner,
             uploadBranded
  }