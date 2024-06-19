const Category = require('../models/Category.model')
const Subcategory = require('../models/Subcategory.model')
const Subject = require('../models/Subject.model')


//createSubject
const createSubject = async (req, res) => {
    const {subcategoryname, categoryname,subjectname}=req.body;
    try {
      const searchcategory = await Category.findOne({categoryname});
      const searchsubcategory = await Subcategory.findOne({ subcategoryname });
       if (!searchcategory) {
        return res.status(404).json({
          message: 'Category not found',
        });}
      if (!searchsubcategory) {
        return res.status(404).json({
          message: 'Sub Category not found',
        });
      }
        const existingSubject = await Subject.findOne({
        subcategoryname: subcategoryname,
        categoryId: searchcategory._id,
        subcategoryId:searchsubcategory._id
      });
  
      if (existingSubject) {
        return res.status(400).json({
          message: 'Subject already exists for this Group',
        });}
  
      const newSubject = new Subject({
        category: searchcategory._id,
        subcategory:searchsubcategory._id,
        subjectname:subjectname,
      });
      const savedSubject = await newSubject.save();
      
      res.status(201).json({
        message: 'Subject created successfully',
        data: savedSubject
      });
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error: error.message
      });}}

  //get Subject
const getSubject =  async(req,res)=>{
    const {id} = req.params;
try {
       const subject = await Subject.findById(req.params.id);
       res.status(200).json(subject); 
     } catch (error) {
       res.status(500).json(error)
    }}

//get all subjects
const getSubjects = async (req, res) => {
    try {
      const subjects = await Subject.find().populate('subcategory').populate('category');
      const subjectwithsubcategories = subjects.map(subject => ({
        _id: subject._id,
        categoryname: subject.category.categoryname ? subject.category.categoryname : null,
        subcategoryname: subject.subcategory.subcategoryname,
        subjectname: subject.subjectname,
        status: subject.status,
      }));
      res.status(200).json(subjectwithsubcategories);
    } catch (error) {
      res.status(500).json({
        message: 'Server error',
        error: error.message
      });
    }
  }

  //update a subject
  const updatedSubject = async(req,res)=>{
    const {id}= req.params;
    const {subjectname}= req.body;
    try {
    const updateSubject = await Subject.findByIdAndUpdate(id,{$set:{subjectname}},{new:true})
    res.status(200).json(updateSubject);
    } catch (error) {
      res.status(404).send(error);
    }}

    //updated Subject Status
    const updatedSubjectStatus = async (req, res) => {
        try {
          // Find the subject by id and populate the category information
          const subject = await Subject.findById(req.params.id).populate('category').populate('subcategory');
          // Check if subject exists
          if (!subject) {
            return res.status(404).send({ message: 'Subject not found' });
          }
          const subcategory = await Subcategory.findById(subject.subcategory.subcategory._id)
          subject.status = !subject.status;
          await subject.save();
          const category = await Category.findById(subject.category.category._id)
          const response = {
            _id: subject._id,
            subcategoryname: subcategory.subcategoryname,
            status: subject.status,
            categoryname: category.categoryname,
            subjectname:subject.subjectname,
          };
      
          // Send the response
          res.json(response);
        } catch (error) {
          res.status(500).send({ message: 'Error updating subcategory status' });
        }
      }

      //delete Subject
       const deletedSubject = async(req,res)=>{
        const {id} = req.params;
         try {
                       
            const deletedSubject = await Subject.findByIdAndDelete(req.params.id);
            res.status(200).json('Subject has been deleted....');  
        } 
        catch (error) 
        {res.status(500).json(error);}} 


     const getSubjectwithSubcategory = async(req,res)=>{

      try {
        const subjects = await Subject.find().populate('subcategory').populate('category');
console.log(subjects);

const groupedData = subjects.reduce((acc, subject) => {
    const subcategoryName = subject.subcategory.subcategoryname;
    if (!acc[subcategoryName]) {
        acc[subcategoryName] = {
            subcategoryId:subject.subcategory._id,
            subcategoryname: subcategoryName,
            subjectnames: [],
        };
    }
    acc[subcategoryName].subjectnames.push(subject.subjectname);
    return acc;
}, {});

// Transform the dictionary into the desired output format
const subjectwithsubcategories = Object.values(groupedData);

res.status(200).json(subjectwithsubcategories);
      } catch (error) {
        res.status(500).json({
          message: 'Server error',
          error: error.message
        });
      }
    
    }



        module.exports = {getSubjectwithSubcategory,createSubject,getSubject,getSubjects,updatedSubject,updatedSubjectStatus,deletedSubject};