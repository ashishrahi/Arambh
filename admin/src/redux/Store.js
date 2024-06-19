import {configureStore} from '@reduxjs/toolkit'
import categoryReducer from './categorySlice'
import subcategoryReducer from './subcategorySlice'
import authReducer from './authSlice'
import subjectReducer from './subjectSlice'
import themeReducer from './themeSlice'
import quizReducer from './quizSlice'
 export const store = configureStore({
    reducer:{
        theme:themeReducer,
        auth:authReducer,
        categories:categoryReducer,
        subcategories:subcategoryReducer,
        subjects:subjectReducer,
        quiz:quizReducer,

     }
 })