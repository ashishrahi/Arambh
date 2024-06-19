 const {mongoose,Schema} = require('mongoose');

 const subcategorySchema = new mongoose.Schema({
 
 category:{
  type:mongoose.Schema.Types.ObjectId,
  ref:'Category',
},
 cateogoryId:{
 type:String,
 },
         
 subcategoryname:{
 type:String,
  },
  status:{
  type:Boolean,
  default:'true',
    }
},
{timestamps:true}
)
 const Subcategory = mongoose.model('Subcategory', subcategorySchema);
 module.exports = Subcategory;
