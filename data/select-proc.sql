
-- Kiểm tra và xóa procedure nếu đã tồn tại
IF OBJECT_ID('get_all_course', 'P') IS NOT NULL DROP
PROCEDURE get_all_course;
GO

-- Tạo procedure mới với tham số Offset và PageSize
CREATE PROCEDURE get_all_course 
    @Offset INT,            -- Vị trí bắt đầu
    @PageSize INT           -- Số lượng bản ghi trên mỗi trang
AS 
BEGIN 
    SET NOCOUNT ON;     -- Tăng hiệu suất

    -- Query chính để lấy danh sách khóa học với phân trang
    SELECT  
        co.[CourseID],  
        co.[Title],  
        co.[Description],  
        co.[Topic],  
        co.[Image],  
        co.[CreateTime],  
        co.[IsHidden],  
        u.UserID AS InstructorID,
        u.FullName AS InstructorName,
        (SELECT AVG(CAST(r.Rating AS FLOAT)) FROM Review r WHERE r.CourseID = co.CourseID) AS AvgRating,
        (SELECT COUNT(*) FROM Enrollment e WHERE e.CourseID = co.CourseID) AS EnrollmentCount
    FROM  
        [Course] co  
    INNER JOIN  
        [User] u ON co.InstructorID = u.UserID  
    LEFT JOIN  
        [Enrollment] e ON e.CourseID = co.CourseID  
    -- WHERE  
    --     co.IsHidden = 0
    GROUP BY  
        co.[CourseID], co.[Title], co.[Description], co.[Topic], co.[Image], 
        co.[CreateTime], co.[IsHidden], u.UserID, u.FullName
    ORDER BY  
        co.CreateTime DESC 
    OFFSET  
        @Offset ROWS 
    FETCH NEXT  
        @PageSize ROWS ONLY; 

    -- Query để lấy tổng số bản ghi
    SELECT  
        COUNT(DISTINCT co.CourseID) AS TotalCount 
    FROM  
        [Course] co 
    INNER JOIN  
        [User] u ON co.InstructorID = u.UserID  
    LEFT JOIN  
        [Enrollment] e ON e.CourseID = co.CourseID  
    WHERE  
        co.IsHidden = 0;
END;
GO

-- Kiểm tra và xóa procedure nếu đã tồn tại
IF OBJECT_ID('search_course', 'P') IS NOT NULL DROP
PROCEDURE search_course;
GO

-- Tạo procedure mới với tham số SearchTerm
CREATE PROCEDURE search_course 
    @Offset INT,            -- Vị trí bắt đầu
    @PageSize INT,          -- Số lượng bản ghi trên mỗi trang
    @SearchTerm NVARCHAR(100) = NULL  -- Từ khóa tìm kiếm (mặc định là NULL)
AS 
BEGIN 
    SET NOCOUNT ON;     -- Tăng hiệu suất

    -- Query chính để lấy danh sách khóa học với phân trang và tìm kiếm
    SELECT  
        co.[CourseID],  
        co.[Title],  
        co.[Description],  
        co.[Topic],  
        co.[Image],  
        co.[CreateTime],  
        co.[IsHidden],  
        u.UserID AS InstructorID,
        u.FullName AS InstructorName,
        (SELECT AVG(CAST(r.Rating AS FLOAT)) FROM Review r WHERE r.CourseID = co.CourseID) AS AvgRating,
        (SELECT COUNT(*) FROM Enrollment e WHERE e.CourseID = co.CourseID) AS EnrollmentCount
    FROM  
        [Course] co  
    INNER JOIN  
        [User] u ON co.InstructorID = u.UserID  
    LEFT JOIN  
        [Enrollment] e ON e.CourseID = co.CourseID  
    WHERE  
        co.IsHidden = 0
        AND (@SearchTerm IS NULL OR 
             co.Title LIKE '%' + @SearchTerm + '%' OR 
             co.Description LIKE '%' + @SearchTerm + '%')  -- Tìm kiếm trong Title hoặc Description
    GROUP BY  
        co.[CourseID], co.[Title], co.[Description], co.[Topic], co.[Image], 
        co.[CreateTime], co.[IsHidden], u.UserID, u.FullName
    ORDER BY  
        co.CreateTime DESC 
    OFFSET  
        @Offset ROWS 
    FETCH NEXT  
        @PageSize ROWS ONLY; 

    -- Query để lấy tổng số bản ghi
    SELECT  
        COUNT(DISTINCT co.CourseID) AS TotalCount 
    FROM  
        [Course] co 
    INNER JOIN  
        [User] u ON co.InstructorID = u.UserID  
    LEFT JOIN  
        [Enrollment] e ON e.CourseID = co.CourseID  
    WHERE  
        co.IsHidden = 0
        AND (@SearchTerm IS NULL OR 
             co.Title LIKE '%' + @SearchTerm + '%' OR 
             co.Description LIKE '%' + @SearchTerm + '%');
END;
GO