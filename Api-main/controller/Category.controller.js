const Category = require('../models/Category.model')
const path = require('path')
const cloudinary = require('cloudinary').v2;
const upload = require('../middleware/multer.middleware')
const uploadOnCloudinary = require('../Utilities/cloudinary')

cloudinary.config({ 
  cloud_name: "drylsvqmx", 
  api_key: "217511642449191", 
  api_secret: "Wwg-mZiQBph7frpZeesm6kZqMZg"
  });

//create a new category
  const createCategory = async(req,res)=>{
  const {categoryname}= req.body;
 
  //uploadImage
  const result =  await cloudinary.uploader.upload(req.file.path);  
 
  //field validation  

  // category exists
  const existingCategory = await Category.findOne({categoryname});
  if (existingCategory) {
    return res.status(400).json({
      message: 'Category already exists',
    });
  }
    try {
        const newCategory = new Category({
        categoryname:JSON.parse(categoryname),
        categoryimage:result.url,
       })
    const savednewCategory = await newCategory.save();
   res.status(200).json({status:true,savednewCategory});
}
catch (error) {
   res.status(500).json(error)
}
}

//Get a category
const getCategory =async(req,res)=>{
    const {id} = req.params;
    
    //field validation
    if (!id) {
        return res.status(400).json({ message: 'Category id is required' });
      }
    try {
            const aCategory = await Category.findById(req.params.id);
            res.status(200).json(aCategory);
        }
    catch (error) {
            res.status(500).json(error)
        }}

//get All Category
const getAllCategory = async(req,res)=>{
  try {
        const Categories = await Category.find({});
        res.status(200).json(Categories);
        } 
        catch (error) {
                res.status(500).json(error)}
            }
// Update categories
         const updatedCategory=async(req,res)=>{
                const {id} = req.params;
                const {categoryname} = req.body;
                console.log(id)
                if (categoryname === undefined) {
                    return res.status(400).json({message: 'categoryname is required'});}
                try {
                    const updatedCategory = await Category.findByIdAndUpdate(id,{$set:{categoryname}},{new:true})
                    res.status(200).json(updatedCategory)
                } catch (error) {
                    res.status(500).json({ message: 'Error updating category' });
               }}
//updateStatus
           const updatedStatus = async (req, res) => {
                try {
                  const category = await Category.findByIdAndUpdate(req.params.id);
                  if (!category) {
                    return res.status(404).send({ message: 'Category not found' });
                  }
                 category.status = !category.status;
                  await category.save();
              
                  res.send(category);
                } catch (error) {
                  res.status(500).send({ message: 'Error updating category status' });
                }
              }
    //Delete category

    const deleteCategoryWithChildren = async (categoryId) => {
      // Find all children of the category
      const children = await Category.find({ parent_id: categoryId });
    
      // Recursively delete each child
      for (const child of children) {
        await deleteCategoryWithChildren(child._id);
      }
    
      // Delete the category itself
      await Category.findByIdAndDelete(categoryId);
    };

    const deletedCategory  = async(req,res)=>{
                const {id} = req.params.id;
                 try {
                  await deleteCategoryWithChildren(id);
                    res.status(200).json("Category has been deleted");
                    } 
                catch (error) {
                res.status(500).json(error) }}

module.exports = {createCategory,getCategory,getAllCategory,updatedCategory,updatedStatus,deletedCategory}