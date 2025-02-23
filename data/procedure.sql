-- 1. Procedure to user
IF OBJECT_ID('create_user', 'P') IS NOT NULL DROP PROCEDURE create_user;
GO

CREATE PROCEDURE create_user
    @UserName varchar(50),
    @Email varchar(255),
    @FullName varchar(255),
    @Role nvarchar(255)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF NOT EXISTS (SELECT 1 FROM [User] WHERE UserName = @UserName)
        BEGIN
            INSERT INTO [User] (UserName, Email, FullName, Role, CreatedTime)
            VALUES (@UserName, @Email, @FullName, @Role, GETDATE());
            PRINT 'User created successfully.';
        END
        ELSE
        BEGIN
            PRINT 'User already exists.';
        END;
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while creating user.';
        PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO

IF OBJECT_ID('update_user', 'P') IS NOT NULL DROP PROCEDURE update_user;
GO

CREATE PROCEDURE update_user
    @UserID int,
    @UserName varchar(50),
    @Email varchar(255),
    @FullName varchar(255),
    @Role nvarchar(255)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM [User] WHERE UserID = @UserID)
        BEGIN
            UPDATE [User]
            SET UserName = @UserName,
                Email = @Email,
                FullName = @FullName,
                Role = @Role,
                UpdateTime = GETDATE()
            WHERE UserID = @UserID;
            PRINT 'User updated successfully.';
        END
        ELSE
        BEGIN
            PRINT 'User not found.';
        END;
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while updating user.';
        PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO

IF OBJECT_ID('delete_user', 'P') IS NOT NULL DROP PROCEDURE delete_user;
GO

CREATE PROCEDURE delete_user
    @UserID int
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM [User] WHERE UserID = @UserID)
        BEGIN
            DELETE FROM [User] WHERE UserID = @UserID;
            PRINT 'User deleted successfully.';
        END
        ELSE
        BEGIN
            PRINT 'User not found.';
        END;
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while deleting user.';
        PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO

-- 2. Procedure to Course
IF OBJECT_ID('create_course', 'P') IS NOT NULL DROP PROCEDURE create_course;
GO

CREATE PROCEDURE create_course
    @Title varchar(255),
    @Topic varchar(100),
    @Description nvarchar(max),
    @Image varchar(200),
    @Price float,
    @InstructorID int
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        INSERT INTO [Course] (Title, Topic, Description, Image, Price, CreateTime, InstructorID)
        VALUES (@Title, @Topic, @Description, @Image, @Price, GETDATE(), @InstructorID);
        PRINT 'Course created successfully.';
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while creating course.';
        PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO

IF OBJECT_ID('update_course', 'P') IS NOT NULL DROP PROCEDURE update_course;
GO

CREATE PROCEDURE update_course
    @CourseID int,
    @Title varchar(255),
    @Topic varchar(100),
    @Description nvarchar(max),
    @Image varchar(200),
    @Price float,
    @InstructorID int
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM [Course] WHERE CourseID = @CourseID)
        BEGIN
            UPDATE [Course]
            SET Title = @Title,
                Topic = @Topic,
                Description = @Description,
                Image = @Image,
                Price = @Price,
                InstructorID = @InstructorID
            WHERE CourseID = @CourseID;
            PRINT 'Course updated successfully.';
        END
        ELSE
        BEGIN
            PRINT 'Course not found.';
        END;
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while updating course.';
        PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO

IF OBJECT_ID('delete_course', 'P') IS NOT NULL DROP PROCEDURE delete_course;
GO

CREATE PROCEDURE delete_course
    @CourseID int
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM [Course] WHERE CourseID = @CourseID)
        BEGIN
            DELETE FROM [Course] WHERE CourseID = @CourseID;
            PRINT 'Course deleted successfully.';
        END
        ELSE
        BEGIN
            PRINT 'Course not found.';
        END;
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while deleting course.';
        PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO

-- 3. Procedures for Review

IF OBJECT_ID('create_review', 'P') IS NOT NULL DROP PROCEDURE create_review;
GO

