
module.exports = {
    isLogin : (req,res,next)=>{
        try {
          if(req.session.adminId){
              nex()
          }else{
              res.redirect('/admin')
          }
        } catch (error) {
          console.error(error.message);
          res.redirect('/admin/login')
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