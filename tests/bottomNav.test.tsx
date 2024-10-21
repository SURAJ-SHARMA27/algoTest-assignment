import { render, screen } from '@testing-library/react';
import BottomNav from '../src/Components/BottomNav/BottomNav';
import { describe, it, expect } from 'vitest';
import React from 'react';
import '@testing-library/jest-dom/vitest';

describe('BottomNav Component', () => {
  
  // Test case 1: Renders without crashing
  it('renders the BottomNav component without crashing', () => {
    render(<BottomNav />);
    const navContainer = screen.getByTestId('Bottom-navigation');
    expect(navContainer).toBeInTheDocument();
  });

  // Test case 2: Checks that all navigation items are rendered
  it('renders all the navigation items', () => {
    render(<BottomNav />);
    
    const optionChain = screen.getByText('Option Chain');
    const positions = screen.getByText('Positions');
    const payoff = screen.getByText('Payoff');
    const orderWindow = screen.getByText('Order Window');

    expect(optionChain).toBeInTheDocument();
    expect(positions).toBeInTheDocument();
    expect(payoff).toBeInTheDocument();
    expect(orderWindow).toBeInTheDocument();
  });

  // Test case 3: Verifies that all images have the correct alt attributes
  it('renders images with the correct alt text', () => {
    render(<BottomNav />);

    const optionChainImg = screen.getByAltText('Option Chain');
    const positionsImg = screen.getByAltText('Positions');
    const payoffImg = screen.getByAltText('Payoff');
    const orderWindowImg = screen.getByAltText('Order Window');

    expect(optionChainImg).toBeInTheDocument();
    expect(positionsImg).toBeInTheDocument();
    expect(payoffImg).toBeInTheDocument();
    expect(orderWindowImg).toBeInTheDocument();
  });

  // Test case 4: Ensures the labels have the correct text
  it('renders the correct labels for each navigation item', () => {
    render(<BottomNav />);

    const labels = ['Option Chain', 'Positions', 'Payoff', 'Order Window'];

    labels.forEach(label => {
      const navLabel = screen.getByText(label);
      expect(navLabel).toBeInTheDocument();
    });
  });

  // Test case 5: Checks if the "Option Chain" label is bold
  it('applies bold styling to the "Option Chain" label', () => {
    render(<BottomNav />);

    const optionChainLabel = screen.getByText('Option Chain');
    expect(optionChainLabel).toHaveStyle({ fontWeight: 'bold', color: '#2A2A2A' });
  });
});
