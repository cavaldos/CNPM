IF OBJECT_ID(
    'get_all_course',
    'P'
) IS NOT NULL DROP
PROCEDURE get_all_course;
GO

CREATE PROCEDURE get_all_course 
    @Offset INT, 
    @PageSize INT 
AS 
BEGIN 

    SELECT  
        co.[CourseID],  
        [Title],  
        [Description],  
        [Topic],  
        [Image],  
        [CreateTime],  
        [IsHidden],  
        u.UserID as InstructorID,
        u.FullName  as InstructorName,
        (SELECT AVG(r.Rating) FROM Review r WHERE r.CourseID = co.CourseID) as AvgRating,
        (SELECT COUNT(*) FROM Enrollment e WHERE e.CourseID = co.CourseID) as EnrollmentCount
    FROM  
        [Course] co  
    JOIN  
        [User] u ON co.InstructorID = u.UserID  
    JOIN 
        [Enrollment] e ON e.CourseID = co.CourseID  
    WHERE  
        co.IsHidden = 0

    ORDER BY  
        co.CreateTime DESC 
    OFFSET  
        @Offset ROWS 
    FETCH NEXT  
        @PageSize ROWS ONLY; 
 
    -- Query to get total count 
    SELECT  
        COUNT(*) AS TotalCount 
    FROM  
        [Course] co 
    JOIN  
        [User] u ON co.InstructorID = u.UserID  
    JOIN 
        [Enrollment] e ON e.CourseID = co.CourseID  
    WHERE  
        co.IsHidden = 0
END;
GO

EXEC get_all_course @Offset = 6, @PageSize = 10;