CREATE PROCEDURE create_review
    @Comment nvarchar(250),
    @Rating float,
    @StudentID int,
    @CourseID int
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        INSERT INTO [Review] (Comment, Rating, CreatedDate, StudentID, CourseID)
        VALUES (@Comment, @Rating, GETDATE(), @StudentID, @CourseID);
        PRINT 'Review created successfully.';
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while creating review.';
        PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO

IF OBJECT_ID('update_review', 'P') IS NOT NULL DROP PROCEDURE update_review;
GO

CREATE PROCEDURE update_review
    @ReviewID int,
    @Comment nvarchar(250),
    @Rating float
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM [Review] WHERE ReviewID = @ReviewID)
        BEGIN
            UPDATE [Review]
            SET Comment = @Comment,
                Rating = @Rating
            WHERE ReviewID = @ReviewID;
            PRINT 'Review updated successfully.';
        END
        ELSE
        BEGIN
            PRINT 'Review not found.';
        END;
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while updating review.';
        PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO

IF OBJECT_ID('delete_review', 'P') IS NOT NULL DROP PROCEDURE delete_review;
GO

CREATE PROCEDURE delete_review
    @ReviewID int
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM [Review] WHERE ReviewID = @ReviewID)
        BEGIN
            DELETE FROM [Review] WHERE ReviewID = @ReviewID;
            PRINT 'Review deleted successfully.';
        END
        ELSE
        BEGIN
            PRINT 'Review not found.';
        END;
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while deleting review.';
        PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO

-- 4. Procedures for Notify

IF OBJECT_ID('create_notify', 'P') IS NOT NULL DROP PROCEDURE create_notify;
GO

CREATE PROCEDURE create_notify
    @MessageNotify nvarchar(500),
    @StatusNotify nvarchar(255),
    @ReceiveUserID int
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        INSERT INTO [Notify] (CreatedDate, MessageNotify, StatusNotify, ReceiveUserID)
        VALUES (GETDATE(), @MessageNotify, @StatusNotify, @ReceiveUserID);
        PRINT 'Notify created successfully.';
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while creating notify.';
        PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO

IF OBJECT_ID('update_notify', 'P') IS NOT NULL DROP PROCEDURE update_notify;
GO

CREATE PROCEDURE update_notify
    @NotifyID int,
    @MessageNotify nvarchar(500),
    @StatusNotify nvarchar(255)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM [Notify] WHERE NotifyID = @NotifyID)
        BEGIN
            UPDATE [Notify]
            SET MessageNotify = @MessageNotify,
                StatusNotify = @StatusNotify
            WHERE NotifyID = @NotifyID;
            PRINT 'Notify updated successfully.';
        END
        ELSE
        BEGIN
            PRINT 'Notify not found.';
        END;
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while updating notify.';
        PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO

IF OBJECT_ID('delete_notify', 'P') IS NOT NULL DROP PROCEDURE delete_notify;
GO

CREATE PROCEDURE delete_notify
    @NotifyID int
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM [Notify] WHERE NotifyID = @NotifyID)
        BEGIN
            DELETE FROM [Notify] WHERE NotifyID = @NotifyID;
            PRINT 'Notify deleted successfully.';
        END
        ELSE
        BEGIN
            PRINT 'Notify not found.';
        END;
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while deleting notify.';
        PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO

-- 5. Procedures for ForumMessage

IF OBJECT_ID('create_forum_message', 'P') IS NOT NULL DROP PROCEDURE create_forum_message;
GO

CREATE PROCEDURE create_forum_message
    @Content nvarchar(max),
    @CourseID int,
    @UserID int
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        INSERT INTO [ForumMessage] (Content, CreateAt, CourseID, UserID)
        VALUES (@Content, GETDATE(), @CourseID, @UserID);
        PRINT 'Forum message created successfully.';
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while creating forum message.';
        PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO

IF OBJECT_ID('update_forum_message', 'P') IS NOT NULL DROP PROCEDURE update_forum_message;
GO

CREATE PROCEDURE update_forum_message
    @ForumMessageID int,
    @Content nvarchar(max)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM [ForumMessage] WHERE ForumMessageID = @ForumMessageID)
        BEGIN
            UPDATE [ForumMessage]
            SET Content = @Content
            WHERE ForumMessageID = @ForumMessageID;
            PRINT 'Forum message updated successfully.';
        END
        ELSE
        BEGIN
            PRINT 'Forum message not found.';
        END;
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while updating forum message.';
        PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO

