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

CREATE TABLE [Invoice] (
    [InvoiceID] integer PRIMARY KEY IDENTITY(1, 1),
    [InvoiceDate] datetime,
    [TotalAmount] float,
    [InvoiceStatus] nvarchar(255) NOT NULL CHECK (
        [InvoiceStatus] IN ('Paid', 'UnPaid')
    ),
    [StudentID] integer
) GO

CREATE TABLE [InvoiceDetail] (
    [InvoiceDetailID] integer PRIMARY KEY IDENTITY(1, 1),
    [Price] float,
    [InvoiceID] integer,
    [CourseID] integer
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
    ) NOT NULL,
    [StartTime] datetime,
    [CompletionTime] datetime
) GO

CREATE TABLE [ForumMessage] (
    [ForumMessageID] integer PRIMARY KEY IDENTITY(1, 1),
    [Content] nvarchar,
    [CreateAt] datetime,
    [CourseID] integer,
    [UserID] integer
) GO

CREATE UNIQUE
INDEX [UserAuthProvider_index_0] ON [UserAuthProvider] (
    "ProviderName",
    "ProviderUserID"
) GO

CREATE UNIQUE
INDEX [LearnProgress_index_1] ON [LearnProgress] ("StudentID", "LessonID") GO

ALTER TABLE [Lessons]
ADD FOREIGN KEY ([CourseID]) REFERENCES [Course] ([CourseID]) GO

ALTER TABLE [LessonVideo]
ADD FOREIGN KEY ([LessonID]) REFERENCES [Lessons] ([LessonID]) GO

ALTER TABLE [LessonDocument]
ADD FOREIGN KEY ([LessonID]) REFERENCES [Lessons] ([LessonID]) GO

ALTER TABLE [UserAuthProvider]
ADD FOREIGN KEY ([UserID]) REFERENCES [User] ([UserID]) GO

ALTER TABLE [UserAuthProvider]
ADD FOREIGN KEY ([ProviderName]) REFERENCES [UserAuthProvider] ([AuthProviderID]) GO

ALTER TABLE [Course]
ADD FOREIGN KEY ([InstructorID]) REFERENCES [User] ([UserID]) GO

ALTER TABLE [Review]
ADD FOREIGN KEY ([StudentID]) REFERENCES [User] ([UserID]) GO

ALTER TABLE [Review]
ADD FOREIGN KEY ([CourseID]) REFERENCES [Course] ([CourseID]) GO

ALTER TABLE [Notify]
ADD FOREIGN KEY ([ReceiveUserID]) REFERENCES [User] ([UserID]) GO

ALTER TABLE [Invoice]
ADD FOREIGN KEY ([StudentID]) REFERENCES [User] ([UserID]) GO

ALTER TABLE [InvoiceDetail]
ADD FOREIGN KEY ([InvoiceID]) REFERENCES [Invoice] ([InvoiceID]) GO

ALTER TABLE [InvoiceDetail]
ADD FOREIGN KEY ([CourseID]) REFERENCES [Course] ([CourseID]) GO

ALTER TABLE [LearnProgress]
ADD FOREIGN KEY ([StudentID]) REFERENCES [User] ([UserID]) GO

ALTER TABLE [LearnProgress]
ADD FOREIGN KEY ([LessonID]) REFERENCES [Lessons] ([LessonID]) GO

ALTER TABLE [ForumMessage]
ADD FOREIGN KEY ([CourseID]) REFERENCES [Course] ([CourseID]) GO

ALTER TABLE [ForumMessage]
ADD FOREIGN KEY ([UserID]) REFERENCES [User] ([UserID]) GO