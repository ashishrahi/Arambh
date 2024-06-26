const express = require('express')
const router = express.Router();
const Subcategory = require('../models/Subcategory.model')
const Category = require('../models/Category.model')
const createError = require('../utils/error')
const {createSubcategory,getSubcategory,getSubcategorires,updatedsubCategory,updatedsubCategoryStatus,deletedSubcategory} = require('../controller/Subcategory.controller')
const upload = require('../middleware/multer.middleware.js')
//Create a Subcategory
router.post('/',upload.single('file') ,createSubcategory);

//Get a Subcategory
router.get('/:id',getSubcategory)

//Get all Subcategories
router.get('/', getSubcategorires);

//Update a Subcategory
router.put('/:id',updatedsubCategory)

//Delete a Subcategory
router.delete('/',deletedSubcategory)

//update a SubcategoryStatus
router.patch('/:id/status', updatedsubCategoryStatus)





//Delete a subcategory
router.delete('/:id',async(req,res)=>{
const {id} = req.params.id
try {
    const deletedSubcategory = await Subcategory.findByIdAndDelete(req.params.id);
    res.status(200).json('Subcategory has been deleted....'); 
} catch (error) {
    res.status(500).json(err);
}})
module.exports = router;
