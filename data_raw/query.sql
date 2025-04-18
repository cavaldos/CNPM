SELECT
    c.*,
    u.FullName as InstructorName,
    (
        SELECT COUNT(*)
        FROM Review r
        WHERE
            r.CourseID = c.CourseID
    ) as ReviewCount,
    (
        SELECT COUNT(*)
        FROM Lessons l
        WHERE
            l.CourseID = c.CourseID
    ) as LessonCount,
    (
        SELECT AVG(r.Rating)
        FROM Review r
        WHERE
            r.CourseID = c.CourseID
    ) as AvgRating (
        SELECT COUNT(*)
        FROM u
        WHERE
            u.UserID = c.InstructorID
    ) as InstructorCount
FROM Course c
    INNER JOIN [User] u ON c.InstructorID = u.UserID
WHERE
    c.InstructorID = @InstructorID
ORDER BY c.CreateTime DESC


--  lấy ra danh sách những học sinh có trong 1 khoá học

