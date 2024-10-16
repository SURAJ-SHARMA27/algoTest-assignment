// Header.tsx
import React from 'react';
import { Box } from '@mui/material';
import Dropdown from './Dropdowns/dropdown'; 
import DropdownSecond from './Dropdowns/DropdownSecond';  
import DropdownThird from './Dropdowns/DropdownThree';  

 interface HeaderProps {
  firstDropdown: any;  
  firstSelectedOption: string;  
  setFirstSelectedOption: (option: string) => void; 
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
