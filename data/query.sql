IF OBJECT_ID('get_lesson_by_course_id', 'P') IS NOT NULL 
    DROP PROCEDURE get_lesson_by_course_id;
GO

CREATE PROCEDURE get_lesson_by_course_id
    @CourseID int
AS
BEGIN
    SELECT 
        l.LessonID,
        l.Title AS LessonTitle,
        ld.LessonDocumentID,
        ld.Content AS DocumentContent,
        lv.LessonVideoID,
        lv.URL AS VideoURL
    FROM Lessons l
    LEFT JOIN LessonDocument ld ON l.LessonID = ld.LessonID
    LEFT JOIN LessonVideo lv ON l.LessonID = lv.LessonID
    WHERE l.CourseID = @CourseID
    ORDER BY l.LessonID;
END
GO


SELECT * FROM Course WHERE CourseID = 1