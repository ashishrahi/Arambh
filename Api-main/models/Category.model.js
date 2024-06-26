const {mongoose,Schema} = require('mongoose');
const categorySchema = new mongoose.Schema({
   
    categoryname:{
        type:String,
        unique:true,
    },
    categoryimage:{
        type:String,
    },
    
    status:{
        type:Boolean,
        default:'true'
        },
},
{timestamps:true}
);
const Category = mongoose.model('Category', categorySchema);

 module.exports = Category;
