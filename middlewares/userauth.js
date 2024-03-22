const { NetworkContextImpl } = require('twilio/lib/rest/supersim/v1/network');
const User = require('../models/signupModel')




module.exports = {
    isLogin : async (req,res,next)=>{
        try {
            if(req.session.userId){
                console.log(req.session.userId);

                const userData = await User.findById(req.session.userId)
                if(userData.is_blocked){
                    res.redirect('/signup')
                }else{
                    next()
                }
            }else{
                res.redirect('/')
            }
        } catch (error) {
            console.error('Error in isLogin middleware:', error.message);
            res.status(500).send('Internal Server Error');
        }
    },
    isLogout : async (req,res,next)=>{
        try {
            if(req.session.userId){
                const userData = await User.findById(req.session.userId)
                if(userData.is_blocked){
                    next()
                }else{
                    res.redirect('/')
                }
            }else{
                next()
            }
        } catch (error) {
            console.error('Error in isLogout middleware:', error.message);
            res.status(500).send('Internal Server Error');
        }
    }
}