IF OBJECT_ID('delete_forum_message', 'P') IS NOT NULL DROP PROCEDURE delete_forum_message;
GO

CREATE PROCEDURE delete_forum_message
    @ForumMessageID int
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM [ForumMessage] WHERE ForumMessageID = @ForumMessageID)
        BEGIN
            DELETE FROM [ForumMessage] WHERE ForumMessageID = @ForumMessageID;
            PRINT 'Forum message deleted successfully.';
        END
        ELSE
        BEGIN
            PRINT 'Forum message not found.';
        END;
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while deleting forum message.';
        PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO


-- 6. Procedures for LessonVideo and LessonDocument and delete Lessons

-- Procedure: create_lesson_video
IF OBJECT_ID('create_lesson_video', 'P') IS NOT NULL DROP PROCEDURE create_lesson_video;
GO

CREATE PROCEDURE create_lesson_video
    @Title varchar(255),
    @Duration int,
    @ComplexityLevel nvarchar(255),
    @LessonType nvarchar(255),
    @Ordinal int,
    @CourseID int,
    @URL varchar(255)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @LessonID int;
    BEGIN TRY
        INSERT INTO [Lessons] (Title, Duration, ComplexityLevel, CreatedTime, LessonType, Ordinal, CourseID)
        VALUES (@Title, @Duration, @ComplexityLevel, GETDATE(), @LessonType, @Ordinal, @CourseID);
        SET @LessonID = SCOPE_IDENTITY();
        
        INSERT INTO [LessonVideo] (URL, LessonID)
        VALUES (@URL, @LessonID);
        
        PRINT 'Lesson and LessonVideo created successfully.';
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while creating LessonVideo.';
        PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO

-- Procedure: update_lesson_video
IF OBJECT_ID('update_lesson_video', 'P') IS NOT NULL DROP PROCEDURE update_lesson_video;
GO

CREATE PROCEDURE update_lesson_video
    @LessonVideoID int,
    @URL varchar(255)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM [LessonVideo] WHERE LessonVideoID = @LessonVideoID)
        BEGIN
            UPDATE [LessonVideo]
            SET URL = @URL
            WHERE LessonVideoID = @LessonVideoID;
            PRINT 'LessonVideo updated successfully.';
        END
        ELSE
        BEGIN
            PRINT 'LessonVideo not found.';
        END;
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while updating LessonVideo.';
        PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO

-- Procedure: create_lesson_document
IF OBJECT_ID('create_lesson_document', 'P') IS NOT NULL DROP PROCEDURE create_lesson_document;
GO

CREATE PROCEDURE create_lesson_document
    @Title varchar(255),
    @Duration int,
    @ComplexityLevel nvarchar(255),
    @LessonType nvarchar(255),
    @Ordinal int,
    @DocumentContent nvarchar(max),
    @CourseID int
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @LessonID int;
    BEGIN TRY
        INSERT INTO [Lessons] (Title, Duration, ComplexityLevel, CreatedTime, LessonType, Ordinal, CourseID)
        VALUES (@Title, @Duration, @ComplexityLevel, GETDATE(), @LessonType, @Ordinal, @CourseID);
        SET @LessonID = SCOPE_IDENTITY();
        
        INSERT INTO [LessonDocument] (LessonID, Content)
        VALUES (@LessonID, @DocumentContent);
        
        PRINT 'Lesson and LessonDocument created successfully.';
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while creating LessonDocument.';
        PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO

-- Procedure: update_lesson_document
IF OBJECT_ID('update_lesson_document', 'P') IS NOT NULL DROP PROCEDURE update_lesson_document;
GO

CREATE PROCEDURE update_lesson_document
    @LessonDocumentID int,
    @DocumentContent nvarchar(max)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM [LessonDocument] WHERE LessonDocumentID = @LessonDocumentID)
        BEGIN
            UPDATE [LessonDocument]
            SET Content = @DocumentContent
            WHERE LessonDocumentID = @LessonDocumentID;
            PRINT 'LessonDocument updated successfully.';
        END
        ELSE
        BEGIN
            PRINT 'LessonDocument not found.';
        END;
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while updating LessonDocument.';
        PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO

