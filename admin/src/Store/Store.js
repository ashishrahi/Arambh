import {configureStore} from '@reduxjs/toolkit'

import themeReducer from './themeSlice'
import authReducer from './authSlice'
import userReducer from './userSlice'
import categoryReducer from './categorySlice'
import subcategoryReducer from './subcategorySlice'
import subjectReducer from './subjectSlice'
import quizReducer from './quizSlice'
 export const store = configureStore({
    reducer:{
        theme:themeReducer,
        auth:authReducer,
        users:userReducer,
        categories:categoryReducer,
        subcategories:subcategoryReducer,
        subjects:subjectReducer,
        quiz:quizReducer,
    }
 })