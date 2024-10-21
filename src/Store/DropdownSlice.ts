import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DropdownOption } from '../Components/Utils/interfaces';

// Extend DropdownState to include firstSelectedOption
interface DropdownState {
  firstDropdown: DropdownOption[];
  firstSelectedOption: DropdownOption;
}

// Define the initial state with both firstDropdown and firstSelectedOption
const initialState: DropdownState = {
  firstDropdown: [],
  firstSelectedOption: {
    name: '',
    value: '',
  },
};

const firstDropdownSlice = createSlice({
  name: 'firstDropdown',
  initialState,
  reducers: {
    setFirstDropdown: (state, action: PayloadAction<DropdownOption[]>) => {
      state.firstDropdown = action.payload;
    },
    setFirstSelectedOption: (state, action: PayloadAction<DropdownOption>) => {
        console.log("i am called")
      state.firstSelectedOption = action.payload;
    },
  },
});

// Export actions and reducer
export const { setFirstDropdown, setFirstSelectedOption } = firstDropdownSlice.actions;
export default firstDropdownSlice.reducer;
