import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Option } from '../Components/Utils/interfaces';

interface RowReduxState {
  rows: { [strike: number]: Option };  // State for rows
}

const initialState: RowReduxState = {
  rows: {},  
};

const rowReduxSlice = createSlice({
  name: 'rowRedux',
  initialState,
  reducers: {
    setRowsRedux: (state, action: PayloadAction<{ [strike: number]: Option }>) => {
      state.rows = action.payload;
    },
  },
});

// Export the actions
export const { setRowsRedux } = rowReduxSlice.actions;

// Export the reducer
export default rowReduxSlice.reducer;
