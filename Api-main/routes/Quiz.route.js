const express = require('express')
const Quiz  = require('../models/Quiz.model');
const router = express.Router();
const {createQuiz,getQuizes} = require('../controller/Quiz.controller')

//Create a Quiz
router.post('/',createQuiz)

//Get all Quizes
router.get('/',getQuizes)

//Get a Quiz

//Update a category

//Categoy status

//Delete a Category

module.exports = router;
