import { render, screen } from '@testing-library/react';
import { expect, jest } from '@jest/globals';
import Loading from '../../../../src/components/ui/utilize/Loading';

describe('Loading Component', () => {
  // test('renders without crashing', () => {
  //   render(<Loading />);
  //   const loader = screen.getByRole('status');
  //   expect(loader).toBeInTheDocument(4);
  // });

  test('displays spinner icon', () => {
    render(<Loading />);
    const spinner = document.querySelector('svg');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('animate-spin');
  });

  test('spinner has correct styling', () => {
    render(<Loading />);
    const spinner = document.querySelector('svg');
    expect(spinner).toHaveClass('h-20');
    expect(spinner).toHaveClass('w-20');
    expect(spinner).toHaveClass('text-blue-500');
  });

  // test('wrapper has correct styling', () => {
  //   render(<Loading />);
  //   const wrapperDiv = document.querySelector('div');
  //   expect(wrapperDiv).toHaveClass('flex');
  //   expect(wrapperDiv).toHaveClass('items-center');
  //   expect(wrapperDiv).toHaveClass('justify-center');
  //   expect(wrapperDiv).toHaveClass('w-screen');
  //   expect(wrapperDiv).toHaveClass('h-screen');
  // });

  // test('wrapper has correct aria attributes', () => {
  //   render(<Loading />);
  //   const wrapperDiv = document.querySelector('div');
  //   expect(wrapperDiv).toHaveAttribute('aria-live', 'polite');
  //   expect(wrapperDiv).toHaveAttribute('aria-busy', 'true');
  // });
});