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
   userId:{
    type:String,
   },
   category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category',
   },
   cateogoryId:{
   type:String,
   },
   subcategory:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Subcategory',
   },
   subcategoryId:{
    type:String,
   },
   status:{
    type:Boolean,
    default:'true',
   }
   
   },
    {timestamps:true})





const Subscription = mongoose.model('Subscription', subscriptionSchema);
 module.exports = Subscription;
