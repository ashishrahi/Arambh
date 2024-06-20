import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import api from "../fetchApi/fetchApi";

const initialState = {
    categories:[],
    status:'idle',
    error:null,
}
console.log(initialState.categories)


export const addedCategories = createAsyncThunk('categories/addedcategories',async(categoryname)=>{
    try {
        const response = await api.post(`/category/`,{categoryname})
        console.log(response.data);
      window.location.replace('/category')
        
        return response.data; 

    } 
    catch (error) {
       console.log({message:'Error added category'}) 
    } })


export const fetchCategories = createAsyncThunk('categories/fetchcategories',async()=>{
try {
     const response = await api.get(`/category`)
     console.log(response.data)
     return response.data;
   } 
catch (error) {
    console.log({message:'Error getting categories'})
   }
   
})

export const deleteCategories = createAsyncThunk('categories/deletecategories',async(id)=>{
    try {
        await api.delete(`/category/${id}`)
        window.location.replace('/category')
        return id; 
    } 
    catch (error) 
    {
       console.log({message:'Error deleting categories'}) 
    } })

export const viewCategories = createAsyncThunk('categories/viewcategories',async(id)=>{
    try {
          const response = await api.get(`/category/${id}`)
          return response.data;
    } 
    catch (error) {
          console.log({message:'Error getting category'})
    }})


export const updateCategories = createAsyncThunk('categories/updatecategories',async({id,categoryname})=>{
    console.log(id)

    try {
        const response = await api.put(`/category/${id}`,{categoryname})
        window.location.replace('/category')
        console.log(response.data)
        return response.data;
       }catch (error) {
        console.log({message:'Error updating categories'})
    }})

export const updateCategoryStatus = createAsyncThunk('categories/updateCategoryStatus', async (id) => {
        try {
        const response = await api.patch(`/category/${id}/status`);
        console.log(response.data)
        return response.data;
        } 
        catch (error) {
    console.log({message:'Error updating Status'})
            }
      });



      


const categorySlice = createSlice({
    name:'categories',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
       .addCase(addedCategories.fulfilled,(state,action)=>{
            console.log(action.payload)
        return state.categories.push(action.payload);
        })

        .addCase(fetchCategories.pending,(state)=>{
            state.status ='loading';
        })
        .addCase(fetchCategories.fulfilled,(state,action)=>{
            state.status ='succeeded';
            state.categories = action.payload;
        })
        .addCase(fetchCategories.rejected,(state,action)=>{
            state.status ='failed';
            state.error =action.error.message;
        })
        .addCase(deleteCategories.fulfilled,(state,action)=>{
            state.categories = state.categories.filter(category => category.id !==action.payload)
        })
        .addCase(updateCategoryStatus.fulfilled, (state, action) => {
            const updatedCategory = action.payload;
            const index = state.categories.findIndex(category => category._id === updatedCategory._id);
            if (index !== -1) {
              state.categories[index] = updatedCategory;
            }
          })
        .addCase(updateCategories.fulfilled, (state, action) => {
            const updatedCategory = action.payload;
            const index = state.categories.findIndex(category => category.id === updatedCategory.id);
            console.log(index)
            if (index !== -1) {
                state.categories[index] = updatedCategory;
            }
        });
          

    }
})
export default categorySlice.reducer;