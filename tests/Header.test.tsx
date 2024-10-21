import { render, screen } from '@testing-library/react';
import React from 'react';
import Header from '../src/Components/Header'; // Adjust the import path accordingly
import { it, expect, describe, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

describe('Header Component', () => {
  
  const firstDropdown = [
    {
        "name": "BANKNIFTY",
        "value": "25142.5"
    },
    {
        "name": "NIFTY",
        "value": "25142.5"
    },
    {
        "name": "MIDCPNIFTY",
        "value": "25142.5"
    },
    {
        "name": "FINNIFTY",
        "value": "25142.5"
    },
    {
        "name": "NSE_AXISBANK",
        "value": "25142.5"
    },
    {
        "name": "NSE_BAJAJAUTO",
        "value": "25142.5"
    },
    {
        "name": "NSE_BAJFINANCE",
        "value": "25142.5"
    },
    {
        "name": "NSE_HCLTECH",
        "value": "25142.5"
    },
    {
        "name": "NSE_HDFCBANK",
        "value": "25142.5"
    },
    {
        "name": "NSE_INFY",
        "value": "25142.5"
    },
    {
        "name": "NSE_POLYCAB",
        "value": "25142.5"
    },
    {
        "name": "NSE_RELIANCE",
        "value": "25142.5"
    },
    
]

  const firstSelectedOption = {
    "name": "BANKNIFTY",
    "value": "25142.5"
};
  const setFirstSelectedOption = vi.fn(); // Mock function for setFirstSelectedOption

  it('renders the Header component without crashing', () => {
    render(
      <Header
        firstDropdown={firstDropdown}
        firstSelectedOption={firstSelectedOption}
        setFirstSelectedOption={setFirstSelectedOption}
        isSmallScreen={true}
      />
    );

    // Check if Header container is rendered
    const headerContainer = screen.getByTestId('header-container');
    expect(headerContainer).toBeInTheDocument();

  });



 

});
