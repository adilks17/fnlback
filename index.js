const express=require("express")
const cors=require("cors")

const app=new express();

const multer=require('multer');
const storage= multer.memoryStorage();
const upload=multer({storage:storage});

const collegemodel=require('./model/Collegedetails');
const Professionalmodel =require('./model/Professional');
const Usermodel =require('./model/Userdetails');
const Hevemodel =require('./model/Heve')
const { request } = require("express");
const { response } = require("express");

const Loginmodel = require("./model/Loginmodel");

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());


app.get('/',(request,response)=>{
    response.send("hai")
})
app.get('/view',async(request,response)=>{
    var data=await collegemodel.find();
    console.log(data)
    response.send(data)
})
app.get("/viewProfessional", async (request, response) => {
    var data = await Professionalmodel.find();
    response.send(data);
});

    app.get("/viewUser", async (request, response) => {
        var data = await Usermodel.find();
        response.send(data);
    });

app.get('/viewheve',async(request,response)=>{ 
    var data = await Hevemodel.find();
    response.send(data)
});


// Assuming you have a route for fetching colleges
app.get('/selectcolleges', async (req, res) => {
    try {
      // Fetch colleges from MongoDB (replace CollegeModel with your actual MongoDB model)
      const colleges = await collegemodel.find({}, 'Name'); // 'name' is the field you want to display in the select box
      res.json(colleges);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// app.post('/new',(request,response)=>{
//     console.log(request.body)
//     new studentmodel(request.body).save();
//     response.send("records saved")

// })

app.post('/new',upload.single('image1'),async(request,response)=>{

    try{
        const{Cid,Name,University,Address,Phone,Email, AffiliationNumber}=request.body
        const newdata=new collegemodel({
            Cid,Name,University,Address,Phone,Email, AffiliationNumber,
            image1:{
                data:request.file.buffer,
                contentType:request.file.mimetype,
            }
        })
        await newdata.save();
        response.status(200).json({message:'Record saved'});
    }
    catch(error)
    {
        response.status(500).json({error:'Internal Server error'});
    }
})

// app.post("/newProfessional", (request, response) => {
//     console.log(request.body);
//     new Professionalmodel(request.body).save();
//     response.send("record saved");
//     });

    app.post('/newProfessional',upload.single('image1'),async(request,response)=>{

        try{
            const{Pid,Name,Workinfo,Experience,Contact,Email}=request.body
            const newdata=new Professionalmodel({
                Pid,Name,Workinfo,Experience,Contact,Email,
                image1:{
                    data:request.file.buffer,
                    contentType:request.file.mimetype,
                }
            })
            await newdata.save();
            response.status(200).json({message:'Record saved'});
        }
        catch(error)
        {
            response.status(500).json({error:'Internal Server error'});
        }
    })

    app.post('/newUser',upload.single('image1'),async(request,response)=>{

        try{
            const{Uid,Name,Phone,Email,Rollno,College,Address}=request.body
            const newdata=new Usermodel({
                Uid,Name,Phone,Email,Rollno,College,Address,
                image1:{
                    data:request.file.buffer,
                    contentType:request.file.mimetype,
                }
            })
            await newdata.save();
            response.status(200).json({message:'Record saved'});
        }
        catch(error)
        {
            response.status(500).json({error:'Internal Server error'});
        }
    })

// user heve post
 app.post('/newheve',(request,response)=>{
     console.log(request.body)
     new Hevemodel(request.body).save();
     response.send("records heve saved")

 }) 

 app.post('/Loginsearch',async(request,response)=>{
    const {username,password}=request.body;
    try{ const user=await Loginmodel.findOne({username,password});
    if(user)
    {response.json({success: true,message:'Login Successfully'});}
    else
    {response.json({success: false,message:'Invalid Username and email'});}
    }
    catch(error)
    {
    response.status(500).json({sucess: false,message:'Error'})
    }
    })
    
   
    
    


 

app.put('/edit/:id',async(request,response)=>{
    let id=request.params.id;
    await collegemodel.findByIdAndUpdate(id,request.body)
    response.send("Data updated");
})

app.put('/Heveedit/:id',async(request,response)=>{
    let id=request.params.id;
    await Hevemodel.findByIdAndUpdate(id,request.body)
    response.send("Data updated");
})

app.listen(3005,(request,response)=>{
    console.log("port is running 3005")
})