const {mongoose} = require('mongoose');

 const QuizSchema = new mongoose.Schema({
  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category',
  },
  categoryId:{
    type:String,
  },
  subcategory:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Subcategory',
  },
  subcategoryId:{
    type:String,
  },
  subject:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Subject',
  },
  subjectId:{
    type:String,
  },
    questionText: 
    {
        type: String,
        required: true
    },
    
    options:{ 
    type:[String]
    },

    explanation: 
    {
        type: String
    },
    correctAnswer: {
        type: String,
        required: true
    },
    },
    {timestamps:true})





const Quiz = mongoose.model('Quiz', QuizSchema);
 module.exports = Quiz;
