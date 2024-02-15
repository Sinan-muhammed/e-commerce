const fs = require('fs')
const path = require('path')
const Product = require('../models/productmodel')
const category = require('../models/categorymodal')
const multter = require("../middlewares/multer")
const { log } = require('console')



module.exports={
    productGET: async (req,res) => {
        try {
            const products= await Product.find()
            res.render('admin/product',{products})
        } catch (error) {
           console.log(error); 
        }
    },
    addproductGET:async (req,res)=>{
        try {
            const categoryData= await category.find({})
          
            res.render('admin/addproduct',{category:categoryData})
        } catch (error) {
            console.log(error);
        }
    },
    addproductPOST:async (req,res)=>{

        try {
           
            const {name,quantity,category,price,offer,description}=req.body
            const imageFile = req.files.map((file)=> file.filename)


            const product = await new Product({
                name,
                quantity,
                category,
                price,
                offer,
                description,
                images: imageFile
            })

            await product.save()
            res.redirect(`/admin/product`)
            
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error')
        }
       
    },
     editproductGET: async (req,res)=>{
        try {
            const id=req.query.id
            console.log(id);
            const Category = await category.find()
            console.log(category);
            const productData = await Product.findById(id)
            console.log(productData);
            
            if(productData){

                res.render('admin/editproduct',{product:productData,category:Category})
                console.log("category data sent succesfully");
            }
        } catch (error) {
            console.log(error);
        }
    },
    editproductPOST: async (req,res)=>{
        try {
            
            console.log(req.files);
            const _id = req.query.id
            console.log(_id);
            const {name,quantity,category,price,offer,description}=req.body
            
            const imageFile = req.files.map((file)=> file.filename)
            console.log(imageFile);
  
            await Product.findByIdAndUpdate({_id},{
                name,
                quantity,
                category,
                price,
                offer,
                description,
                $push: {images:{$each : imageFile}}
            }
                )

               res.redirect('/admin/product')

        } catch (error) {
            console.log(error);
        }
    },
    
    deleteproduct: async (req,res)=>{
        try {
            const _id = req.params.id
            console.log(_id)
            await Product.deleteOne({_id:_id})
            res.status(200).json({message:"product deleted successfully"})
    //  res.redirect('/admin/product')

        } catch (error) {
            res.status(500).json({message:"Internal server error"})
            console.log(error);
        }
    }
}