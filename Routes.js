const express = require("express");
const { CreateUser ,LoginUser, GetUser} = require("./controllers/UsersCtrl");
const {CreateServiceCtrl,GetServicesCtrl,GetServiceCtrl} = require("./controllers/ServicesCtrl");
const AuthenticateUser = require("./middlewares/AuthenticateUser");
const Upload = require("./middlewares/Upload");

const Router= express.Router()

Router.get('/sellerauth',AuthenticateUser,(req,res)=>{
    res.send(req.user)
})

Router.get('/buyerauth',AuthenticateUser,(req,res)=>{
    res.send(req.user)
})

Router.post('/createservice',AuthenticateUser,Upload.single("image"),CreateServiceCtrl)
Router.get('/services',GetServicesCtrl)
Router.get('/seller',GetUser)

Router.get('/service',GetServiceCtrl)



Router.post('/createuser',CreateUser)
Router.post('/loginuser',LoginUser)

module.exports=Router