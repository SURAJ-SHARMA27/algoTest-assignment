import { render, screen } from '@testing-library/react';
import CustomIcon from '../src/Components/CustomIcon';
import { it, expect, describe } from 'vitest';
import React from 'react';
import '@testing-library/jest-dom/vitest';

describe('CustomIcon Component', () => {
  it('renders the CustomIcon component without crashing', () => {
    render(<CustomIcon />);
    const svgElement = screen.getByTestId('customIcon');
    expect(svgElement).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(<CustomIcon />);
    expect(asFragment()).toMatchSnapshot();
  });


  it('has correct width and height', () => {
    render(<CustomIcon />);
    const svgElement = screen.getByTestId('customIcon');
    expect(svgElement).toHaveAttribute('width', '18');
    expect(svgElement).toHaveAttribute('height', '18');
  });

  it('has the correct stroke color', () => {
    render(<CustomIcon />);
    const svgElement = screen.getByTestId('customIcon');
    expect(svgElement).toHaveAttribute('stroke', '#CA8144');
  });
});
