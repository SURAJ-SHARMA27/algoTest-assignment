// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import rowReduxSlice from './rowReduxSlice';
import currentIndexReducer from './CurrentIndexSlice';
import datesReducer from "./datesSlice";
import DropdownReducer from './DropdownSlice';

const store = configureStore({
  reducer: {
    rowReduxSlice: rowReduxSlice,
    currentIndex: currentIndexReducer,
    dates: datesReducer,
    dropdown:DropdownReducer

  },
});

// Export store types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
