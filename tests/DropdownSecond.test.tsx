import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import DropdownSecond from '../src/Components/Dropdowns/DropdownSecond/DropdownSecond'; // Adjust the import path as needed
import { it, expect, describe, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('DropdownSecond Component', () => {
  it('should open and close the dropdown when the header is clicked', () => {
    const { getByText } = render(<DropdownSecond />);

    const dropdownHeader = getByText('FUT (30 Oct)');  

     expect(() => getByText('Expiry')).toThrow();  

     fireEvent.click(dropdownHeader);
    expect(getByText('Expiry')).toBeInTheDocument();  

     fireEvent.click(dropdownHeader);
    expect(() => getByText('Expiry')).toThrow();  
  });
});
