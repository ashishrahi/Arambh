const express = require('express')
const router = express.Router();
const User = require('../models/User.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const{getUser,getUsers,updateUser,deletedUser,createUser,forgetPassword,resetPassword,checkUser} = require('../controller/User.controller')

//Create a new User
router.post('',createUser)

//Get a User
router.get('/:id',getUser)

//Get Users
router.get('/',getUsers)

//Update a User
router.put('/:id',updateUser)

//Delete a User
router.delete('/:id',deletedUser)

//Forget Password User
router.post('/forgetpassword',forgetPassword)

//Reset Password User
router.post('/resetpassword/:token',resetPassword)

//check User
router.post('/checkuser',checkUser)

module.exports = router;
