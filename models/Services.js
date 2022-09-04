const mongoose= require('mongoose')

const ServiceSchema=new mongoose.Schema({
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
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    zipcode:{
        type:Number,
        required:true
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
    }
    
},{timestamps:true})

const Services=mongoose.model("Services",ServiceSchema)

module.exports=Services