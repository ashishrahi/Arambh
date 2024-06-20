const express = require('express')
const router = express.Router();
const createError = require('../utils/error')
const { createSubscription,getSubscriptions,} = require('../controller/Subscription.controller');


//Create a Subscription
router.post('/subscription', createSubscription);

//Get a Subscription

//Get all Subscription
router.get('/', getSubscriptions);

//Update a Subscription

//update Subscription status


//Delete a Subscription


module.exports = router;
