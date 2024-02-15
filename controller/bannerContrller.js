const express = require("express")
const Banner = require("../models/bannermodel")




module.exports = {

    loadbanner :async(req,res)=>{
        try {
            const banner = await Banner.find({})
            res.render('admin/banner',{banner})
        } catch (error) {
            console.log(error);
        }
    },
    addbannerGet: async (req,res)=>{
        try {
            res.render('admin/addbanner')
        } catch (error) {
            console.log(error);
        }
    },
    addbannerPost : async (req,res)=>{
        try {
            const {title,description,targeturl}=req.body
            console.log(req.body);
            const imageFile = req.file.filename

            const baner = await new Banner({
                title,
                description,
                image:imageFile,
                targeturl
            })

            await baner.save()

            res.redirect('/admin/banner')


        } catch (error) {
            console.log(error);
        }
    }

}

