// Header.tsx
import React from 'react';
import { Box } from '@mui/material';
import Dropdown from './Dropdowns/Dropdown/Dropdown'; 
import DropdownSecond from './Dropdowns/DropdownSecond/DropdownSecond';  
import DropdownThird from './Dropdowns/DropdownThird/DropdownThree';  

 interface HeaderProps {
  firstDropdown: { name: string; value: string }[];
  firstSelectedOption:{ name: string; value: string };
  setFirstSelectedOption:  (option: { name: string; value: string }) => void
  isSmallScreen: boolean;  
}

 const Header: React.FC<HeaderProps> = ({ 
  firstDropdown, 
  firstSelectedOption, 
  setFirstSelectedOption, 
  isSmallScreen 
}) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Dropdown 
      firstDropdown={firstDropdown} 
      firstSelectedOption={firstSelectedOption} 
      setFirstSelectedOption={setFirstSelectedOption} 
    />
    <DropdownSecond />
    {!isSmallScreen && <DropdownThird />}
  </Box>
);

export default Header;
