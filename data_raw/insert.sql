-- Mock data for User table
INSERT INTO [User] (UserName, Email, FullName, Role, CreatedTime, UpdateTime) VALUES
('john_doe', 'john.doe@example.com', 'John Doe', 'Student', GETDATE(), GETDATE()),
('jane_smith', 'jane.smith@example.com', 'Jane Smith', 'Instructor', GETDATE(), GETDATE()),
('admin_user', 'admin@example.com', 'Admin User', 'Admin', GETDATE(), GETDATE()),
('alice_brown', 'alice.brown@example.com', 'Alice Brown', 'Student', GETDATE(), GETDATE()),
('bob_jones', 'bob.jones@example.com', 'Bob Jones', 'Instructor', GETDATE(), GETDATE());

-- Mock data for Profile table
INSERT INTO [Profile] (AvataURL, Education, Certification, UserID) VALUES
('https://example.com/avatars/john.jpg', 'BS Computer Science', 'Certified Developer', 1),
('https://example.com/avatars/jane.jpg', 'MS Data Science', 'Data Science Expert', 2),
('https://example.com/avatars/admin.jpg', 'MBA', 'Certified Administrator', 3),
('https://example.com/avatars/alice.jpg', 'BA Mathematics', NULL, 4),
('https://example.com/avatars/bob.jpg', 'PhD in AI', 'AI Specialist', 5);

-- Mock data for UserAuthProvider table
INSERT INTO [UserAuthProvider] (UserID, ProviderName, ProviderUserID, AccessToken, RefreshToken, ExpiryDate, CreatedTime) VALUES
(1, 'Google', 'google_john123', 'access_token_123', 'refresh_token_123', DATEADD(DAY, 30, GETDATE()), GETDATE()),
(2, 'Google', 'google_jane456', 'access_token_456', 'refresh_token_456', DATEADD(DAY, 30, GETDATE()), GETDATE()),
(3, 'Local', 'admin_local789', 'access_token_789', NULL, NULL, GETDATE()),
(4, 'Google', 'google_alice101', 'access_token_101', 'refresh_token_101', DATEADD(DAY, 30, GETDATE()), GETDATE()),
(5, 'Google', 'google_bob202', 'access_token_202', 'refresh_token_202', DATEADD(DAY, 30, GETDATE()), GETDATE());

-- Mock data for Course table
INSERT INTO [Course] (Title, Topic, Description, Image, Price, CreateTime, IsHidden, InstructorID) VALUES
('Introduction to Python', 'Programming', 'Learn the basics of Python programming.', 'https://example.com/images/python.jpg', 49.99, GETDATE(), 0, 2),
('Advanced Machine Learning', 'Machine Learning', 'Deep dive into ML algorithms.', 'https://example.com/images/ml.jpg', 99.99, GETDATE(), 0, 5),
('Web Development with React', 'Web Development', 'Build modern web apps with React.', 'https://example.com/images/react.jpg', 79.99, GETDATE(), 0, 2),
('Data Structures', 'Computer Science', 'Master data structures and algorithms.', 'https://example.com/images/ds.jpg', 59.99, GETDATE(), 1, 5);

-- Mock data for Lessons table
INSERT INTO [Lessons] (Title, Duration, ComplexityLevel, CreatedTime, UpdatedTime, LessonType, Ordinal, CourseID) VALUES
('Python Basics', 30, 'Easy', GETDATE(), GETDATE(), 'Video', 1, 1),
('Python Functions', 45, 'Medium', GETDATE(), GETDATE(), 'Document', 2, 1),
('ML Fundamentals', 60, 'Hard', GETDATE(), GETDATE(), 'Video', 1, 2),
('Neural Networks', 90, 'Hard', GETDATE(), GETDATE(), 'Document', 2, 2),
('React Components', 40, 'Medium', GETDATE(), GETDATE(), 'Video', 1, 3),
('Stacks and Queues', 50, 'Medium', GETDATE(), GETDATE(), 'Document', 1, 4);

-- Mock data for LessonVideo table
INSERT INTO [LessonVideo] (URL, LessonID) VALUES
('https://example.com/videos/python_basics.mp4', 1),
('https://example.com/videos/ml_fundamentals.mp4', 3),
('https://example.com/videos/react_components.mp4', 5);

-- Mock data for LessonDocument table
INSERT INTO [LessonDocument] (LessonID, Content) VALUES
(2, 'This document covers Python functions, including definitions, parameters, and return values.'),
(4, 'Detailed explanation of neural networks, including architectures and training processes.'),
(6, 'Comprehensive guide to stacks and queues, with examples and applications.');

-- Mock data for Review table
INSERT INTO [Review] (Comment, Rating, CreatedDate, StudentID, CourseID) VALUES
('Great course, very clear explanations!', 4.5, GETDATE(), 1, 1),
('Challenging but rewarding!', 4.0, GETDATE(), 4, 2),
('Loved the React examples!', 5.0, GETDATE(), 1, 3),
('Good content but needs more examples.', 3.5, GETDATE(), 4, 1);

-- Mock data for Notify table
INSERT INTO [Notify] (CreatedDate, MessageNotify, StatusNotify, ReceiveUserID) VALUES
(GETDATE(), 'Your enrollment in Python course is confirmed!', 'UnRead', 1),
(GETDATE(), 'New lesson added to Machine Learning course.', 'UnRead', 4),
(GETDATE(), 'Course review submitted successfully.', 'Read', 1),
(GETDATE(), 'Welcome to the platform!', 'UnRead', 4);

-- Mock data for Enrollment table
INSERT INTO [Enrollment] (StudentID, CourseID, EnrollmentStatus, EnrollDate) VALUES
(1, 1, 'Enrolled', GETDATE()),
(1, 3, 'Enrolled', GETDATE()),
(4, 2, 'Enrolled', GETDATE()),
(4, 1, 'Completed', GETDATE());

-- Mock data for LearnProgress table
INSERT INTO [LearnProgress] (StudentID, LessonID, ProcessStatus, StartTime, CompletionTime) VALUES
(1, 1, 'InProcess', GETDATE(), NULL),
(1, 2, 'NotStarted', GETDATE(), NULL),
(4, 3, 'Done', GETDATE(), GETDATE()),
(4, 4, 'InProcess', GETDATE(), NULL),
(1, 5, 'Done', GETDATE(), GETDATE());

-- Mock data for ForumMessage table
INSERT INTO [ForumMessage] (Content, CreateAt, CourseID, UserID) VALUES
('Can someone explain list comprehensions in Python?', GETDATE(), 1, 1),
('Great discussion on neural networks, thanks!', GETDATE(), 2, 4),
('Any tips for debugging React apps?', GETDATE(), 3, 1),
('Instructor, please clarify queue implementations.', GETDATE(), 4, 4);