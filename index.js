const express = require("express");
const app = express();
const port = 80;
const path= require("path");
const fs=require("fs");
const bodyparser=require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ServiceRequest', {useNewUrlParser:true});

// Mongoose Schema 
const serviceSchema = new mongoose.Schema({
    name: String,
    date: String,
    phonenumber: String,
    email: String,
    city: String,
    pincode: String,
    state: String,
    country: String
  });
const service = mongoose.model('service', serviceSchema);


app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, '/main.html'));
})
app.get("/customerservice",(req,res)=>{
    res.sendFile(path.join(__dirname,'/service.html'));
})

app.post("/customerservice",(req, res)=>{
        var myData = new service(req.body);
        myData.save().then(() => {
            res.send("This item has been save in the database");
        }).catch(() => {
            res.status(400).send("ERROR and the item has not been send to the database");
        });
    })

app.listen(port, ()=>{
    console.log(`The page has started successfully at Port ${port}`)
})