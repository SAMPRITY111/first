const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const server = express();

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/employee');
}

const empSchema = new mongoose.Schema({
  name: String,
  phone:Number,
  email:String,
  pass:String 
});
server.use(cors());
server.use(bodyParser.json());

const Emp = mongoose.model('employee', empSchema);
server.post("/create", async(req,res)=>{
    let emp = new Emp;
    emp.name = req.body.name;
    emp.phone = req.body.phone;
    emp.email = req.body.email;
    emp.pass = req.body.pass;
    const doc = await emp.save();
    console.log(doc);
    res.json(doc);
})
server.get("/read", async(req,res)=>{
    const docs = await Emp.find({});
    res.json(docs);

})
server.put("/update/:_id", async(req,res)=>{
    const data = await Emp.updateOne(
        { _id: req.params},
        {$set: { name:req.body.name, phone:req.body.phone, email:req.body.email,pass:req.body.pass}}
        )
        res.json(data);
    // res.send(req.params);
})
server.get("/find/:_id", async(req,res)=>{
    const docs = await Emp.findOne({_id:req.params});
    res.json(docs);

})

server.listen(8000, ()=>{
    console.log("server has been started successfully")
})