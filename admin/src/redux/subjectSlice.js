import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
    subjects:[],
    status:'idle',
    error:null,
}

console.log(initialState.subjects)

//Adding Subjects
export const addSubjects = createAsyncThunk('subjects/addsubjects',async({categoryname,subcategoryname,subjectname})=>{
    console.log(categoryname);
    console.log(subcategoryname);
    console.log(subjectname);
   
   try {
      const response = await axios.post(`http://localhost:5100/api/subject`,{categoryname,subcategoryname,subjectname})
      console.log(response.data)
      window.location.replace('/subject')
      return response.data;
    } 
    catch (error) {
     console.log({message:'Error adding Subjects'})
    }
})

//fetch Subjects
export const fetchSubjects = createAsyncThunk('subjects/fetchsubjects',async()=>{
   try {
     const response = await axios.get('http://localhost:5100/api/subject')
     console.log(response.data)
     return response.data;
   } catch (error) {
    console.log({message:'Error getting Subjects'})
   }})

//delete Subjects
export const deleteSubjects = createAsyncThunk('subjects/deletesubjects',async(id)=>{
    try {
        await axios.delete(`http://localhost:5100/api/subject/${id}`)
      window.location.replace('/subject')
    return id;
    } catch (error) {
       console.log({message:'Error deleting subjects'}) 
    } })

//view Subjects
export const viewSubjects = createAsyncThunk('subjects/viewsubjects',async(id)=>{
    try {
    const response = await axios.get(`http://localhost:5100/api/subject/${id}`)
    return response.data;
    } catch (error) {
        console.log({message:'Error getting subjects'})
    }
   
})

//update Subjects
export const updateSubjects = createAsyncThunk('subjects/updatesubjects',async({id,subjectname})=>{
    try {
        const response = await axios.put(`http://localhost:5100/api/subject/${id}`,{subjectname})
        return response.data;
    } catch (error) {
    console.log({message:'Error updating subjects'})
    }})
    
    //update Subjects Status
export const updateSubjectsStatus = createAsyncThunk('subjects/updatesubjectstatus',async (id) => {
    console.log(id);    
    try {
        const response = await axios.patch(`http://localhost:5100/api/subject/${id}/status`);
        return response.data;
        } 
        catch (error) {
            console.log({message:'Error in updateSubjectsStatus'})
        }});


const subjectSlice = createSlice({
    name:'subjects',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addSubjects.fulfilled,(state,action)=>{
            console.log(state.subjects)
            console.log(action.payload)
           state.subjects.push(action.payload);
            })
        .addCase(fetchSubjects.pending,(state)=>{
            state.status ='loading';
        })
        .addCase(fetchSubjects.fulfilled,(state,action)=>{
            state.status ='succeeded';
            state.subjects = action.payload;
        })
        .addCase(fetchSubjects.rejected,(state,action)=>{
            state.status ='failed';
            state.error =action.error.message;
        })
         .addCase(deleteSubjects.fulfilled,(state,action)=>{
            state.subjects = state.subjects.filter(subject => subject.id !==action.payload)
               
        })
        .addCase(updateSubjects.fulfilled, (state, action) => {
            const index = state.subjects.findIndex(subject => subject.id === action.payload.id);
            if (index!== -1) {
              state.subjects[index] = action.payload;
            }
          })
        .addCase(updateSubjectsStatus.fulfilled, (state, action) => {
            const updatedsubject = action.payload;
            console.log(updatedsubject)
            const index = state.subjects.findIndex(subject => subject._id === updatedsubject._id);
            if (index !== -1) {
              state.subjects[index] = updatedsubject;
            }})
          }})

export default subjectSlice.reducer;