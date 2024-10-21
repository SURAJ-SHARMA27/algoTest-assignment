// currentIndexSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrentIndexState {
  currentIndex: number;
}

const initialState: CurrentIndexState = {
  currentIndex: 0, // Set the initial value for currentIndex
};

const currentIndexSlice = createSlice({
  name: 'currentIndex',
  initialState,
  reducers: {
    setCurrentIndex(state, action: PayloadAction<number>) {
      state.currentIndex = action.payload; // Update the currentIndex
    },
  },
});

// Export actions
export const { setCurrentIndex } = currentIndexSlice.actions;

// Export reducer
export default currentIndexSlice.reducer;
