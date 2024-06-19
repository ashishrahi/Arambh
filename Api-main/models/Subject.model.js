const {mongoose,Schema} = require('mongoose');
const subjectSchema = new mongoose.Schema({


categoryId:{
   type:String, 
},   
category:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'Category',
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
