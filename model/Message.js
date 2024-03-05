const { contentType } = require("express/lib/response");
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://adilksmdbatlas:adilks12312@cluster0.usodvjm.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{console.log("DB CONNECTED message")})
.catch(err=>console.log(err));

let sc=mongoose.Schema;
const Messageschema=new sc({
      
    text: String,
    receiver: String,
    timestamp: String,
    sender: String,
    sent: Boolean,
    seen: Boolean,
        
    });

var Messagemodel=mongoose.model("Message",Messageschema)
module.exports=Messagemodel;

