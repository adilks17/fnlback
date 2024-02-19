const { contentType } = require("express/lib/response");
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://adilksmdbatlas:adilks12312@cluster0.usodvjm.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{console.log("DB CONNECTED Movies")})
.catch(err=>console.log(err));

let sc=mongoose.Schema;
const Movieschema=new sc({
        Uid:Number,
        Name:String,
        Description:String,
        Link:String,
        image1:{
            data:Buffer,
            contentType:String
        }
        
    });

var Moviemodel=mongoose.model("Movie",Movieschema)
module.exports=Moviemodel;