-- Procedure: delete_lesson
IF OBJECT_ID('delete_lesson', 'P') IS NOT NULL DROP PROCEDURE delete_lesson;
GO

CREATE PROCEDURE delete_lesson
    @LessonID int
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        -- Delete associated LessonVideo and LessonDocument
        DELETE FROM [LessonVideo] WHERE LessonID = @LessonID;
        DELETE FROM [LessonDocument] WHERE LessonID = @LessonID;
        
        IF EXISTS (SELECT 1 FROM [Lessons] WHERE LessonID = @LessonID)
        BEGIN
            DELETE FROM [Lessons] WHERE LessonID = @LessonID;
            PRINT 'Lesson and its associated LessonVideo and LessonDocument deleted successfully.';
        END
        ELSE
        BEGIN
            PRINT 'Lesson not found.';
        END;
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while deleting lesson.';
        PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO

-- Procedure: update_lesson
IF OBJECT_ID('update_lesson', 'P') IS NOT NULL DROP PROCEDURE update_lesson;
GO

CREATE PROCEDURE update_lesson
    @LessonID int,
    @Title varchar(255),
    @Duration int,
    @ComplexityLevel nvarchar(255),
    @LessonType nvarchar(255),
    @Ordinal int,
    @CourseID int
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
         IF EXISTS (SELECT 1 FROM [Lessons] WHERE LessonID = @LessonID)
         BEGIN
             UPDATE [Lessons]
             SET Title = @Title,
                 Duration = @Duration,
                 ComplexityLevel = @ComplexityLevel,
                 LessonType = @LessonType,
                 Ordinal = @Ordinal,
                 CourseID = @CourseID,
                 UpdatedTime = GETDATE()
             WHERE LessonID = @LessonID;
             PRINT 'Lesson updated successfully.';
         END
         ELSE
         BEGIN
             PRINT 'Lesson not found.';
         END;
    END TRY
    BEGIN CATCH
         PRINT 'Error occurred while updating lesson.';
         PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO

-- 7. Procedures for Invoice

IF OBJECT_ID('create_invoice', 'P') IS NOT NULL DROP PROCEDURE create_invoice;
GO

CREATE PROCEDURE create_invoice
    @TotalAmount float,
    @InvoiceStatus nvarchar(255),
    @StudentID int
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        INSERT INTO [Invoice] (InvoiceDate, TotalAmount, InvoiceStatus, StudentID)
        VALUES (GETDATE(), @TotalAmount, @InvoiceStatus, @StudentID);
        PRINT 'Invoice created successfully.';
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while creating invoice.';
        PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO

IF OBJECT_ID('update_invoice', 'P') IS NOT NULL DROP PROCEDURE update_invoice;
GO

CREATE PROCEDURE update_invoice
    @InvoiceID int,
    @TotalAmount float,
    @InvoiceStatus nvarchar(255),
    @StudentID int
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM [Invoice] WHERE InvoiceID = @InvoiceID)
        BEGIN
            UPDATE [Invoice]
            SET TotalAmount = @TotalAmount,
                InvoiceStatus = @InvoiceStatus,
                StudentID = @StudentID
            WHERE InvoiceID = @InvoiceID;
            PRINT 'Invoice updated successfully.';
        END
        ELSE
        BEGIN
            PRINT 'Invoice not found.';
        END;
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while updating invoice.';
        PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO

IF OBJECT_ID('delete_invoice', 'P') IS NOT NULL DROP PROCEDURE delete_invoice;
GO

CREATE PROCEDURE delete_invoice
    @InvoiceID int
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM [Invoice] WHERE InvoiceID = @InvoiceID)
        BEGIN
            DELETE FROM [Invoice] WHERE InvoiceID = @InvoiceID;
            PRINT 'Invoice deleted successfully.';
        END
        ELSE
        BEGIN
            PRINT 'Invoice not found.';
        END;
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while deleting invoice.';
        PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO

-- Procedures for InvoiceDetail

IF OBJECT_ID('create_invoice_detail', 'P') IS NOT NULL DROP PROCEDURE create_invoice_detail;
GO

