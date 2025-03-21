import { render, screen } from '@testing-library/react';
import { expect, jest } from '@jest/globals';
import Loading from '../src/components/ui/utilize/Loading';

describe('Loading Component', () => {
  test('renders loading spinner', () => {
    render(<Loading />);

    // Kiểm tra xem SVG loading có tồn tại
    const svgElement = document.querySelector('svg');
    expect(svgElement).toBeInTheDocument();

    // Kiểm tra xem có class animate-spin không
    expect(svgElement).toHaveClass('animate-spin');
  });
});