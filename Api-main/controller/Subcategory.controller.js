const Subcategory = require('../models/Subcategory.model')
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

//create a new Subcategory
const createSubcategory = async (req, res) => {
    const {subcategoryname,categoryname}= req.body;
    const{file}= req.body

    //for finding categoryId
   const categoryDetails = await Category.findOne({
    categoryname:categoryname
   })
       //for categoryImage
       const result =  await cloudinary.uploader.upload(req.file.path);  

   try {
    const newSubcategory = await Subcategory({
      subcategoryname:subcategoryname,

      cateogoryId:categoryDetails._id,
      status:true,
      subcategoryimage:result.url,
    })
    const savednewSubcategory = await newSubcategory.save();
    res.status(200).json(savednewSubcategory);
   } catch (error) {
    res.status(500).json({status:false,error:error.message});
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
         const subcategories  = await Subcategory.find({}).populate('category')

    //      const subcategoriesWithcategories = subcategories.map(subcategory => ({
    //     _id: subcategory._id,
    //      subcategoryname : subcategory.subcategoryname,
    //      categoryname:subcategory.categoryname,
    //      subcategoryimage:subcategory.subcategoryimage,
    //      status:subcategory.status,
    // }));
         res.status(200).json( subcategories);}  
    catch (error) {
       res.status(500).json({message: 'Server error',error: error.message}); }}

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

