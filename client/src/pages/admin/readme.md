-- Thêm procedure vào database

IF OBJECT_ID(
    'get_courses_offset',
    'P'
) IS NOT NULL DROP
PROCEDURE get_courses_offset;
GO

CREATE PROCEDURE get_courses_offset
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
        [IsHidden]
    FROM  
        [Course] co 
    WHERE  
        co.IsHidden = 0

    ORDER BY  
        co.CourseID ASC
    OFFSET  
        0 ROWS 
    FETCH NEXT  
        10 ROWS ONLY; 
END;
GO