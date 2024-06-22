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
          adminId:admin.id,
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