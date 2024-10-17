import React from 'react';
import { render } from '@testing-library/react';
import DropdownThird from '../src/Components/Dropdowns/DropdownThird/DropdownThree'; // Adjust the import path as needed
import { it, expect, describe } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('DropdownThird Component', () => {
    it('should render without crashing', () => {
        render(<DropdownThird />);
    });

    it('should display the correct selected option name and value', () => {
        const { getByText } = render(<DropdownThird />);
         expect(getByText('India VIX')).toBeInTheDocument();
         expect(getByText('12.92')).toBeInTheDocument();
    });

    it('matches the snapshot', () => {
        const { asFragment } = render(<DropdownThird />);
        expect(asFragment()).toMatchSnapshot();
    });
});
