const express = require('express');
const path = require('path');
const app = express();
require("./db/conn");
const Register = require("./models/registers");
const { Collection } = require('mongoose');
const port = process.env.PORT || 7000;
const static_path = path.join(__dirname,"../public");
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.set("view engine","hbs");
app.get("/",(req,res)=>{
    res.render("index");
});
app.get("/login",(req,res)=>{
    res.render("login");
});
app.get("/register",(req,res)=>{
    res.render("register");
});
app.post("/register",async (req,res)=>{
    try {
        const password = req.body.password;
        const cpassword = req.body.confirm;
        if(password === cpassword){
             const registerEmployee = new Register({
                firstname :req.body.firstname,
                lastname :req.body.lastname,
                email :req.body.email,
                phone :req.body.phone,
                password: req.body.password,
                confirm:req.body.confirm
             })
             //saving data into database
             const registered = await registerEmployee.save();
             res.status(201).render("index");
        }else{
            res.send("Paswords are not matching");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});
app.listen(port,()=>{
    console.log("the website is working at ${port}");
})