const {mongoose} = require('mongoose');

 const adminSchema = new mongoose.Schema({
  
    username:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
      type:String,
    },
    token:{
        type:String,
    },
    tokenExpiresAt:{
        type:Date,
    }
    
},
    {timestamps:true})





const Admin = mongoose.model('admin', adminSchema);
 module.exports = Admin;
