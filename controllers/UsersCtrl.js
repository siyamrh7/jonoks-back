const Users=require('../models/Users')
const bcrypt=require('bcrypt')
const jwt= require('jsonwebtoken')

const CreateUser=async(req,res)=>{
    try {
        const {name,email,password,mobile,zipcode,category,usertype}=req.body
        if(!name || !email || !password || !mobile ){
            return res.json({status:false,msg:"Invalid Creadentials"})
        }
        
        const find1 = await Users.findOne({mobile})
        if(find1){
            return res.json({status:false,msg:"User already available with this mobile"})
        }
        const find2 = await Users.findOne({email})
        if(find2){
            return res.json({status:false,msg:"User already available with this email"})
        }
         const hashpass=await bcrypt.hash(password,10)
        const seller=await Users.create({name,email,password:hashpass,mobile,zipcode,category,usertype})
         res.json({status:true,msg:"Account creation successful,Wait for confirmation",seller:seller})

    } catch (error) {
        res.json({status:false,msg:error.message,error:error})
    }

}

const LoginUser=async(req,res)=>{
    try {
        const {email,password}=req.body
        const find = await Users.findOne({email})
        if(!find){
         return res.json({status:false,msg:"User doesn't exist"})
        }
        const check= await bcrypt.compare(password,find.password)
        if(!check){
            return res.json({status:false,msg:"Password doesn't matched"})
        }
        const token = jwt.sign({user:find,id:find._id},"process.env.JWT_SECRET",{expiresIn:'7d'})
        res.json({status:true,msg:"Login Successfull",token})
    } catch (error) {
        res.json({status:false,msg:error.message,error:error})

    }
}


const GetUser=async(req,res)=>{
    try {
        const sellers=await Users.findById(req.query.id)
        res.json({status:true,msg:sellers})
    } catch (error) {
        res.json({status:false,msg:error.message,error:error})

    }
}
const CreateReview=async(req,res)=>{
    try {
        const data={
            user:req.user,
            rating: req.body.rating,
            review:req.body.review
        }
        await Users.findByIdAndUpdate(req.id,{$push:{rating:data}})
     res.json({status:true})
    } catch (error) {
        res.json({status:false,msg:error.message,error:error})

    }
}
module.exports={CreateUser,LoginUser,GetUser,CreateReview}