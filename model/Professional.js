const { contentType } = require("express/lib/response");
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://adilksmdbatlas:adilks12312@cluster0.usodvjm.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{console.log("DB CONNECTED pro")})
.catch(err=>console.log(err));

let sc=mongoose.Schema;
const Professionalschema=new sc({
        Pid:Number,
        Name:String,
        Workinfo:String,
        Experience:String,
        Contact:Number,
        Email:String,
        image1:{
            data:Buffer,
            contentType:String
        }
        
    });

var Professionalmodel=mongoose.model("Professional",Professionalschema)
module.exports=Professionalmodel;

