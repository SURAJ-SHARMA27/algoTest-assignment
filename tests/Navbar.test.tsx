import React, { useState } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { it, expect, describe, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import Navigation from '../src/Components/Navigation';

// Mock properties to use in the tests
const mockProps = {
  dates: [
    "2024-10-23",
    "2024-10-30",
    "2024-11-06",
    "2024-11-13",
    "2024-11-27",
    "2024-12-24",
    "2025-03-26",
    "2025-06-25",
    "2025-09-24"
],
  currentDate: '2024-10-01',
  currentIndex: 0,
  scrollLeft: vi.fn(),
  scrollRight: vi.fn(),
  handleDateChange: vi.fn(),
};

describe('Navigation Component', () => {
  it('renders the component without crashing', () => {
    render(<Navigation {...mockProps} />);
    expect(screen.getByText('23 OCT (3d)')).toBeInTheDocument(); 
  });
  it('disables the left button when currentIndex is 0', () => {
    render(<Navigation {...mockProps} />);
    const leftButton = screen.queryByTestId('leftButton');

    expect(leftButton).toBeDisabled();
  });
  
  it('sets currentIndex to the clicked date button index', () => {
    const TestComponent = () => {
      const [currentDate, setCurrentDate] = useState("2024-10-23");
      const  dates= [
        "2024-10-23",
        "2024-10-30",
        "2024-11-06",
        "2024-11-13",
        "2024-11-27",
        "2024-12-24",
        "2025-03-26",
        "2025-06-25",
        "2025-09-24"
    ];
  
      const scrollLeft = vi.fn();
      const scrollRight = vi.fn();
      const handleDateChange = (index: number) => {
        setCurrentDate(dates[index]);
      };
  
      return (
        <Navigation
          dates={dates}
          currentDate={currentDate}
          currentIndex={0}
          scrollLeft={scrollLeft}
          scrollRight={scrollRight}
          handleDateChange={handleDateChange}
        />
      );
    };
  
    render(<TestComponent />);
  

  
    // Click on the second date button
    fireEvent.click(screen.getByText('30 OCT (10d)'));
  
    // Now the second date should be active
    expect(screen.getByText('30 OCT (10d)')).toHaveStyle('background-color: #E7EEF3');
    // expect(screen.getByText('1 OCT (Xd)')).toHaveStyle('background-color: transparent');
  });
});
