// subjectSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks for async actions
export const fetchQuestions = createAsyncThunk('questions/fetchQuestions', async () => {
  const response = await axios.get('/api/questions');
  return response.data;
});

export const deleteQuestion = createAsyncThunk('questions/deleteQuestion', async (id) => {
  await axios.delete(`/api/questions/${id}`);
  return id;
});

export const viewQuestion = createAsyncThunk('questions/viewQuestion', async (id) => {
  const response = await axios.get(`/api/questions/${id}`);
  return response.data;
});

export const updateQuestionStatus = createAsyncThunk('questions/updateQuestionStatus', async (id) => {
  const response = await axios.patch(`/api/questions/${id}/status`);
  return response.data;
});

const subjectSlice = createSlice({
  name: 'subjects',
  initialState: { questions: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.questions = state.questions.filter((question) => question.id !== action.payload);
      })
      .addCase(viewQuestion.fulfilled, (state, action) => {
        const index = state.questions.findIndex((q) => q.id === action.payload.id);
        if (index !== -1) {
          state.questions[index] = action.payload;
        }
      })
      .addCase(updateQuestionStatus.fulfilled, (state, action) => {
        const index = state.questions.findIndex((q) => q.id === action.payload.id);
        if (index !== -1) {
          state.questions[index].status = action.payload.status;
        }
      });
  },
});

export default subjectSlice.reducer;
