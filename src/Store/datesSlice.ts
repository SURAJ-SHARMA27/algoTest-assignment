// datesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DatesState {
  dates: string[]; // The dates state will be an array of strings
}

const initialState: DatesState = {
  dates: [], // Initial state is an empty array
};

const datesSlice = createSlice({
  name: 'dates',
  initialState,
  reducers: {
    setDates(state, action: PayloadAction<string[]>) {
      state.dates = action.payload; 
    },
    addDate(state, action: PayloadAction<string>) {
      state.dates.push(action.payload); // Add a single date to the array
    },
    clearDates(state) {
      state.dates = []; // Clear the dates array
    },
  },
});

// Export actions
export const { setDates, addDate, clearDates } = datesSlice.actions;

// Export reducer
export default datesSlice.reducer;
