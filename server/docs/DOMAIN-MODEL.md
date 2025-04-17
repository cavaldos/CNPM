# Domain Model Documentation

This document provides a comprehensive overview of the domain model used in our learning platform application. The system is built using Domain-Driven Design (DDD) principles, with a clear separation of concerns and a focus on the core business domains.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Domain Modules](#domain-modules)
   - [Course Module](#course-module)
   - [Lesson Module](#lesson-module)
   - [Enrollment Module](#enrollment-module)
   - [Learning Module](#learning-module)
   - [Statistics Module](#statistics-module)
   - [AI Module](#ai-module)
   - [AutoComplete Module](#autocomplete-module)
3. [Domain Relationships](#domain-relationships)
4. [Authentication and User Management](#authentication-and-user-management)
5. [Data Transfer Objects (DTOs)](#data-transfer-objects-dtos)

## Architecture Overview

The application follows a modular architecture based on Domain-Driven Design principles. Each module is self-contained with its own domain models, repositories, services, and controllers.

### Module Structure

Each module follows a consistent structure:

```
module/
├── domain/                 # Domain layer
│   ├── entity.ts           # Domain entities and value objects
│   ├── service.ts          # Domain services
│   └── factories/          # Factory classes for entity creation
├── repositories/           # Data access layer
│   ├── interface/          # Repository interfaces
│   └── Implement/          # Repository implementations
├── controllers/            # Presentation layer
├── routes/                 # API routes
├── dto/                    # Data Transfer Objects
└── index.ts                # Module exports
```

## Domain Modules

### Course Module

The Course module manages all aspects of courses in the learning platform.

#### Domain Entities and Value Objects

- **Course**: Main entity representing a course
  - Properties: id, title, topic, description, image, price, instructorID, createTime, updateTime, isHidden
  - Additional properties: instructorName, reviewCount, lessonCount, averageRating
  - Methods: toDTO()

- **Value Objects**:
  - **CourseTitle**: Ensures course titles meet business rules (non-empty, max 100 chars)
  - **CourseDescription**: Validates course descriptions (non-empty)
  - **CoursePrice**: Validates course pricing

- **Domain Events**:
  - CourseCreatedEvent
  - CourseUpdatedEvent
  - CourseDeletedEvent

#### Domain Services

- **CourseService**: Implements business logic for courses
  - createCourse(courseData): Creates a new course
  - updateCourse(courseID, courseData): Updates an existing course
  - deleteCourse(courseID): Deletes a course
  - getCourseById(courseID): Retrieves a course by ID
  - getAllCourses(): Retrieves all courses
  - searchCourses(query): Searches for courses

### Lesson Module

The Lesson module manages the content within courses.

#### Domain Entities and Value Objects

- **Lesson**: Entity representing a lesson within a course
  - Properties: id, title, duration, complexityLevel, lessonType, ordinal, courseID, createdTime, updatedTime
  - Additional properties based on type: content (for documents), url (for videos), resourceID
  - Methods: isVideo(), isDocument(), toDTO()

- **Value Objects**:
  - **LessonTitle**: Validates lesson titles (non-empty, max 100 chars)
  - **LessonComplexity**: Validates complexity levels (Beginner, Intermediate, Advanced)
  - **LessonType**: Validates lesson types (Video, Document)

- **Domain Events**:
  - LessonCreatedEvent
  - LessonUpdatedEvent
  - LessonDeletedEvent

#### Domain Services

- **LessonService**: Implements business logic for lessons
  - createVideoLesson(lessonData): Creates a video lesson
  - createDocumentLesson(lessonData): Creates a document lesson
  - updateLesson(lessonID, lessonData): Updates a lesson
  - deleteLesson(lessonID): Deletes a lesson
  - getLessonsByCourseid(courseID): Gets all lessons for a course

### Enrollment Module

The Enrollment module manages student enrollments in courses.

#### Domain Entities and Value Objects

- **Enrollment**: Entity representing a student's enrollment in a course
  - Properties: enrollmentID, studentID, courseID, enrollmentStatus, enrollDate, completionDate
  - Additional properties: studentName, courseName, courseImage, courseTopic
  - Methods: isCompleted(), isEnrolled(), isDropped(), complete(), drop(), updateStatus(), toDTO()

- **Value Objects**:
  - **EnrollmentStatus**: Validates enrollment status (Enrolled, Completed, Dropped)

- **Domain Events**:
  - EnrollmentCreatedEvent
  - EnrollmentUpdatedEvent
  - EnrollmentDeletedEvent
  - EnrollmentCompletedEvent

#### Domain Services

- **EnrollmentService**: Implements business logic for enrollments
  - createEnrollment(data): Enrolls a student in a course
  - updateEnrollmentStatus(data): Updates enrollment status
  - deleteEnrollment(enrollmentID): Deletes an enrollment
  - getAllEnrollmentsByStudent(studentID): Gets all enrollments for a student
  - checkEnrollment(studentID, courseID): Checks if a student is enrolled in a course
  - completeEnrollment(enrollmentID): Marks an enrollment as completed

### Learning Module

The Learning module tracks student progress through course lessons.

#### Domain Entities and Value Objects

- **LearningProgress**: Entity representing a student's progress in a lesson
  - Properties: progressID, studentID, lessonID, processStatus, startTime, completionTime
  - Additional properties: studentName, lessonName, courseName, percentageComplete
  - Methods: isCompleted(), isInProgress(), updateStatus(), complete(), toDTO()

- **Value Objects**:
  - **ProcessStatus**: Validates learning process status (NotStarted, InProcess, Done)

- **Domain Events**:
  - LearningProgressCreatedEvent
  - LearningProgressUpdatedEvent
  - LearningProgressCompletedEvent

#### Domain Services

- **LearningService**: Implements business logic for learning progress
  - startLearningProgress(data): Starts tracking progress for a lesson
  - updateLearningProgress(data): Updates progress status
  - completeLearningProgress(progressID): Marks a lesson as completed
  - getLearningProgressByStudent(studentID): Gets all progress for a student
  - getLearningProgressByLesson(lessonID): Gets all progress for a lesson

### Statistics Module

The Statistics module provides analytics and reporting for the platform.

#### Domain Entities and DTOs

- **RevenueStatisticsDTO**: Data structure for revenue statistics
  - Properties: totalRevenue, monthlyGrowth, averageOrderValue, conversionRate, monthlyRevenue, courseRevenue, trendingKeywords

- **KeywordTrendDTO**: Data structure for trending search keywords
  - Properties: term, count

- **MonthlyRevenueDTO**: Data structure for monthly revenue data
  - Properties: month, revenue, expenses

- **CourseRevenueDTO**: Data structure for course category revenue
  - Properties: category, revenue, enrollments

#### Domain Services

- **StatisticsService**: Implements business logic for statistics
  - getRevenueStatistics(): Gets revenue statistics
  - getTrendingKeywords(): Gets trending search keywords

### AI Module

The AI module provides integration with AI services.

#### Domain Entities

- **AIMessage**: Entity representing a message exchange with AI
  - Properties: userMessage, aiResponse

#### Domain Services

- **AIService**: Implements business logic for AI interactions
  - chatWithGroq(message): Sends a message to the Groq AI service
  - getHelloWorld(): Gets a test message from GraphQL
  - getUserById(id): Gets a user by ID from GraphQL
  - getAllUsers(): Gets all users from GraphQL

### AutoComplete Module

The AutoComplete module provides search suggestions and manages search history.

#### Domain Services

- Manages search history and provides autocomplete suggestions for the search functionality

## Domain Relationships

The domain model has several key relationships:

1. **Course-Lesson**: One-to-many relationship
   - A Course contains multiple Lessons
   - Each Lesson belongs to exactly one Course

2. **Student-Enrollment-Course**: Many-to-many relationship
   - A Student can be enrolled in multiple Courses (via Enrollments)
   - A Course can have multiple Students enrolled (via Enrollments)

3. **Student-LearningProgress-Lesson**: Many-to-many relationship
   - A Student can have progress in multiple Lessons
   - A Lesson can have progress records for multiple Students

4. **Course-Statistics**: One-to-many relationship
   - Courses generate revenue statistics
   - Statistics aggregate data from multiple Courses

## Authentication and User Management

The application uses Firebase Authentication for user management:

- **User**: Entity representing a user in the system
  - Properties: uid, email, displayName, photoURL, role
  - Roles: Admin, Instructor, Student

- **Authentication Flow**:
  1. Users sign in with Google via Firebase Authentication
  2. The server verifies the Firebase ID token
  3. User information is stored in the application database
  4. A role is assigned to the user (Admin, Instructor, or Student)

## Data Transfer Objects (DTOs)

DTOs are used to transfer data between the domain layer and the presentation layer:

- **CourseDTO**: Represents course data for API responses
- **LessonDTO**: Represents lesson data for API responses
- **EnrollmentDTO**: Represents enrollment data for API responses
- **LearningProgressDTO**: Represents learning progress data for API responses
- **RevenueStatisticsDTO**: Represents revenue statistics for API responses
- **KeywordTrendDTO**: Represents trending keywords for API responses

Each domain entity has a `toDTO()` method that converts the entity to a DTO for API responses.

---

This domain model documentation provides a high-level overview of the application's core domains and their relationships. For more detailed information about specific modules, please refer to the code documentation in each module's directory.
