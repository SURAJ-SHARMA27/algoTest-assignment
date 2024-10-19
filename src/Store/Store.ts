// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import testReducer from './testSlice';

const store = configureStore({
  reducer: {
    test: testReducer,
  },
});

// Export store types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
