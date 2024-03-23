
module.exports = {
    isLogin : (req,res,next)=>{
        try {
          if(req.session.adminId){
              next()
          }else{
              res.redirect('/admin/ad-login')
          }
        } catch (error) {
          console.error(error.message);
          res.redirect('/admin/ad-login')
        }
  },
  isLogout: (req,res,next)=>{
    try {
        if(req.session.adminId){
            res.redirect('/admin/dashboard')
         }else{
            next()
         }
    } catch (error) {
        console.log(error.message);
    }
  }

}