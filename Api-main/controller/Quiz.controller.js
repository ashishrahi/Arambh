const Quiz = require('../models/Quiz.model')
// Create Quiz
exports.createQuiz = async(req,res)=>{
  const {questionText,explanation,correctAnswer}= req.body;
  try {
    const newQuiz = new Quiz(req.body)
    const savedQuiz = await newQuiz.save()
    res.status(200).json({status:true,savedQuiz})
  } catch (error) {
    res.status(500).json({status:false,error:error.message})
    }}

// Get all Quizes
exports.getQuizes = async(req,res)=>{
    try {
      const allQuizes = await Quiz.find()
      res.status(200).json({status:true,allQuizes})
    } catch (error) {
      res.status(500).json({status:false,error:error.message})
    }}
