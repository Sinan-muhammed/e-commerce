const mongoose = require('mongoose')



const productSchema = mongoose.Schema({
    name:{
        type : String,
        required:true
    },
    quantity:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    offer:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    images:{
        type:Array,
        required:true
    }
})


module.exports = mongoose.model('Product',productSchema)