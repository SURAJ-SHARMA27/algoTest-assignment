import React from 'react';
import { Box } from '@mui/material';
import Dropdown from './Dropdowns/Dropdown/Dropdown'; 
import DropdownSecond from './Dropdowns/DropdownSecond/DropdownSecond';  
import DropdownThird from './Dropdowns/DropdownThird/DropdownThree';  

interface HeaderProps {
  isSmallScreen: boolean;  
}

const Header: React.FC<HeaderProps> = ({ 
  isSmallScreen 
}) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }} data-testid="header-container">
    <Dropdown 
      data-testid="dropdown-first" // Assuming Dropdown accepts this prop and uses it correctly
    />
    <DropdownSecond data-testid="dropdown-second" />
    {!isSmallScreen && <DropdownThird data-testid="dropdown-third" />}
  </Box>
);

export default Header;
