const Subcategory = require('../models/Subcategory.model')
const Category = require('../models/Category.model')


//create a new Subcategory
const createSubcategory = async (req, res) => {
    const { subcategoryname, categoryname } = req.body;
    try {
      const searchcategory = await Category.findOne({ categoryname });
      console.log(searchcategory)
      if (!searchcategory) {
        return res.status(404).json({
          message: 'Category not found',
        });
      }
     const existingSubcategory = await Subcategory.findOne({
        subcategoryname: subcategoryname,
        category: searchcategory._id
      });
  
      if (existingSubcategory) {
        return res.status(400).json({
          message: 'Subcategory already exists for this category',
        });
      }
  
      // Create a new subcategory and associate it with the found category
      const newSubcategory = new Subcategory({
        subcategoryname: subcategoryname,
        category: searchcategory._id
      });
  
      // Save the new subcategory
      const savedSubcategory = await newSubcategory.save();
      
      res.status(201).json({
        message: 'Subcategory created successfully',
        data: savedSubcategory
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error: error.message
      });
    }
  }
//get Subcategory
 const getSubcategory = async(req,res)=>{
    const {id} = req.params.id;
    try {
    const result = await Subcategory.aggregate([
    {$lookup: {
            from: 'categories',
            localField: 'categoryname',
            foreignField: '_id',
            as: 'categoryDetails'}},
    {$unwind: '$categoryDetails'},
    {$addField:{
          categoryname:'$categoryDetails.categoryname',
          subcategoryname:'$subcategoryname',
    }}])
    } catch (error) 
   {res.status(500).json(error)}}


//getAllSubcategory
const getSubcategorires = async (req, res) => {
    try {
         const subcategories = await Subcategory.find().populate('category');
         console.log(subcategories)
         const subcategoriesWithcategories = subcategories.map(subcategory => ({
        _id: subcategory._id,
         subcategoryname : subcategory.subcategoryname,
         categoryname:subcategory.category.categoryname,
         status:subcategory.status,
    }));
         res.status(200).json( subcategoriesWithcategories
      );}  
    catch (error) {
       res.status(500).json({
       message: 'Server error',
       error: error.message
      }); }}

  //getUpdatedsubCategory
  const updatedsubCategory = async(req,res)=>{
    const {id} = req.params;
    const {subcategoryname} = req.body;
    console.log(subcategoryname)
    console.log(id)

    if (subcategoryname === undefined) {
        return res.status(400).json({message: 'subcategoryname is required'});
    }
   try {
        const updatedsubCategory = await Subcategory.findByIdAndUpdate(id,{$set:{subcategoryname}},{new:true})
        console.log(updatedsubCategory)
        res.status(200).json(updatedsubCategory)
    }   catch (error) {
        res.status(500).json({ message: 'Error updated Sub Category' });
   
    }}

    //getUpdatedsubCategoryStatus
    const updatedsubCategoryStatus = async (req, res) => {
        try {
          const subcategory = await Subcategory.findById(req.params.id).populate('category');
          console.log(subcategory)
          if (!subcategory) {
            return res.status(404).send({ message: 'Subcategory not found' });
          }subcategory.status = !subcategory.status;
          await subcategory.save();
          const category = await Category.findById(subcategory.categoryId)
          const response = {
            _id: subcategory._id,
            subcategoryname: subcategory.subcategoryname,
            status: subcategory.status,
            categoryname: subcategory.category.categoryname,
          };
          res.json(response);
        } catch (error) {
          res.status(500).send({ message: 'Error updating subcategory status' });
        }
      }

     const deletedSubcategory = async(req,res)=>{
       const id = req.params.id;
       try {
        const deleteSubcategory = await Subcategory.findByIdAndDelete(req.params.id);
        res.status(200).json('Subcategory has been deleted....');
     }
     catch (error) {
        res.status(500).json(err);
     }}





      module.exports = {createSubcategory,getSubcategory,getSubcategorires,updatedsubCategory,updatedsubCategoryStatus,deletedSubcategory}

