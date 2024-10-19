// src/store/testSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TestState {
  message: string;
}

const initialState: TestState = {
  message: 'Hello, it is testing',
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    updateMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});

export const { updateMessage } = testSlice.actions;
export default testSlice.reducer;
