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
        Qualification:String,
        Contact:Number,
        Email:String,
        District:String,
        State:String,
        Rate:String,
        OfficeAddress: String,
        Address: String,
        Awards: String,
        Achievements: String,
        Facebook: String,
         Instagram: String,
         X: String,
        Linkedin:String,
        Rating: String,
        image1:{
            data:Buffer,
            contentType:String
        },
        workingHours: {
          monday: { from: String, to: String, closed: Boolean },
          tuesday: { from: String, to: String, closed: Boolean },
          wednesday: { from: String, to: String, closed: Boolean },
          thursday: { from: String, to: String, closed: Boolean },
          friday: { from: String, to: String, closed: Boolean },
          saturday: { from: String, to: String, closed: Boolean },
          sunday: { from: String, to: String, closed: Boolean },
        }
        
    });

var Professionalmodel=mongoose.model("Professional",Professionalschema)
module.exports=Professionalmodel;

