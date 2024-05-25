import { createSlice } from '@reduxjs/toolkit';

const allDataSlice = createSlice({
  name: 'allData',
  initialState: {
    data:[]
  },
  reducers: {
    addAll: (state,action) => {
      state.data = action.payload.data
    },
    addNewData:(state,action) =>{
       state.data = [...state.data , action.payload.data]
    }
  },
});

export const { addAll,addNewData } = allDataSlice.actions;
export default allDataSlice.reducer;