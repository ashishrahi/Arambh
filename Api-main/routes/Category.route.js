const express = require('express')
const Category  = require('../models/Category.model');
const router = express.Router();
const {createCategory,getCategory,getAllCategory,updatedCategory,updatedStatus,deletedCategory} = require('../controller/Category.controller')

//Create a Category
router.post('/',createCategory)

//Get a category
router.get('/:id',getCategory)

//Get all Categories
router.get('/',getAllCategory)

//Update a category
router.put('/:id',updatedCategory)

//Categoy status
router.patch('/:id/status',updatedStatus );

//Delete a Category
router.delete('/:id',deletedCategory)

module.exports = router;
