const {mongoose} = require('mongoose');

 const UserSchema = new mongoose.Schema({
  
    username:{
        type:String,
    },

    avatar:{
     type:String,
    },

    email:{
        type:String,
    },

    password:{
      type:String,
    },

    phone:{
    type:String,
    },

    resetPasswordToken:{
        type:String,
    },
    resetPasswordExpires:Date,

    tokenExpiresAt:{
        type:Date,
    },

     usercode:{
     type:String,
     unique:true
     },
    token:{
    type:String,
    },
    wallet:{
    type:String,
    },},
    {timestamps:true})





const User = mongoose.model('User', UserSchema);
 module.exports = User;
