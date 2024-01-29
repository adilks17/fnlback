const { contentType } = require("express/lib/response");
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://adilksmdbatlas:adilks12312@cluster0.usodvjm.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{console.log("DB CONNECTED college")})
.catch(err=>console.log(err));

let sc=mongoose.Schema;
const Collegeschema=new sc({
        Cid:Number,
        Name:String,
        University:String,
        Address:String,
        Phone:Number,
        Email:String,
        AffiliationNumber:String,
        image1:{
            data:Buffer,
            contentType:String
        }
        
    });

var collegemodel=mongoose.model("Collegedetails",Collegeschema)
module.exports=collegemodel;