CREATE PROCEDURE create_invoice_detail
    @Price float,
    @InvoiceID int,
    @CourseID int
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        INSERT INTO [InvoiceDetail] (Price, InvoiceID, CourseID)
        VALUES (@Price, @InvoiceID, @CourseID);
        PRINT 'InvoiceDetail created successfully.';
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while creating invoice detail.';
        PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO

IF OBJECT_ID('update_invoice_detail', 'P') IS NOT NULL DROP PROCEDURE update_invoice_detail;
GO

CREATE PROCEDURE update_invoice_detail
    @InvoiceDetailID int,
    @Price float,
    @InvoiceID int,
    @CourseID int
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM [InvoiceDetail] WHERE InvoiceDetailID = @InvoiceDetailID)
        BEGIN
            UPDATE [InvoiceDetail]
            SET Price = @Price,
                InvoiceID = @InvoiceID,
                CourseID = @CourseID
            WHERE InvoiceDetailID = @InvoiceDetailID;
            PRINT 'InvoiceDetail updated successfully.';
        END
        ELSE
        BEGIN
            PRINT 'InvoiceDetail not found.';
        END;
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while updating invoice detail.';
        PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO

IF OBJECT_ID('delete_invoice_detail', 'P') IS NOT NULL DROP PROCEDURE delete_invoice_detail;
GO

CREATE PROCEDURE delete_invoice_detail
    @InvoiceDetailID int
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM [InvoiceDetail] WHERE InvoiceDetailID = @InvoiceDetailID)
        BEGIN
            DELETE FROM [InvoiceDetail] WHERE InvoiceDetailID = @InvoiceDetailID;
            PRINT 'InvoiceDetail deleted successfully.';
        END
        ELSE
        BEGIN
            PRINT 'InvoiceDetail not found.';
        END;
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while deleting invoice detail.';
        PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO

-- Procedures for LearnProgress

IF OBJECT_ID('create_learn_progress', 'P') IS NOT NULL DROP PROCEDURE create_learn_progress;
GO

CREATE PROCEDURE create_learn_progress
    @StudentID int,
    @LessonID int,
    @ProcessStatus nvarchar(255),
    @StartTime datetime = NULL,
    @CompletionTime datetime = NULL
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        INSERT INTO [LearnProgress] (StudentID, LessonID, ProcessStatus, StartTime, CompletionTime)
        VALUES (@StudentID, @LessonID, @ProcessStatus, ISNULL(@StartTime, GETDATE()), @CompletionTime);
        PRINT 'LearnProgress created successfully.';
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while creating learn progress.';
        PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO

IF OBJECT_ID('update_learn_progress', 'P') IS NOT NULL DROP PROCEDURE update_learn_progress;
GO

CREATE PROCEDURE update_learn_progress
    @ProgressID int,
    @ProcessStatus nvarchar(255),
    @StartTime datetime = NULL,
    @CompletionTime datetime = NULL
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM [LearnProgress] WHERE ProgressID = @ProgressID)
        BEGIN
            UPDATE [LearnProgress]
            SET ProcessStatus = @ProcessStatus,
                StartTime = ISNULL(@StartTime, StartTime),
                CompletionTime = ISNULL(@CompletionTime, CompletionTime)
            WHERE ProgressID = @ProgressID;
            PRINT 'LearnProgress updated successfully.';
        END
        ELSE
        BEGIN
            PRINT 'LearnProgress record not found.';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while updating learn progress.';
        PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO

IF OBJECT_ID('delete_learn_progress', 'P') IS NOT NULL DROP PROCEDURE delete_learn_progress;
GO

CREATE PROCEDURE delete_learn_progress
    @ProgressID int
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        IF EXISTS (SELECT 1 FROM [LearnProgress] WHERE ProgressID = @ProgressID)
        BEGIN
            DELETE FROM [LearnProgress] WHERE ProgressID = @ProgressID;
            PRINT 'LearnProgress deleted successfully.';
        END
        ELSE
        BEGIN
            PRINT 'LearnProgress record not found.';
        END
    END TRY
    BEGIN CATCH
        PRINT 'Error occurred while deleting learn progress.';
        PRINT ERROR_MESSAGE();
    END CATCH;
END;
GO