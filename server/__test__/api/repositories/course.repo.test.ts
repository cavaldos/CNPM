import CourseRepository from '../../../src/api/repositories/course.repo';
import DataConnect from '../../../src/config/DataConnect';

jest.mock('../../../src/config/DataConnect');

describe('CourseRepository', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Course Queries', () => {
        it('should call executeWithParams with correct query and params for getCourseByID', async () => {
            const mockExecuteWithParams = jest.spyOn(DataConnect, 'executeWithParams');
            await CourseRepository.getCourseByID(1);
            expect(mockExecuteWithParams).toHaveBeenCalledWith(expect.stringContaining('SELECT c.*'), { CourseID: 1 });
        });

        it('should call execute with correct query for getAllCourses', async () => {
            const mockExecute = jest.spyOn(DataConnect, 'execute');
            await CourseRepository.getAllCourses();
            expect(mockExecute).toHaveBeenCalledWith(expect.stringContaining('SELECT c.*'));
            expect(mockExecute).toHaveBeenCalledWith(expect.stringContaining('ORDER BY c.CreateTime DESC'));
        });

        it('should call executeWithParams with correct query and params for getAllCoursesByInstructorID', async () => {
            const mockExecuteWithParams = jest.spyOn(DataConnect, 'executeWithParams');
            await CourseRepository.getAllCoursesByInstructorID(1);
            expect(mockExecuteWithParams).toHaveBeenCalledWith(expect.stringContaining('SELECT c.*'), { InstructorID: 1 });
            expect(mockExecuteWithParams).toHaveBeenCalledWith(expect.stringContaining('WHERE c.InstructorID = @InstructorID'), expect.any(Object));
        });

        it('should call execute and calculate total pages correctly for totalPages', async () => {
            const mockExecute = jest.spyOn(DataConnect, 'execute');
            mockExecute.mockResolvedValue([{ TotalCourses: 25 }]);
            const total = await CourseRepository.totalPages();
            expect(mockExecute).toHaveBeenCalledWith(expect.stringContaining('SELECT COUNT(*) as TotalCourses'));
            expect(total).toBe(3); // Math.ceil(25 / 10)
        });

        it('should call executeProcedure and totalPages for getAllCoursesPagination', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            const mockTotalPages = jest.spyOn(CourseRepository, 'totalPages').mockResolvedValue(5);
            const mockCourses = [{ id: 1, title: 'Course 1' }];
            mockExecuteProcedure.mockResolvedValue(mockCourses);

            const result = await CourseRepository.getAllCoursesPagination(0, 10);

            expect(mockExecuteProcedure).toHaveBeenCalledWith('get_all_course', { OffSet: 0, PageSize: 10 });
            expect(mockTotalPages).toHaveBeenCalled();
            expect(result).toEqual({ courses: mockCourses, total: 5 });
        });

         it('should call executeWithParams with correct query and params for setHiddenCourse', async () => {
            const mockExecuteWithParams = jest.spyOn(DataConnect, 'executeWithParams');
            await CourseRepository.setHiddenCourse(1, true);
            expect(mockExecuteWithParams).toHaveBeenCalledWith(expect.stringContaining('UPDATE [Course]'), { CourseID: 1, IsHidden: true });
        });

        it('should call executeWithParams with correct query and params for autoComplete', async () => {
            const mockExecuteWithParams = jest.spyOn(DataConnect, 'executeWithParams');
            await CourseRepository.autoComplete('react');
            expect(mockExecuteWithParams).toHaveBeenCalledWith(expect.stringContaining('WITH SplitWords AS'), { Search: 'react' });
        });

        it('should call executeProcedure with correct procedure name and params for searchCourse', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            const mockResult = { courses: [], total: 0 };
            mockExecuteProcedure.mockResolvedValue(mockResult);

            const result = await CourseRepository.searchCourse('typescript', 2, 15);

            expect(mockExecuteProcedure).toHaveBeenCalledWith('search_course', {
                SearchTerm: 'typescript',
                Offset: 15, // (2 - 1) * 15
                PageSize: 15
            });
            expect(result).toEqual(mockResult);
        });

         it('should return empty result if searchCourse procedure returns null', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            mockExecuteProcedure.mockResolvedValue(null); // Simulate procedure returning null

            const result = await CourseRepository.searchCourse('java', 1, 10);

            expect(mockExecuteProcedure).toHaveBeenCalledWith('search_course', {
                SearchTerm: 'java',
                Offset: 0,
                PageSize: 10
            });
            expect(result).toEqual({ courses: [], total: 0 });
        });
    });

    describe('Course Modifications', () => {
        it('should call executeProcedure with correct procedure name and params for createCourse', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await CourseRepository.createCourse('New Course', 'Web Dev', 'Description', 'image.jpg', 1);
            expect(mockExecuteProcedure).toHaveBeenCalledWith('create_course', {
                Title: 'New Course',
                Topic: 'Web Dev',
                Description: 'Description',
                Image: 'image.jpg',
                InstructorID: 1,
            });
        });

        it('should call executeProcedure with correct procedure name and params for updateCourse', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await CourseRepository.updateCourse(1, 'Updated Course', 'Mobile Dev', 'New Desc', 'new_image.png', 1);
            expect(mockExecuteProcedure).toHaveBeenCalledWith('update_course', {
                CourseID: 1,
                Title: 'Updated Course',
                Topic: 'Mobile Dev',
                Description: 'New Desc',
                Image: 'new_image.png',
                InstructorID: 1,
            });
        });

        it('should call executeProcedure with correct procedure name and params for deleteCourse', async () => {
            const mockExecuteProcedure = jest.spyOn(DataConnect, 'executeProcedure');
            await CourseRepository.deleteCourse(1);
            expect(mockExecuteProcedure).toHaveBeenCalledWith('delete_course', {
                CourseID: 1
            });
        });
    });
});