CREATE TABLE [Lessons] (
    [LessonID] integer PRIMARY KEY IDENTITY(1, 1),
    [Title] varchar(255),
    [Duration] integer,
    [ComplexityLevel] nvarchar(255) NOT NULL CHECK (
        [ComplexityLevel] IN ('Easy', 'Medium', 'Hard')
    ),
    [CreatedTime] datetime,
    [UpdatedTime] datetime,
    [LessonType] nvarchar(255),
    [Ordinal] integer,
    [CourseID] integer
) GO

CREATE TABLE [LessonVideo] (
    [LessonVideoID] integer PRIMARY KEY IDENTITY(1, 1),
    [URL] varchar(255),
    [LessonID] integer UNIQUE
) GO

CREATE TABLE [LessonDocument] (
    [LessonDocumentID] integer PRIMARY KEY IDENTITY(1, 1),
    [LessonID] integer UNIQUE,
    [Content] nvarchar(max)
) GO

CREATE TABLE [User] (
    [UserID] integer PRIMARY KEY IDENTITY(1, 1),
    [UserName] varchar(50) UNIQUE,
    [Email] varchar(255),
    [FullName] varchar(255),
    [Role] nvarchar(255) NOT NULL CHECK (
        [Role] IN (
            'Student',
            'Instructor',
            'Admin'
        )
    ),
    [CreatedTime] datetime,
    [UpdateTime] datetime
) GO

CREATE TABLE [Profile] (
    [ProfileID] integer PRIMARY KEY IDENTITY(1, 1),
    [AvataURL] varchar(500),
    [Education] varchar(200),
    [Certification] varchar(200),
    [UserID] integer
) GO

CREATE TABLE [UserAuthProvider] (
    [AuthProviderID] integer PRIMARY KEY IDENTITY(1, 1),
    [UserID] integer NOT NULL,
    [ProviderName] varchar(20) NOT NULL,
    [ProviderUserID] varchar(255) NOT NULL,
    [AccessToken] varchar(512),
    [RefreshToken] varchar(512),
    [ExpiryDate] datetime,
    [CreatedTime] datetime
) GO

CREATE TABLE [Course] (
    [CourseID] integer PRIMARY KEY IDENTITY(1, 1),
    [Title] varchar(255),
    [Topic] varchar(100),
    [Description] nvarchar(max),
    [Image] varchar(200),
    [Price] float,
    [CreateTime] datetime,
    [IsHidden] bit,
    [InstructorID] integer
) GO

CREATE TABLE [Review] (
    [ReviewID] integer PRIMARY KEY IDENTITY(1, 1),
    [Comment] nvarchar(250) NOT NULL,
    [Rating] float NOT NULL,
    [CreatedDate] datetime,
    [StudentID] integer,
    [CourseID] integer
) GO

CREATE TABLE [Notify] (
    [NotifyID] integer PRIMARY KEY IDENTITY(1, 1),
    [CreatedDate] datetime NOT NULL,
    [MessageNotify] nvarchar(500),
    [StatusNotify] nvarchar(255) NOT NULL CHECK (
        [StatusNotify] IN ('Read', 'UnRead')
    ),
    [ReceiveUserID] integer NOT NULL
) GO

CREATE TABLE [Enrollment] (
    [EnrollmentID] integer PRIMARY KEY IDENTITY(1, 1),
    [StudentID] integer NOT NULL,
    [CourseID] integer NOT NULL,
    [EnrollmentStatus] nvarchar(255) NOT NULL CHECK (
        [EnrollmentStatus] IN (
            'Enrolled',
            'Completed',
            'Dropped'
        )
    ),
    [EnrollDate] datetime
) GO

CREATE TABLE [LearnProgress] (
    [ProgressID] integer PRIMARY KEY IDENTITY(1, 1),
    [StudentID] integer NOT NULL,
    [LessonID] integer NOT NULL,
    [ProcessStatus] nvarchar(255) NOT NULL CHECK (
        [ProcessStatus] IN (
            'NotStarted',
            'InProcess',
            'Done'
        )
    ),
    [StartTime] datetime,
    [CompletionTime] datetime
) GO

CREATE TABLE [ForumMessage] (
    [ForumMessageID] integer PRIMARY KEY IDENTITY(1, 1),
    [Content] nvarchar(max),
    [CreateAt] datetime,
    [CourseID] integer,
    [UserID] integer
) GO

ALTER TABLE [Lessons]
ADD FOREIGN KEY ([CourseID]) REFERENCES [Course] ([CourseID]) GO

ALTER TABLE [LessonVideo]
ADD FOREIGN KEY ([LessonID]) REFERENCES [Lessons] ([LessonID]) GO

ALTER TABLE [LessonDocument]
ADD FOREIGN KEY ([LessonID]) REFERENCES [Lessons] ([LessonID]) GO

ALTER TABLE [Profile]
ADD FOREIGN KEY ([UserID]) REFERENCES [User] ([UserID]) GO

ALTER TABLE [UserAuthProvider]
ADD FOREIGN KEY ([UserID]) REFERENCES [User] ([UserID]) GO

ALTER TABLE [Course]
ADD FOREIGN KEY ([InstructorID]) REFERENCES [User] ([UserID]) GO

ALTER TABLE [Review]
ADD FOREIGN KEY ([StudentID]) REFERENCES [User] ([UserID]) GO

ALTER TABLE [Review]
ADD FOREIGN KEY ([CourseID]) REFERENCES [Course] ([CourseID]) GO

ALTER TABLE [Notify]
ADD FOREIGN KEY ([ReceiveUserID]) REFERENCES [User] ([UserID]) GO

ALTER TABLE [Enrollment]
ADD FOREIGN KEY ([StudentID]) REFERENCES [User] ([UserID]) GO

ALTER TABLE [Enrollment]
ADD FOREIGN KEY ([CourseID]) REFERENCES [Course] ([CourseID]) GO

ALTER TABLE [LearnProgress]
ADD FOREIGN KEY ([StudentID]) REFERENCES [User] ([UserID]) GO

ALTER TABLE [LearnProgress]
ADD FOREIGN KEY ([LessonID]) REFERENCES [Lessons] ([LessonID]) GO

ALTER TABLE [ForumMessage]
ADD FOREIGN KEY ([CourseID]) REFERENCES [Course] ([CourseID]) GO

ALTER TABLE [ForumMessage]
ADD FOREIGN KEY ([UserID]) REFERENCES [User] ([UserID]) GO