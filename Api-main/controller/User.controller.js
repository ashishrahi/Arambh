const User = require('../models/User.model')
const jwt = require('jsonwebtoken');
const generatecode = require('../Utilities/GenerateCode')
const nodemailer = require('nodemailer');
const crypto = require('crypto')
const bcrypt = require('bcrypt')


//create a new User
const signupUser = async(req,res)=>{
    const{username,email,phone,password,country}=req.body.data;
    console.log(req.body);
    console.log(username)
    const hashedPassword = await bcrypt.hash(password,10);

    
    try { 
      const newUser = new User({
        username:username,
        email:email,
        phone:phone,
        password:hashedPassword,
        usercode:generatecode(5),
        country:country,
        refercode:generatecode(5),
       })
    const savednewUser = await newUser.save();
   res.status(200).json({status:true,savednewUser});
}catch(err) {
    res.status(500).json(err)
}}
//Login User
const loginUser = async(req,res)=>{
    const{username,password}= req.body;
          try {
            const user = await User.findOne({username: username})
            if (!user) {
              return res.status(404).send('User not found');
            }
            //compare hashed password
            const passwordValid = bcrypt.compareSync(password,user.password)
            if(!passwordValid) {
              return res.status(200).send('invalid password');
            }
            // token generation
              const tokenValue = jwt.sign({username:user.username},process.env.JWT_KEY,{expiresIn:'1h'});
              user.token = tokenValue;
              user.tokenExpiresAt = new Date(Date.now()+3600000) 
              await user.save();
    
            res.status(200).json({user:{
              userId:user.id,
              username:user.username,
              email:user.email,
              token:user.token,
              }})}
    
          catch (error) {
              console.error(error);
              res.status(500).send('Internal server error');
          }
          }

//Forget User Password

const forgetPassword = async (req, res) => {
    // Extract user email from request body
    const { email } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('User with given email does not exist');
        }

        // Generate a token and save it to the database
        const token = crypto.randomBytes(20).toString('hex');
        console.log(token);
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // SMTP settings using environment variables
        const transporter = nodemailer.createTransport({
          
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            to: user.email,
            from: 'ashishrahi05@gmail.com',
            subject: 'Password Reset',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n` +
                  `Please click on the following link, or paste this into your browser to complete the process:\n\n` +
                  `http://localhost:5176/resetpassword/${token}\n\n` +
                  `If you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };

        // Send the email
        transporter.sendMail(mailOptions, (err, res) => {
            if (err) {
                console.error('There was an error: ', err);
                return res.status(500).send('Error sending recovery email');
            } else {
                res.status(200).json('Recovery email sent');
            }
        });
    } catch (error) {
        console.error('Error processing request: ', error);
        res.status(500).send('Internal server error');
    }
};

    //Reset User Password
    const resetPassword = async (req, res) => {
    const { token } = req.params;
    console.log(token);
    const { password } = req.body;
    console.log(password);
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: {$gt: Date.now()}});
    if (!user) {
    return res.status(400).send('Password reset token is invalid or has expired.');
    }
    
    //hashed the password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password =  hashedPassword;
    user.resetPasswordToken =  undefined;
    user.resetPasswordExpires =  undefined;
    await user.save();

    res.status(200).json('Password updated');
    };



    //check User
    const checkUser = async(req,res)=>{
    const{phone}= req.body;
    try {
      const user = await User.findOne(req.body)
      if (!user) {
        return res.status(404).send({message:'User Details not found'});
      }
      if(user.phone!== phone) {
        return res.status(200).send({message:'invalid phone'});
      }
      res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({message:'Internal server error'});
    }
    }


//getUser
const profileUser = async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
        
    } catch (error) {
        res.status(500).json(error)
    }
}
//UserList
const getUsers = async(req,res)=>{
    try {
        const users = await User.find();
        res.status(200).json(users);
        
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateUser = async(req,res)=>{
    //request
    const {id} = req.params;
    //validatin    
    if(req.body.userId===req.params.id){
    
       if(req.body.password)
       {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        req.body.password = hashedPassword;
    }
    try {
           const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
    //response
           res.status(200).json(updatedUser); 
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
        res.status(401).json('You can update only you account')
    }
    }

const deletedUser = async(req,res)=>{
    //request
    const{userId} = req.params
    
    //validation
        if(req.body.user_id===userId)
        {
          
        try{
          const user = await User.findById(userId);
        
            try {
               await User.findByIdAndDelete(req.params.id);
    //response
    
               res.status(200).json("User has been deleted...."); 
            } 
            catch (error) {
                res.status(500).json(error)
            }}
            
            catch(error){
                res.status(404).json('User not found')
            }
        }
        else{
            res.status(401).json('You can delete only you account')
        }
        }

module.exports = {loginUser,profileUser,getUsers,updateUser,deletedUser,signupUser,forgetPassword,resetPassword,checkUser};
