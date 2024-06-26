const {mongoose,Schema} = require('mongoose');
const subjectSchema = new mongoose.Schema({
    

category:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Category',},

categoryId:{
   type:String, 
},   

subcategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Subcategory',
    },

subcategoryId:{
type:String,
},

subjectname:{
    type:String,
    required:true,
    },

status:{
        type:Boolean,
        debugger:true,
        
    },
},

{timestamps:true}
);

const Subject = mongoose.model('Subject', subjectSchema);

 module.exports = Subject;
