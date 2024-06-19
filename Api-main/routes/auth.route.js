const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin.model');
const {registerAdmin,loginAdmin,logoutAdmin}= require('../controller/Auth.controller')
    
//Register
router.post('/register',registerAdmin)

//Login
router.post('/login',loginAdmin)

//Logout
router.post('/logout',logoutAdmin)






module.exports = router;
