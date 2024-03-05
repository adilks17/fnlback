const { contentType } = require("express/lib/response");
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://adilksmdbatlas:adilks12312@cluster0.usodvjm.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{console.log("DB CONNECTED Appointment")})
.catch(err=>console.log(err));

let sc=mongoose.Schema;
const Appointmentschema=new sc({
      
       Date:String,
       Time:String,
       InchargeId:Number,
       Incharge:String,
       Status:String,
       Helper:String,
       userId:String
        
    });

var Appointmentmodel=mongoose.model("Appointment",Appointmentschema)
module.exports=Appointmentmodel;