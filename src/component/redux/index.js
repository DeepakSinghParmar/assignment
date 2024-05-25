import { configureStore } from '@reduxjs/toolkit';
import allDataSlicer from './slicers/AllDataSlice';

const store = configureStore({
  reducer: {
    AllData: allDataSlicer,
  },
});

export default store;