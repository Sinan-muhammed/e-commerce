const product = require('../models/productmodel')
const sharp = require('sharp')
const Category = require('../models/categorymodal')

module.exports={
    categoryGET: async (req,res)=>{
        try {
             
             const category = await Category.find({})
             
             
            res.render('admin/categories',{category})
        } catch (error) {
            console.log(error);
        }
    },
    addcategoryGET:(req,res)=>{
        try {
            
             
            res.render('admin/addcategory')
        } catch (error) {
            console.log(error);
        }
    },
    addcategoryPOST:async (req,res)=>{
        try {
         const {name,description}=req.body
        

         const isExists = await Category.findOne({name})

         if(isExists){

          return  res.render('admin/addcategory',{ message: 'category Name already exists'})
         }
        

           const categoryData = await  Category.create({
                 name,
                 description
             })
             // categoryData.save()
             res.redirect('/admin/category')
         
        } catch (error) {
         console.log(error);
        }
 },
 deleteCategoryGET:async(req,res)=>{
            
     const id = req.params.id
     console.log(id);
     await Category.deleteOne({_id:id})
         console.log('category deleted');   
     res.redirect('/admin/category')
 },
    editcategoryGET:async (req,res)=>{
        try {
            const id = req.query.id
            console.log(id);
            const categoryData= await Category.findById(id)
            console.log(categoryData);
           if(categoryData){
            res.render('admin/editcategory',{categoryData})
            console.log('category data sent successfully');
           }

        } catch (error) {
            console.log(error);
        }
    },
    editcategorypost:async (req,res)=>{
        console.log('515454');
        try {
           const categoryData = await Category.findById({_id:req.body.id})
           const exist = await Category.findOne({ name :req.body.name})
           console.log("nbcdbc");
           if(exist){
             return  res.render('admin/editcategory',{message:'Duplicates is not allowed!',categoryData})
           }
           await Category.findByIdAndUpdate(
               {_id: req.body.id},
               {$set:{ name:req.body.name, description: req.body.description}}

               )
               return   res.redirect(`/admin/category`)
        } catch (error) {
           console.log(error.message);
        }
   },
}