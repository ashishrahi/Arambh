import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState ={
    subcategories:[],
    status:'idle',
    error:null,
}

console.log(initialState.subcategories)
export const addsubCategories = createAsyncThunk('subcategories/addsubcategories',async({subcategoryname,categoryname})=>{
    console.log(categoryname);
    console.log(subcategoryname)

    try {
      const response = await axios.post('http://localhost:5100/api/subcategory',{subcategoryname,categoryname})
      console.log(response.data)
      window.location.replace('/subcategory')
      return response.data;
    } 
    catch (error) {
     console.log({message:'Error adding Subcategories'})
    }
})

export const fetchsubCategories = createAsyncThunk('subcategories/fetchsubcategories',async()=>{
   try {
     const response = await axios.get('http://localhost:5100/api/subcategory')
     console.log(response.data)
     return response.data;
   } catch (error) {
    console.log({message:'Error getting Subcategories'})
   }})

export const deletesubCategories = createAsyncThunk('subcategories/deletesubcategories',async(id)=>{
    console.log(id)
    try {
        await axios.delete(`http://localhost:5100/api/subcategory/${id}`)
     return id;
    } catch (error) {
       console.log({message:'Error deleting subcategories'}) 
    } })

export const viewsubCategories = createAsyncThunk('subcategories/viewsubcategories',async(id)=>{
    try {
    const response = await axios.get(`http://localhost:5100/api/subcategory/${id}`)
    return response.data;
    } catch (error) {
        console.log({message:'Error getting subcategory'})
    }
   
})
export const updatesubCategories = createAsyncThunk('subcategories/updatesubcategories',async({id,subcategoryname})=>{
    try {
        const response = await axios.put(`http://localhost:5100/api/subcategory/${id}`,{subcategoryname})
        return response.data;
    } catch (error) {
    console.log({message:'Error updating subcategories'})
    }})
    
export const updatesubCategoryStatus = createAsyncThunk('subcategories/updatesubCategoryStatus',async (id) => {
    console.log(id);    
    try {
        const response = await axios.patch(`http://localhost:5100/api/subcategory/${id}/status`);
        return response.data;
        } 
        catch (error) {
            console.log({message:'Error in updatingCategoryStatus'})
        }});


const subcategorySlice = createSlice({
    name:'subcategories',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addsubCategories.fulfilled,(state,action)=>{
          return state.subcategories.push(action.payload);
            })
        .addCase(fetchsubCategories.pending,(state)=>{
            state.status ='loading';
        })
        .addCase(fetchsubCategories.fulfilled,(state,action)=>{
            state.status ='succeeded';
            state.subcategories = action.payload;
        })
        .addCase(fetchsubCategories.rejected,(state,action)=>{
            state.status ='failed';
            state.error =action.error.message;
        })
         .addCase(deletesubCategories.fulfilled,(state,action)=>{
            state.subcategories = state.subcategories.filter(category => category.id !==action.payload)
               
        })
           .addCase(updatesubCategories.fulfilled, (state, action) => {
            const index = state.subcategories.findIndex(category => category._id === action.payload._id);
            if (index!== -1) {
              state.subcategories[index] = action.payload;
            }
          })

        .addCase(updatesubCategoryStatus.fulfilled, (state, action) => {
            const updatedsubCategory = action.payload;
            console.log(updatedsubCategory)
            const index = state.subcategories.findIndex(category => category._id === updatedsubCategory._id);
            if (index !== -1) {
              state.subcategories[index] = updatedsubCategory;
            }
          })
          

    }
})
export default subcategorySlice.reducer;