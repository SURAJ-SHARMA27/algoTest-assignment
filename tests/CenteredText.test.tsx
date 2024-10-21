import { render, screen } from '@testing-library/react';
import CenteredText from '../src/Components/CenteredText/CenteredText';
import { it, expect, describe } from 'vitest';
import React from 'react';
import '@testing-library/jest-dom/vitest';

describe('CenteredText Component', () => {

    // Test: Check if the CenteredText component renders without crashing
    it('renders the CenteredText component without crashing', () => {
        render(<CenteredText />);
        const centerContainer = screen.getByTestId('center-container');
        expect(centerContainer).toBeInTheDocument();
    });

    // Test: Check if the image is rendered
    it('renders the main image', () => {
        render(<CenteredText />);
        const mainImage = screen.getByTestId('main-image');
        expect(mainImage).toBeInTheDocument();
        expect(mainImage).toHaveAttribute('src', './main.svg');
        expect(mainImage).toHaveAttribute('alt', 'Main SVG');
    });

    // Test: Check if the analysis title is rendered
    it('renders the analysis title text', () => {
        render(<CenteredText />);
        const analysisTitle = screen.getByTestId('analysis-title');
        expect(analysisTitle).toBeInTheDocument();
        expect(analysisTitle).toHaveTextContent('Analysis shows Payoff Graph, Statistics and more...');
    });

    // Test: Check if the description is rendered
    it('renders the analysis description text', () => {
        render(<CenteredText />);
        const analysisDescription = screen.getByTestId('analysis-description');
        expect(analysisDescription).toBeInTheDocument();
        expect(analysisDescription).toHaveTextContent('Select trades from Option Chain or use Prebuilt strategy from Positions tab to see analysis');
    });

    // Test: Check if the anchor link is rendered
    it('renders the anchor link', () => {
        render(<CenteredText />);
        const anchorLink = screen.getByTestId('link');
        expect(anchorLink).toBeInTheDocument();
        expect(anchorLink).toHaveAttribute('href', ''); // Adjust the href as needed
    });
});
