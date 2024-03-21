const mongoose = require('mongoose')


const brandedModel = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    targeturl : {
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Branded Banner',brandedModel)