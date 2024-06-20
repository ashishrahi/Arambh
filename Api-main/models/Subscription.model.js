const {mongoose} = require('mongoose');
const Subcategory = require('./Subcategory.model');

 const subscriptionSchema = new mongoose.Schema({
  
   subscriptionname:{
    type:String,
   },
   userId:{
    type:String,
   },
   cateogoryId:{
   type:String,
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
