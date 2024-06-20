const {mongoose} = require('mongoose');
const Subcategory = require('./Subcategory.model');

 const subscriptionSchema = new mongoose.Schema({
  
   subscriptionname:{
    type:String,
   },
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
   },
   cateogory:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category',
   },
   subcategory:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Subcategory',
   },
   
   },
    {timestamps:true})





const Subscription = mongoose.model('Subscription', subscriptionSchema);
 module.exports = Subscription;
