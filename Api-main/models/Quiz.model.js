const {mongoose} = require('mongoose');

 const QuizSchema = new mongoose.Schema({
  
    questionText: 
    {
        type: String,
        required: true
    },
    options: [optionSchema],

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
