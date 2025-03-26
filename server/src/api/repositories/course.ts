import DataConnect from '../../config/DataConnect';

const CourseRepository = {
    async getCourseByID(courseID: number) {
        const query = `
            SELECT c.*, 
                   u.FullName as InstructorName,
                   (SELECT COUNT(*) FROM Review r WHERE r.CourseID = c.CourseID) as ReviewCount,
                   (SELECT COUNT(*) FROM Lessons l WHERE l.CourseID = c.CourseID) as LessonCount
            FROM Course c
            INNER JOIN [User] u ON c.InstructorID = u.UserID
            WHERE c.CourseID = @CourseID
        `;
        const params = {
            CourseID: courseID
        };
        return await DataConnect.executeWithParams(query, params);
    },

    async getAllCourses() {
        const query = `

         SELECT c.*,
                   u.FullName as InstructorName,
                   (SELECT COUNT(*) FROM Review r WHERE r.CourseID = c.CourseID) as ReviewCount,
                   (SELECT COUNT(*) FROM Lessons l WHERE l.CourseID = c.CourseID) as LessonCount
            FROM Course c
            INNER JOIN [User] u ON c.InstructorID = u.UserID
            ORDER BY c.CreateTime DESC
            OFFSET 0 ROWS FETCH NEXT 500 ROWS ONLY;
        `;
        return await DataConnect.execute(query);
    },


    async getAllCoursesByInstructorID(instructorID: number) {
        const query = `
            SELECT c.*,
                   u.FullName as InstructorName,
                   (SELECT COUNT(*) FROM Review r WHERE r.CourseID = c.CourseID) as ReviewCount,
                   (SELECT COUNT(*) FROM Lessons l WHERE l.CourseID = c.CourseID) as LessonCount,
                   (SELECT AVG(r.Rating) FROM Review r WHERE r.CourseID = c.CourseID) as AvgRating,
                   (SELECT COUNT(*) FROM Enrollment e WHERE e.CourseID = c.CourseID) as EnrollmentCount

            FROM Course c
            INNER JOIN [User] u ON c.InstructorID = u.UserID
            WHERE c.InstructorID = @InstructorID
            ORDER BY c.CreateTime DESC
        `;
        const params = {
            InstructorID: instructorID
        };
        return await DataConnect.executeWithParams(query, params);
    },

    async totalPages() {
        const query = `
            SELECT COUNT(*) as TotalCourses
            FROM Course
        `;
        const result = await DataConnect.execute(query);
        return Math.ceil(result[0].TotalCourses / 10); // Assuming page size is 10
    },


    async getAllCoursesPagination(offSet: number, pageSize: number) {
        const proc = 'get_all_course';
        const params = {
            OffSet: offSet,
            PageSize: pageSize
        }
        const courses = await DataConnect.executeProcedure(proc, params);
        const total = await this.totalPages();
        return {
            courses,
            total,
        };
    },

    
    async createCourse(title: string, topic: string, description: string, image: string, instructorID: number) {
        const proc = 'create_course'
        const params = {
            Title: title,
            Topic: topic,
            Description: description,
            Image: image,
            InstructorID: instructorID,
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async updateCourse(courseID: number, title: string, topic: string, description: string, image: string, instructorID: number) {
        const proc = 'update_course';
        const params = {
            CourseID: courseID,
            Title: title,
            Topic: topic,
            Description: description,
            Image: image,
            InstructorID: instructorID,
        };
        return await DataConnect.executeProcedure(proc, params);
    },

    async deleteCourse(courseID: number) {
        const proc = 'delete_course';
        const params = {
            CourseID: courseID
        };
        return await DataConnect.executeProcedure(proc, params);
    },
    async setHiddenCourse(courseID: number, isHidden: boolean) {
        const query = `UPDATE [Course]
                       SET IsHidden = @IsHidden
                       WHERE CourseID = @CourseID`;

        const params = {
            IsHidden: isHidden,
            CourseID: courseID
        };

        return await DataConnect.executeWithParams(query, params);
    }
};

export default CourseRepository;
