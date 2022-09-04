const Services=require("../models/Services")

const Users=require("../models/Users")

const CreateServiceCtrl=async(req,res)=>{

    try {
        const {title,description,price}=req.body

        if(!title || !description || !price){
            return res.json({status:false,msg:"Invalid Creadentials"})
        }

        const {category,zipcode} = req.user.user
        const service= await Services.create({
            title,
            description,
            price,
            category,
            zipcode,
            seller:req.id,
            image:req.file.path
        })
        
       const seller= await Users.findByIdAndUpdate(req.id,{$push:{services:service.id}})
        res.json({status:true,msg:"Service created successfully",seller,service})

    } catch (error) {
        res.json({status:false,error})
    }
}


const GetServicesCtrl=async(req,res)=>{
    try {
        const {category,zipcode,search}=req.query
        if(search){
            const posts=await Services.find({ title: { $regex: search, $options: "i" } } ).populate("seller")
            return res.json({status:true,msg:posts})
        }
        if(category && zipcode ){

            const services=await Services.find({category,zipcode}).populate("seller")
            return res.json({status:true,msg:services})
        }
        const services=await Services.find({}).populate("seller")
         res.json({status:true,msg:services})

    } catch (error) {
        res.json({status:false,error})
    }
}

const GetServiceCtrl=async(req,res)=>{
    try {
        const {id}=req.query
        const service=await Services.findById(id).populate("seller")
        res.json({status:true,msg:service})

    } catch (error) {
        res.json({status:true,error})
    }
}

module.exports={CreateServiceCtrl,GetServicesCtrl,GetServiceCtrl}