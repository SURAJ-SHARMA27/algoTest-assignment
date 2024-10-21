import React from 'react';
import { render, fireEvent,screen } from '@testing-library/react';
import { it, expect, describe, vi } from 'vitest'
import '@testing-library/jest-dom/vitest';
import Dropdown from '../src/Components/Dropdowns/Dropdown/Dropdown';


const mockSetFirstSelectedOption = vi.fn();

const mockOptions = [
    { name: "Option 1", value: "Value 1" },
    { name: "Option 2", value: "Value 2" },
    { name: "Option 3", value: "Value 3" },
];

describe('Dropdown Component', () => {
    it('should set selected option when an option is clicked', () => {
        const { getByText,getByTestId } = render(
            <Dropdown 
                firstDropdown={mockOptions} 
                firstSelectedOption={mockOptions[0]}  
                setFirstSelectedOption={mockSetFirstSelectedOption} 
            />
        );

        const dropdownHeader = getByTestId('dropdown-header');
        fireEvent.click(dropdownHeader);
        fireEvent.click(getByText('Option 2'));
        expect(mockSetFirstSelectedOption).toHaveBeenCalledWith(mockOptions[1]);
    });

    it('should check initially dropdown should be closed', () => {
        render(
            <Dropdown 
                firstDropdown={mockOptions} 
                firstSelectedOption={mockOptions[0]}  
                setFirstSelectedOption={mockSetFirstSelectedOption} 
            />
        );

         const optionsList = screen.queryByTestId('options-list');
        expect(optionsList).not.toBeInTheDocument();  
    });

    
});
