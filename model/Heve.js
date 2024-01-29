const { contentType } = require("express/lib/response");
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://adilksmdbatlas:adilks12312@cluster0.usodvjm.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{console.log("DB CONNECTED heve")})
.catch(err=>console.log(err));

let sc=mongoose.Schema;
const Heveschema=new sc({
      
        Leve:String,
        Response:String
    });

var Hevemodel=mongoose.model("Heve",Heveschema)
module.exports=Hevemodel;

