const { contentType } = require("express/lib/response");
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://adilksmdbatlas:adilks12312@cluster0.usodvjm.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{console.log("DB CONNECTED User")})
.catch(err=>console.log(err));

let sc=mongoose.Schema;
const Userschema=new sc({
        Uid:Number,
        Name:String,
        Phone:Number,
        Email:String,
        Rollno:String,
        College:String,
        Address:String,
        image1:{
            data:Buffer,
            contentType:String
        }
        
    });

var Usermodel=mongoose.model("User",Userschema)
module.exports=Usermodel;

