const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth.route')
const usersRoute = require('./routes/users.route')
const CategoryRoute = require('./routes/Category.route')
const SubcategoryRoute = require('./routes/Subcategory.route')
const SubjectRoute = require('./routes/Subject.route')
const SubscriptionRoute = require('./routes/subscription.route')
const QuizRoute = require('./routes/Quiz.route')
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const multer = require('multer')
const app = express();
var cors = require('cors') 
const path = require('path');
require('dotenv').config();
const upload = multer({ dest: 'uploads/' });

//database connection settings
mongoose.connect('mongodb://127.0.0.1:27017/Aarambh');

//middleware utilities
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


 

//middleware of routes

app.use('/api/auth',authRoute);
app.use('/api/users',usersRoute);
app.use('/api/category',CategoryRoute);
app.use('/api/subcategory',SubcategoryRoute);
app.use('/api/subject',SubjectRoute);
app.use('/api/quiz',QuizRoute)
app.use('/api/subscription',SubscriptionRoute)
app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(500).json({
        success:false,
        message:errorMessage,
        status:errorStatus,
        stack:err.stack,

    });
})
const port = process.env.PORT||5200;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});