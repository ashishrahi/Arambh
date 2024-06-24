const {mongoose} = require('mongoose');

 const QuizSchema = new mongoose.Schema({
  
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
