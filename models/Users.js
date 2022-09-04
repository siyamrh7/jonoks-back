const mongoose = require('mongoose')

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
    },
    mobile:{
        type:String,
        required:true
    },
    zipcode:{
        type:Number
    },
    rating:{
        type:Array,
        default:[]
    },
    category:{
        type:String
    },
    services:[
        {type:mongoose.Schema.Types.ObjectId,ref:"Services"}
    ],
    usertype:{
        type:String,
       
    }

},{timestamps:true})

const Users= mongoose.model("Users",userSchema)

module.exports=Users