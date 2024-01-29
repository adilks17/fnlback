const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://adilksmdbatlas:adilks12312@cluster0.usodvjm.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{console.log("DB Connected Log  ")})
.catch(err=>console.log(err));
const logschema=new mongoose.Schema({
username:String,
password:String,
}
);
var Loginmodel=mongoose.model("Log",logschema)
module.exports=Loginmodel
