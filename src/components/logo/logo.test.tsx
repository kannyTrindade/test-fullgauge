import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Logo from './index';

describe('Logo Component', () => {
  it('should render the logo correctly', () => {
    render(<Logo />);

    const svgElement = screen.getByTestId('Svg');
    const pathElements = svgElement.getElementsByTagName('path');

    expect(svgElement).toBeInTheDocument();
    expect(pathElements.length).toBeGreaterThan(0);
  });
});