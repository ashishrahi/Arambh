const express = require('express')
const router = express.Router();
const Subject = require('../models/Subject.model')
const createError = require('../utils/error')
const { createSubject,getSubject,getSubjects,updatedSubject,updatedSubjectStatus,deletedSubject,getSubjectwithSubcategory } = require('../controller/Subject.controller');


//Create a Subject
router.post('/', createSubject);

//Get a Subject
router.get('/:id',getSubject)

//Get all Subject
router.get('/', getSubjects);

//Update a Subject
router.put('/:id',updatedSubject)

//update subject status
router.patch('/:id/status',updatedSubjectStatus);

//subject with subject with subcategory

router.get('/:id/subjectwithsubcategory',getSubjectwithSubcategory)

//Delete a Subject

router.delete('/:id',deletedSubject)

module.exports = router;
