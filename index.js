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
const Moviemodel = require("./model/Movie");
const Bookmodel = require("./model/Book");
const Appointmentmodel = require("./model/Appointment");
const Messagemodel = require("./model/Message");

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
app.get('/viewAppointment',async(request,response)=>{ 
    var data = await Appointmentmodel.find();
    response.send(data)
});
app.get('/viewmovie',async(request,response)=>{ 
    var data = await Moviemodel.find();
    response.send(data)
});
app.get('/viewbook',async(request,response)=>{ 
    var data = await Bookmodel.find();
    response.send(data)
});
app.get('/prevmessages', async (req, res) => {
    try {
        const messages = await Messagemodel.find();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
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

app.post('/newProfessional', upload.single('image1'), async (request, response) => {
    try {
        const {
            Pid,
            Name,
            Workinfo,
            Experience,
            Qualification,
            Contact,
            Email,
            District,
            State,
            Rate,
            Linkedin,
            OfficeAddress,
            Address,
            Awards,
            Achievements,
            Facebook,
            Instagram,
            X,
            Rating
        } = request.body;

        const Professional = new Professionalmodel({
            Pid,
            Name,
            Workinfo,
            Experience,
            Qualification,
            Contact,
            Email,
            District,
            State,
            Rate,
            Linkedin,
            OfficeAddress,
            Address,
            Awards,
            Achievements,
            Facebook,
            Instagram,
            X,
            Rating,
            image1: {
                data: request.file.buffer,
                contentType: request.file.mimetype
            },
            workingHours: {
                monday: {
                    from: request.body['monday-from'],
                    to: request.body['monday-to'],
                    closed: request.body['monday-closed'] === 'true'
                },
                tuesday: {
                    from: request.body['tuesday-from'],
                    to: request.body['tuesday-to'],
                    closed: request.body['tuesday-closed'] === 'true'
                },
                wednesday: {
                    from: request.body['wednesday-from'],
                    to: request.body['wednesday-to'],
                    closed: request.body['wednesday-closed'] === 'true'
                },
                thursday: {
                    from: request.body['thursday-from'],
                    to: request.body['thursday-to'],
                    closed: request.body['thursday-closed'] === 'true'
                },
                friday: {
                    from: request.body['friday-from'],
                    to: request.body['friday-to'],
                    closed: request.body['friday-closed'] === 'true'
                },
                saturday: {
                    from: request.body['saturday-from'],
                    to: request.body['saturday-to'],
                    closed: request.body['saturday-closed'] === 'true'
                },
                sunday: {
                    from: request.body['sunday-from'],
                    to: request.body['sunday-to'],
                    closed: request.body['sunday-closed'] === 'true'
                }
            }
        });

        await Professional.save();
        response.status(200).json({ message: 'Record saved' });
    } catch (error) {
        response.status(500).json({ error: 'Internal Server error' });
        console.log(error);
    }
});


    app.post('/newUser',upload.single('image1'),async(request,response)=>{

        try{
            const{userId,Name,Phone,Email,Rollno,College,Address,Username,Password}=request.body
            const newdata=new Usermodel({
                userId,Name,Phone,Email,Rollno,College,Address,Username,Password,
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
    app.post('/newMovie',upload.single('image1'),async(request,response)=>{

        try{
            const{Uid,Name,Description,Link}=request.body
            const newdata=new Moviemodel({
                Uid,Name,Description,Link,
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

    app.post('/newbook',upload.single('image1'),async(request,response)=>{

        try{
            const{Uid,Name,Description,Link}=request.body
            const newdata=new Bookmodel({
                Uid,Name,Description,Link,
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

 app.post('/newAppointment',(request,response)=>{
    console.log(request.body)
    new Appointmentmodel(request.body).save();
    response.send("records Appointment saved")

}) 
app.post('/messages', (req, res) => {
    const { text,  receiver, timestamp, sender,sent,seen } = req.body;
    const message = new Messagemodel({ text, receiver, timestamp, sender,sent,seen });

    message.save()
    .then((savedMessage) => {
        res.status(201).json(savedMessage);
    })
    .catch((error) => {
        console.error('Error saving message:', error);
        res.status(500).json({ error: 'Failed to save message' });
    });
});

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
    
    app.post('/login', async (req, res) => {
        const { username, password } = req.body;
      
        try {
          const user = await Loginmodel.findOne({ username, password });
      
          if (user) {
            res.json({ success: true, userId: user.userId });
            
          } else {
            res.json({ success: false, message: 'Invalid username or password' });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
      });
   
    
    

      app.put('/editcollege/:id', upload.single('image1'), async (request, response) => {

        try {
            const id = request.params.id;
            const { Cid, Name, University,Address,Phone,Email, AffiliationNumber } = request.body;
            let result = null;
            if (request.file) {
                console.log("sdjfbjs")
                const updatedData = {
                    Cid,Name,University,Address,Phone,Email, AffiliationNumber,
                    image1:{
                        data:request.file.buffer,
                        contentType:request.file.mimetype,
                    }
                };
                result = await collegemodel.findByIdAndUpdate(id, updatedData);
            }
            else {
                const updatedData = {
                    Cid,Name,University,Address,Phone,Email, AffiliationNumber,
                   
                }
                result = await collegemodel.findByIdAndUpdate(id, updatedData);
            }
    
            if (!result) {
                return response.status(404).json({ message: 'Item not found' });
            }
    
            response.status(200).json({ message: 'Item updated successfully', data: result });
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    });
 




    app.put('/editprofessional/:id', upload.single('image1'), async (request, response) => {

        try {
            const id = request.params.id;
            const {Pid,Name,Workinfo,Experience,Contact,Email,District,State,Linkedin } = request.body;
            let result = null;
            if (request.file) {
                console.log("sdjfbjs")
                const updatedData = {
                    Pid,Name,Workinfo,Experience,Contact,Email,District,State,Linkedin,
                    image1:{
                        data:request.file.buffer,
                        contentType:request.file.mimetype,
                    }
                };
                result = await Professionalmodel.findByIdAndUpdate(id, updatedData);
            }
            else {
                const updatedData = {
                    Pid,Name,Workinfo,Experience,Contact,Email,District,State,Linkedin,
                   
                }
                result = await Professionalmodel.findByIdAndUpdate(id, updatedData);
            }
    
            if (!result) {
                return response.status(404).json({ message: 'Item not found' });
            }
    
            response.status(200).json({ message: 'Item updated successfully', data: result });
        } catch (error) {
            console.error(error);
            response.status(500).json({ error: 'Internal Server Error' });
        }
    });
 


app.put('/Heveedit/:id',async(request,response)=>{
    let id=request.params.id;
    await Hevemodel.findByIdAndUpdate(id,request.body)
    response.send("Data updated");
})
app.put('/Appointmentedit/:id',async(request,response)=>{
    let id=request.params.id;
    await Appointmentmodel.findByIdAndUpdate(id,request.body)
    response.send("Data updated");
})

// Backend route to update the 'seen' property of a message
app.put('/messages/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const updatedMessage = await Messagemodel.findByIdAndUpdate(id, { seen: true }, { new: true });
        response.json(updatedMessage);
    } catch (error) {
        console.error('Error updating message:', error);
        response.status(500).json({ error: 'Failed to update message' });
    }
});



// Delete appointment by ID
app.delete('/deleteAppointment/:id', (req, res) => {
    const id = req.params.id;
    Appointmentmodel.findByIdAndDelete(id)
        .then(result => {
            if (!result) {
                res.status(404).send('Appointment not found');
            } else {
                res.status(200).send('Appointment deleted');
            }
        })
        .catch(err => {
            res.status(500).send(err.message);
        });
});


app.listen(3005,(request,response)=>{
    console.log("port is running 3005")
})