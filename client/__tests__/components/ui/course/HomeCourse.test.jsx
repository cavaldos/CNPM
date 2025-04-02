import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import HomeCourse from '../../../../src/components/ui/course/HomeCourse';
import PublicService from '../../../../src/services/public.service';

// filepath: /Users/bourbon/Code/Workspace/CNPM/client/__tests__/components/ui/course/HomeCourse.test.jsx

// Mock the PublicService module
jest.mock('../../../../src/services/public.service');
// Mock CourseCard component
jest.mock('../../../../src/components/ui/course/CourseCard', () => ({ course }) => (
    <div data-testid={`course-card-${course.id}`}>{course.title}</div>
));

const mockCoursesPage1 = {
    result: [
        { id: 1, title: 'Course 1' },
        { id: 2, title: 'Course 2' },
    ],
    totalPage: 3,
    page: 0,
};

const mockCoursesPage2 = {
    result: [
        { id: 3, title: 'Course 3' },
        { id: 4, title: 'Course 4' },
    ],
    totalPage: 3,
    page: 1,
};

const mockEmptyCourses = {
    result: [],
    totalPage: 0,
    page: 0,
};

const mockError = new Error("Network Error");

const renderComponent = (initialEntries = ['/']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <Routes>
                <Route path="/" element={<HomeCourse />} />
                <Route path="/search/:searchTerm" element={<HomeCourse />} />
            </Routes>
        </MemoryRouter>
    );
};

describe('HomeCourse Component', () => {
    beforeEach(() => {
        // Reset mocks before each test
        jest.clearAllMocks();
        // Default mock implementation
        PublicService.course.searchCourse.mockResolvedValue({ data: mockCoursesPage1 });
    });

    test('renders loading state initially', () => {
        renderComponent();
        expect(screen.getByRole('status')).toBeInTheDocument(); // Assuming the spinner has role="status" or similar
    });

    test('fetches and displays courses successfully', async () => {
        renderComponent();
        await waitFor(() => {
            expect(PublicService.course.searchCourse).toHaveBeenCalledWith('', 0, 8);
        });
        await waitFor(() => {
            expect(screen.getByText('Course 1')).toBeInTheDocument();
            expect(screen.getByText('Course 2')).toBeInTheDocument();
            expect(screen.getByText('Khóa học đề xuất cho bạn')).toBeInTheDocument();
        });
        // Check pagination
        expect(screen.getByText('1')).toHaveClass('bg-blue-600');
        expect(screen.getByText('Next')).not.toBeDisabled();
        expect(screen.getByText('Previous')).toBeDisabled();
    });

    test('displays error message when fetch fails', async () => {
        PublicService.course.searchCourse.mockRejectedValue(mockError);
        renderComponent();
        await waitFor(() => {
            expect(PublicService.course.searchCourse).toHaveBeenCalledTimes(1);
        });
        await waitFor(() => {
            expect(screen.getByText(/Network Error/i)).toBeInTheDocument();
            expect(screen.getByText('Thử lại')).toBeInTheDocument();
        });
    });

    test('handles retry button click after error', async () => {
        PublicService.course.searchCourse.mockRejectedValueOnce(mockError);
        renderComponent();

        await waitFor(() => {
            expect(screen.getByText(/Network Error/i)).toBeInTheDocument();
        });

        PublicService.course.searchCourse.mockResolvedValue({ data: mockCoursesPage1 }); // Setup success for retry
        fireEvent.click(screen.getByText('Thử lại'));

        await waitFor(() => {
            expect(PublicService.course.searchCourse).toHaveBeenCalledTimes(2); // Initial call + retry
        });
        await waitFor(() => {
            expect(screen.getByText('Course 1')).toBeInTheDocument();
        });
    });

    test('displays "No courses found" message', async () => {
        PublicService.course.searchCourse.mockResolvedValue({ data: mockEmptyCourses });
        renderComponent();
        await waitFor(() => {
            expect(PublicService.course.searchCourse).toHaveBeenCalledTimes(1);
        });
        await waitFor(() => {
            expect(screen.getByText('Không tìm thấy khóa học nào')).toBeInTheDocument();
        });
    });

    test('handles pagination: clicking next page', async () => {
        PublicService.course.searchCourse
            .mockResolvedValueOnce({ data: mockCoursesPage1 }) // Initial load
            .mockResolvedValueOnce({ data: mockCoursesPage2 }); // Load page 2

        renderComponent();

        // Wait for initial load
        await waitFor(() => {
            expect(screen.getByText('Course 1')).toBeInTheDocument();
            expect(screen.getByText('Next')).not.toBeDisabled();
        });

        // Click Next
        fireEvent.click(screen.getByText('Next'));

        // Wait for API call for page 2
        await waitFor(() => {
            expect(PublicService.course.searchCourse).toHaveBeenCalledWith('', 1, 8);
        });

        // Wait for page 2 content
        await waitFor(() => {
            expect(screen.getByText('Course 3')).toBeInTheDocument();
            expect(screen.getByText('Course 4')).toBeInTheDocument();
            expect(screen.getByText('2')).toHaveClass('bg-blue-600'); // Page 2 button active
            expect(screen.getByText('Previous')).not.toBeDisabled();
        });
    });

    test('handles pagination: clicking specific page number', async () => {
        PublicService.course.searchCourse
            .mockResolvedValueOnce({ data: mockCoursesPage1 }) // Initial load (page 0)
            .mockResolvedValueOnce({ data: mockCoursesPage2 }); // Load page 2 (index 1)

        renderComponent();

        // Wait for initial load
        await waitFor(() => {
            expect(screen.getByText('Course 1')).toBeInTheDocument();
            expect(screen.getByText('2')).toBeInTheDocument(); // Page 2 button exists
        });

        // Click page 2 button
        fireEvent.click(screen.getByText('2'));

        // Wait for API call for page 2
        await waitFor(() => {
            expect(PublicService.course.searchCourse).toHaveBeenCalledWith('', 1, 8);
        });

        // Wait for page 2 content
        await waitFor(() => {
            expect(screen.getByText('Course 3')).toBeInTheDocument();
            expect(screen.getByText('2')).toHaveClass('bg-blue-600');
        });
    });

    test('fetches courses based on searchTerm from URL', async () => {
        const searchTerm = 'React';
        PublicService.course.searchCourse.mockResolvedValue({
            data: {
                result: [{ id: 5, title: 'React Basics' }],
                totalPage: 1,
                page: 0,
            }
        });

        renderComponent([`/search/${searchTerm}`]);

        await waitFor(() => {
            expect(PublicService.course.searchCourse).toHaveBeenCalledWith(searchTerm, 0, 8);
        });

        await waitFor(() => {
            expect(screen.getByText(`Kết quả tìm kiếm cho "${searchTerm}"`)).toBeInTheDocument();
            expect(screen.getByText('React Basics')).toBeInTheDocument();
        });
    });

    test('displays specific message when no courses found for a search term', async () => {
        const searchTerm = 'NonExistent';
        PublicService.course.searchCourse.mockResolvedValue({ data: mockEmptyCourses });

        renderComponent([`/search/${searchTerm}`]);

        await waitFor(() => {
            expect(PublicService.course.searchCourse).toHaveBeenCalledWith(searchTerm, 0, 8);
        });

        await waitFor(() => {
            expect(screen.getByText('Không tìm thấy khóa học nào')).toBeInTheDocument();
            expect(screen.getByText(`Không tìm thấy khóa học nào cho từ khóa "${searchTerm}"`)).toBeInTheDocument();
        });
    });
});