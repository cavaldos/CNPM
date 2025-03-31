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

  test('has correct wrapper styling', () => {
    render(<Loading />);
    const wrapperDiv = document.querySelector('div');
    expect(wrapperDiv).toHaveClass('flex');
    expect(wrapperDiv).toHaveClass('items-center');
    expect(wrapperDiv).toHaveClass('justify-center');
    expect(wrapperDiv).toHaveClass('w-screen');
    expect(wrapperDiv).toHaveClass('h-screen');
  });

  test('spinner has correct styling', () => {
    render(<Loading />);
    const svgElement = document.querySelector('svg');
    expect(svgElement).toHaveClass('h-20');
    expect(svgElement).toHaveClass('w-20');
    expect(svgElement).toHaveClass('text-blue-500');
  });

  test('renders without crashing', () => {
    const { container } = render(<Loading />);
    expect(container).toBeTruthy();
  });

  test('is accessible', () => {
    render(<Loading />);
    const svgElement = document.querySelector('svg');
    // Check if SVG has role attribute for accessibility
    expect(svgElement.getAttribute('role')).toBe('status');
  });
});