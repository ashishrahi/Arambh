const Admin = require('../models/Admin.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generatecode = require('../Utilities/GenerateCode')
const nodemailer = require('nodemailer');
const crypto = require('crypto')

//Register Admin

const registerAdmin = async(req,res)=>{
    const{username,email,password}=req.body;
    console.log(req.body);

    //feild validation
    if (![username, email, password].every(field => field)) {
      return res.status(400).json({
        message: 'Please fill all the fields'
      });
    }

    //email validation
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Please enter a valid email'
      });
    }

    //password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message: 'Please enter a valid password'
      });
    }

    //check if admin exists
    const existingAdmin = await Admin.findOne({email:email});
    if (existingAdmin) {
      return res.status(400).json({
        message: 'Admin already exists'
      });
    }
    
    //hashed Password
    const hashedPassword = await bcrypt.hash(password,10);
    console.log(hashedPassword);
    try { 
      const newAdmin = new Admin({
        username:username,
        email:email,
        password:hashedPassword,
      });
      const admin = await newAdmin.save();
      res.status(200).json(admin);
      } catch (error) {
      res.status(500).json(error)
      }}

//Login Admin
const loginAdmin = async(req,res)=>{
const{username,password}= req.body;

// login credentials
if (![username, email, password].every(field => field)) {
  return res.status(400).json({
    message: 'Please fill all the fields'
  });
}
      try {
        const admin = await Admin.findOne({username: username})
        if (!admin) {
          return res.status(404).send('Admin not found');
        }
        //compare hashed password
        const passwordValid = bcrypt.compareSync(password,admin.password)
        if(!passwordValid) {
          return res.status(200).send('invalid password');
        }
        // token generation
          const tokenValue = jwt.sign({username:admin.username},process.env.JWT_KEY,{expiresIn:'1h'});
          admin.token = tokenValue;
          admin.tokenExpiresAt = new Date(Date.now()+3600000) 
          await admin.save();

        res.status(200).json({admin:{
          username:admin.username,
          email:admin.email,
          token:admin.token,
          }})}

      catch (error) {
          console.error(error);
          res.status(500).send('Internal server error');
      }
      }

      //Logout the Admin

        const logoutAdmin = async(req,res)=>{
        const{token}= req.body;
        //token
        if (!token) {
          return res.status(400).json({
            message: 'Please provide a token'
          });
        }
        try {
          const admin = await Admin.findOne(req.body)
          console.log(admin);
          if (!admin) {
            return res.status(404).send('Admin not found');
          }
          if(admin.token!== token) {
            return res.status(200).send('invalid token');
          }
          res.status(200).send('logoutSuccess');
        }
        catch (error) {
            console.error(error);
            res.status(500).send('Internal server error');
        }
      }

    
    
     
      module.exports = {registerAdmin,loginAdmin,logoutAdmin};