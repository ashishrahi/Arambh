import Home from "./pages/Home/Home"
import {BrowserRouter,Routes,Route} from "react-router-dom"

import Register from './pages/Auth/Register/Register'
import Login from './pages/Auth/Login/Login'

import Users from './pages/Users/UserDetails/Users'
import UserDetails from './pages/Users/UserDetails/UserDetails'
import NewUser from './pages/Users/NewUser/NewUser'
import {userInputs,productInputs} from './formSource'
import ForgetPassword from './pages/Users/ForgetPassword/forgetpassword'
import ResetPassword from './pages/Users/ResetPassword/resetpassword'

import Category from "./pages/Category/CategoryDetails/Category"
import NewCategory from "./pages/Category/NewCategory/NewCategory"
import UpdateCategory from './pages/Category/UpdateCategory/Update'

import Subcategory from "./pages/Subcategory/SubcategoryDetails/Subcategory"
import NewSubcategory from './pages/Subcategory/NewSubcategory/NewSubcategory'
import UpdateSubcategory from './pages/Subcategory/UpdateSubcategory/Updatesubcategory'

import Subject from "./pages/Subject/SubjectDetail/Subjects"
import NewSubject from './pages/Subject/NewSubject/NewSubject'
import UpdateSubject from './pages/Subject/UpdateSubject/Update'
import SubjectQuiz from './pages/SubjectQuiz/SubjectQuiz'
import AddQuiz from './pages/SubjectQuiz/AddQuiz'

import { useSelector } from "react-redux"
import './App.css'


const App = () => {
  const thememode = useSelector((state) => state.theme.mode);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated)
  return (
    <div className={`App${thememode}`}>
      <BrowserRouter>
        <Routes>

        {/* Auth Router */}
        <Route path="/">
        <Route index element={isAuthenticated?<Home/>:<Login/>}/>
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>}/>
        <Route path="forgetpassword" element={<ForgetPassword/>} />
        <Route path="/resetpassword/:token" element={<ResetPassword/>} />

          {/* User Router */}
          <Route path="/users">
          <Route index element={isAuthenticated?<Users/>:<Login/>} />
          <Route path=":id" element={<UserDetails inputs={userInputs} title='View' />}  />
          <Route path="new" element={<NewUser inputs={userInputs} title='Add New User'/>}/>
          </Route>

           {/* Cateogory Router */}
          <Route path="category">
          <Route index element={isAuthenticated?<Category/>:<Login/>}/>
          <Route path=":id" element={<UpdateCategory/>}/>
          <Route path=":id/status" element={<UpdateCategory/>}/>
          <Route path="new" element={<NewCategory inputs={productInputs} title='Add New Category'/>} />
          </Route>

          {/* Subcategory Router */}
          <Route path="subcategory">
          <Route index element={isAuthenticated ? <Subcategory/> : <Login/>} />
          <Route path=":id" element={<UpdateSubcategory/>} />
          <Route path=":id/status" element={<UpdateSubcategory/>}/>
          <Route path="new" element={<NewSubcategory inputs={productInputs} title='Add New Sub Category'/>} />
          </Route>

          {/* Subject Router */}
          <Route path="subject">
          <Route index element={isAuthenticated?<Subject/>:<Login/>} />
          <Route path=":id" element={<UpdateSubject/>} />
          <Route path=":id/status" element={<UpdateCategory/>}/>
          <Route path="new" element={<NewSubject inputs={productInputs} title='Add New Product'/>} />
          </Route>
          
          {/* Quiz Router */}
          <Route path="quiz">
          <Route index element={isAuthenticated?<SubjectQuiz/>:<Login/>} />
          <Route path=":id" element={<UpdateSubject/>} />
          <Route path=":id/status" element={<UpdateCategory/>}/>
          <Route path="new" element={<AddQuiz />} />
          </Route>
        
        
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App