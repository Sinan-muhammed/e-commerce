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
  
  const upload = multer({ storage: storage })

  const uploadBanner =multer({storage:BannerStorege})

  module.exports = {  
             upload,
             uploadBanner
  }