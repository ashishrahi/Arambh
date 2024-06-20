const Subscription = require('../models/Subscription.model')

//create a new Subscription
 const createSubscription = async(req,res)=>{
    const{subscriptionname,userId,subcategoryId,categoryId,}=req.body;
    try {
        const newSubscription = new Subscription({
            subscriptionname:subscriptionname,
            userId:userId,
            cateogoryId:categoryId,
            subcategoryId:subcategoryId,
            status:req.body.status,
        })
        const savednewSubscription = await newSubscription.save();
        res.status(200).json({status:true,savednewSubscription});
    }
    catch (error) {
        res.status(500).json({status:false,error:error.message});
    }}
 //get All Subscription
 const getSubscriptions = async(req,res)=>{
    try {
        const allSubscription = await Subscription.find()
            res.status(200).json({status:true,allSubscription});
    }
    catch (error) {
        res.status(500).json({status:false,error:error.message});
    }}

    module.exports = {createSubscription,getSubscriptions};






