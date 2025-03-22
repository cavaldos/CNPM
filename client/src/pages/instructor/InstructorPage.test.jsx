import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InstructorPage from './index';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('InstructorPage Component', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it('renders the instructor dashboard', () => {
    render(
      <BrowserRouter>
        <InstructorPage />
      </BrowserRouter>
    );
    expect(screen.getByText('Instructor Dashboard')).toBeInTheDocument();
  });

  it('navigates to create course page when "Tạo khóa học" card is clicked', () => {
    render(
      <BrowserRouter>
        <InstructorPage />
      </BrowserRouter>
    );
    const createCourseCard = screen.getByText('Tạo khóa học');
    fireEvent.click(createCourseCard);
    expect(mockNavigate).toHaveBeenCalledWith('/create-course');
  });

  it('navigates to my courses page when "Quản lý khóa học" card is clicked', () => {
    render(
      <BrowserRouter>
        <InstructorPage />
      </BrowserRouter>
    );
    const manageCoursesCard = screen.getByText('Quản lý khóa học');
    fireEvent.click(manageCoursesCard);
    expect(mockNavigate).toHaveBeenCalledWith('/my-courses');
  });

  it('navigates to messages page when "Tin nhắn" card is clicked', () => {
    render(
      <BrowserRouter>
        <InstructorPage />
      </BrowserRouter>
    );
    const messagesCard = screen.getByText('Tin nhắn');
    fireEvent.click(messagesCard);
    expect(mockNavigate).toHaveBeenCalledWith('/messages');
  });

  it('navigates to profile page when "Hồ sơ cá nhân" card is clicked', () => {
    render(
      <BrowserRouter>
        <InstructorPage />
      </BrowserRouter>
    );
    const profileCard = screen.getByText('Hồ sơ cá nhân');
    fireEvent.click(profileCard);
    expect(mockNavigate).toHaveBeenCalledWith('/profile');
  });

  it('navigates to my courses page when "Xem tất cả" button is clicked', () => {
    render(
      <BrowserRouter>
        <InstructorPage />
      </BrowserRouter>
    );
    const viewAllButton = screen.getByText('Xem tất cả');
    fireEvent.click(viewAllButton);
    expect(mockNavigate).toHaveBeenCalledWith('/my-courses');
  });

  it('displays recent courses data', () => {
    render(
      <BrowserRouter>
        <InstructorPage />
      </BrowserRouter>
    );
    expect(screen.getByText('Introduction to Web Development')).toBeInTheDocument();
    expect(screen.getByText('Advanced JavaScript Programming')).toBeInTheDocument();
    expect(screen.getByText('120')).toBeInTheDocument();
    expect(screen.getByText('85')).toBeInTheDocument();
    expect(screen.getByText('Published')).toBeInTheDocument();
    expect(screen.getByText('Draft')).toBeInTheDocument();
  });
});
