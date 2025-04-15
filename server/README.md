# Dental Clinic Management System
## Backend Server

This is the backend server for the Dental Clinic Management System, built with Node.js, Express, and TypeScript, following Domain-Driven Design (DDD) principles.

## Project Structure

```
server/
├── src/                      # Source code
│   ├── api/                  # API layer (legacy structure)
│   │   ├── controller/       # Request handlers
│   │   ├── middleware/       # API middleware
│   │   ├── repositories/     # Data access layer
│   │   ├── routes/           # Route definitions
│   │   └── services/         # Business logic
│   ├── config/               # Configuration files
│   │   ├── DataConnect.ts    # Database connection
│   │   ├── ElasticSearch.ts  # ElasticSearch configuration
│   │   ├── RedisClient.ts    # Redis client configuration
│   │   ├── error.ts          # Error handling
│   │   ├── IP.ts             # IP address utilities
│   │   └── setup.ts          # Application setup
│   ├── middleware/           # Global middleware
│   │   └── cache.middleware.ts # Redis caching middleware
│   ├── modules/              # DDD modules
│   │   ├── ai/               # AI module
│   │   │   ├── controllers/  # AI controllers
│   │   │   ├── domain/       # AI domain models
│   │   │   ├── infrastructure/ # External service integrations
│   │   │   │   ├── graphql/  # GraphQL client
│   │   │   │   └── grpc/     # gRPC client
│   │   │   ├── services/     # AI services
│   │   │   └── ai.route.ts   # AI routes
│   │   ├── course/           # Course module
│   │   │   ├── controllers/  # Course controllers
│   │   │   ├── domain/       # Course domain models and services
│   │   │   │   └── factories/# Course factories
│   │   │   ├── infrastructure/ # Course infrastructure
│   │   │   ├── repositories/ # Course repositories
│   │   │   │   ├── Implement/# Repository implementations
│   │   │   │   └── interface/# Repository interfaces
│   │   │   └── routes/       # Course routes
│   │   ├── enrollment/       # Enrollment module
│   │   │   ├── controllers/  # Enrollment controllers
│   │   │   ├── domain/       # Enrollment domain models and services
│   │   │   │   └── factories/# Enrollment factories
│   │   │   ├── repositories/ # Enrollment repositories
│   │   │   │   ├── Implement/# Repository implementations
│   │   │   │   └── interface/# Repository interfaces
│   │   │   └── routes/       # Enrollment routes
│   │   ├── learning/         # Learning module
│   │   │   ├── controllers/  # Learning controllers
│   │   │   ├── domain/       # Learning domain models and services
│   │   │   │   └── factories/# Learning factories
│   │   │   ├── repositories/ # Learning repositories
│   │   │   │   ├── Implement/# Repository implementations
│   │   │   │   └── interface/# Repository interfaces
│   │   │   └── routes/       # Learning routes
│   │   ├── learnProgress/    # Learning progress module
│   │   │   ├── controllers/  # LearnProgress controllers
│   │   │   ├── domain/       # LearnProgress domain models and services
│   │   │   │   └── factories/# LearnProgress factories
│   │   │   ├── repositories/ # LearnProgress repositories
│   │   │   │   ├── Implement/# Repository implementations
│   │   │   │   └── interface/# Repository interfaces
│   │   │   └── routes/       # LearnProgress routes
│   │   ├── lesson/           # Lesson module
│   │   │   ├── domain/       # Lesson domain models and services
│   │   │   │   └── factories/# Lesson factories
│   │   │   └── repositories/ # Lesson repositories
│   │   │       ├── Implement/# Repository implementations
│   │   │       └── interface/# Repository interfaces
│   │   ├── statistics/       # Statistics module
│   │   │   ├── controllers/  # Statistics controllers
│   │   │   ├── domain/       # Statistics domain models and     services
│   │   │   ├── dto/          # Statistics DTOs
│   │   │   ├── repositories/ # Statistics repositories
│   │   │   │   └── Implement/# Repository implementations
│   │   │   ├── routes/       # Statistics routes
│   │   │   └── utils/        # Statistics utilities
│   │   ├── domain.route.ts   # DDD module routes integration
│   │   └── index.ts          # Module exports
│   ├── routes/               # Main route definitions
│   │   └── index.route.ts    # Main routes configuration
│   ├── utils/                # Utility functions
│   │   ├── cache.util.ts     # Caching utilities
│   ├── app.ts                # Express application setup
│   └── server.ts             # Server entry point
├── __test__/                 # Test files
│   ├── api/                  # API tests
│   │   ├── controller/       # Controller tests
│   │   └── repositories/     # Repository tests
│   ├── config/               # Configuration tests
│   └── utils/                # Utility tests
├── dist/                     # Compiled JavaScript files
├── proto/                    # Protocol buffer definitions
└── tsconfig.json             # TypeScript configuration
```

## Architecture

The backend follows a Domain-Driven Design (DDD) architecture with a modular approach:

1. **Domain Layer**: Contains business logic, entities, and value objects
2. **Application Layer**: Orchestrates the domain objects to perform tasks
3. **Infrastructure Layer**: Provides implementations for repositories and external services
4. **Presentation Layer**: Handles HTTP requests and responses

Each module is self-contained with its own domain models, repositories, services, and controllers.

### Module Structure

Each module follows a consistent structure that adheres to DDD principles. Using the Course module as an example:

#### 1. Domain Layer

**Domain Entities and Value Objects** (`domain/course.ts`):
- Core business entities (e.g., `Course`)
- Value objects (e.g., `CourseTitle`, `CourseDescription`, `CoursePrice`)
- Domain events (e.g., `CourseCreatedEvent`, `CourseUpdatedEvent`)
- Business rules and invariants

```typescript
// Example of a domain entity
export class Course {
  private _id: number;
  private _title: string;
  // ... other properties

  // Domain methods
  isPublished(): boolean {
    return !this._isHidden;
  }

  publish(): void {
    this._isHidden = false;
  }

  // ... other methods
}
```

**Domain Services** (`domain/course.service.ts`):
- Business logic that doesn't belong to a single entity
- Orchestration of multiple entities
- Implementation of use cases

```typescript
// Example of a domain service
class CourseService implements ICourseService {
  async createCourse(courseData: CreateCourseDTO): Promise<Course> {
    // Business logic
    const course = CourseFactory.createNewCourse(/* ... */);
    const result = await CourseRepository.create(/* ... */);
    // Emit domain event
    eventEmitter.emit('courseCreated', new CourseCreatedEvent(courseID));
    return createdCourse;
  }

  // ... other methods
}
```

**Factories** (`domain/factories/course.factory.ts`):
- Creation logic for complex domain objects
- Encapsulation of validation rules
- DTO creation for API responses

```typescript
// Example of a factory
class CourseFactory implements ICourseFactory {
  createNewCourse(title: string, topic: string, /* ... */): Course {
    // Validation using value objects
    const courseTitle = new CourseTitle(title);
    // ... other validations

    return new Course(/* ... */);
  }

  // DTO creation methods
  createCourseDTO(course: Course): CourseDTO {
    return {
      courseID: course.id,
      title: course.title,
      // ... other properties
    };
  }

  // ... other methods
}
```

#### 2. Application Layer

**Controllers** (`controllers/course.co.ts`):
- Handle HTTP requests and responses
- Convert between HTTP and domain layer
- No business logic, only orchestration

```typescript
// Example of a controller
class CourseController {
  async createCourse(req: Request, res: Response): Promise<void> {
    try {
      const { title, topic, /* ... */ } = req.body;

      // Use factory to create command
      const command = CourseFactory.createCreateCourseCommand(/* ... */);

      // Call domain service
      const course = await CourseService.createCourse(command);

      // Return response
      res.status(201).json({
        success: true,
        message: 'Course created successfully',
        data: CourseFactory.createCourseDTO(course)
      });
    } catch (error) {
      // Error handling
    }
  }

  // ... other methods
}
```

#### 3. Infrastructure Layer

**Repository Interfaces** (`repositories/interface/ICourse.repo.ts`):
- Define contracts for data access
- Persistence-agnostic interfaces

```typescript
// Example of a repository interface
export interface ICourseRepository {
  create(title: string, topic: string, /* ... */): Promise<any>;
  update(courseID: number, /* ... */): Promise<any>;
  getById(courseID: number): Promise<Course | null>;
  // ... other methods
}
```

**Repository Implementations** (`repositories/Implement/Course.repo.ts`):
- Concrete implementations of repository interfaces
- Database-specific code
- Data mapping between domain and persistence

```typescript
// Example of a repository implementation
class CourseRepository implements ICourseRepository {
  async create(title: string, topic: string, /* ... */): Promise<any> {
    const proc = 'create_course';
    const params = {
      Title: title,
      Topic: topic,
      // ... other parameters
    };
    return await DataConnect.executeProcedure(proc, params);
  }

  async getById(courseID: number): Promise<Course | null> {
    // Database query
    const result = await DataConnect.executeWithParams(query, params);
    // Map to domain entity using factory
    return result && result.length > 0 ?
      CourseFactory.createCourseFromDB(result[0]) : null;
  }

  // ... other methods
}
```

#### 4. Presentation Layer

**Routes** (`routes/course.route.ts`):
- Define API endpoints
- Map routes to controller methods
- Group related endpoints

```typescript
// Example of routes
const router = Router();

// Course routes
router.post('/create', CourseController.createCourse);
router.post('/update', CourseController.updateCourse);
// ... other routes

export default router;
```

#### 5. Module Integration

**Module Index** (`index.ts`):
- Export all module components
- Provide a clean interface for other modules

```typescript
// Example of module index
export {
  // Domain
  Course, CourseTitle, CourseDescription, CoursePrice, CourseService,

  // Factories
  CourseFactory,

  // Infrastructure
  CourseRepository,

  // Presentation
  CourseController, courseRoutes
};
```

## Detailed Module Structure

The backend is organized into several domain-driven modules, each responsible for a specific business domain. Below is a detailed description of each module:

### 1. Course Module

The Course module manages all aspects of courses in the learning platform.

**Domain Entities and Value Objects:**
- `Course`: Main entity representing a course with properties like title, description, price, etc.
- `CourseTitle`: Value object ensuring course titles meet business rules
- `CourseDescription`: Value object for course descriptions
- `CoursePrice`: Value object for course pricing with validation
- Domain events: `CourseCreatedEvent`, `CourseUpdatedEvent`, `CourseDeletedEvent`

**Services:**
- `CourseService`: Implements business logic for course management
  - Creating, updating, and deleting courses
  - Searching and retrieving courses
  - Publishing/unpublishing courses

**Factories:**
- `CourseFactory`: Creates and validates course entities and DTOs
  - Creates new courses with proper validation
  - Converts between domain entities and DTOs
  - Creates specialized courses (premium, free)

**Repositories:**
- `ICourseRepository`: Interface defining data access methods
- `CourseRepository`: Implementation handling database operations
  - CRUD operations for courses
  - Search functionality
  - Pagination support

**Controllers:**
- `CourseController`: Handles HTTP requests for course operations
  - Creating and updating courses
  - Retrieving course details
  - Managing course visibility

**Routes:**
- Course-related API endpoints for instructors and students

### 2. Lesson Module

The Lesson module handles the content units within courses.

**Domain Entities and Value Objects:**
- `Lesson`: Entity representing a lesson with properties like title, duration, type
- `LessonTitle`: Value object for lesson titles
- `LessonComplexity`: Value object for lesson difficulty levels
- `LessonType`: Value object defining lesson types (Video, Document)
- Domain events: `LessonCreatedEvent`, `LessonUpdatedEvent`, `LessonDeletedEvent`

**Services:**
- `LessonService`: Implements business logic for lesson management
  - Creating video and document lessons
  - Updating lesson content and metadata
  - Ordering lessons within courses

**Factories:**
- `LessonFactory`: Creates and validates lesson entities
  - Creates specialized lesson types (video, document)
  - Converts between domain entities and DTOs

**Repositories:**
- `ILessonRepository`: Interface defining data access methods
- `LessonRepository`: Implementation handling database operations
  - CRUD operations for lessons
  - Specialized methods for video and document content
  - Lesson ordering functionality

### 3. AI Module

The AI module provides integration with artificial intelligence services.

**Domain Entities:**
- `AIMessage`: Entity representing an AI interaction with user message and AI response

**Services:**
- `AIService`: Implements business logic for AI interactions
  - Chat functionality with Groq AI
  - GraphQL integration for data retrieval

**Infrastructure:**
- gRPC client for real-time AI communication
- GraphQL client for data queries

**Controllers:**
- `AIController`: Handles HTTP requests for AI operations
  - Chat endpoints
  - Data retrieval endpoints

**Routes:**
- AI-related API endpoints

### 4. Enrollment Module

The Enrollment module manages student enrollment in courses.

**Domain Entities and Value Objects:**
- `Enrollment`: Entity representing a student's enrollment in a course
- `EnrollmentStatus`: Value object for enrollment states (Enrolled, Completed, Dropped)
- Domain events: `EnrollmentCreatedEvent`, `EnrollmentUpdatedEvent`, `EnrollmentCompletedEvent`

**Services:**
- `EnrollmentService`: Implements business logic for enrollment management
  - Creating and updating enrollments
  - Checking enrollment status
  - Managing course completion

**Factories:**
- `EnrollmentFactory`: Creates and validates enrollment entities
  - Creates enrollment entities with proper validation
  - Converts between domain entities and DTOs

**Repositories:**
- `IEnrollmentRepository`: Interface defining data access methods
- `EnrollmentRepository`: Implementation handling database operations
  - CRUD operations for enrollments
  - Enrollment status checks
  - Contact list retrieval

**Controllers:**
- `EnrollmentController`: Handles HTTP requests for enrollment operations
  - Enrolling in courses
  - Updating enrollment status
  - Retrieving enrollment information

**Routes:**
- Enrollment-related API endpoints

### 5. Learning Module

The Learning module manages the learning experience for students.

**Domain Entities and Value Objects:**
- `LearningProgress`: Entity tracking a student's progress through lessons
- `Enrollment`: Entity representing course enrollment (shared with Enrollment module)
- `ProcessStatus`: Value object for learning progress states
- Domain events: `LearningProgressCreatedEvent`, `LearningProgressUpdatedEvent`, `LearningProgressCompletedEvent`

**Services:**
- `LearningService`: Implements business logic for learning management
  - Starting and updating learning progress
  - Tracking lesson completion
  - Managing course progress

**Factories:**
- `LearningFactory`: Creates and validates learning entities
  - Creates learning progress entities
  - Converts between domain entities and DTOs

**Repositories:**
- `ILearningRepository`: Interface defining data access methods
- `LearningRepository`: Implementation handling database operations
  - CRUD operations for learning progress
  - Progress status checks
  - Course progress aggregation

**Controllers:**
- `LearningController`: Handles HTTP requests for learning operations
  - Starting and updating learning progress
  - Retrieving progress information
  - Completing lessons and courses

**Routes:**
- Learning-related API endpoints

### 6. LearnProgress Module

The LearnProgress module tracks detailed student progress through course materials.

**Domain Entities and Value Objects:**
- `LearnProgress`: Entity tracking detailed progress through individual lessons
- `ProcessStatus`: Value object for progress states (NotStarted, InProcess, Done)
- Domain events: `LearnProgressCreatedEvent`, `LearnProgressUpdatedEvent`, `LearnProgressCompletedEvent`

**Services:**
- `LearnProgressService`: Implements business logic for progress tracking
  - Starting and updating learning progress
  - Checking completion status
  - Aggregating course progress

**Factories:**
- `LearnProgressFactory`: Creates and validates progress entities
  - Creates progress entities with proper validation
  - Converts between domain entities and DTOs

**Repositories:**
- `ILearnProgressRepository`: Interface defining data access methods
- `LearnProgressRepository`: Implementation handling database operations
  - CRUD operations for progress tracking
  - Progress status checks
  - Course completion updates

**Controllers:**
- `LearnProgressController`: Handles HTTP requests for progress operations
  - Starting and updating progress
  - Retrieving progress information
  - Calculating completion percentages

**Routes:**
- Progress-related API endpoints

### 7. Statistics Module

The Statistics module provides analytics and reporting features.

**DTOs:**
- `RevenueStatisticsDTO`: Data transfer object for revenue statistics
- `KeywordTrendDTO`: Data transfer object for trending search terms
- `MonthlyRevenueDTO`: Data transfer object for monthly revenue data
- `CourseRevenueDTO`: Data transfer object for course-specific revenue

**Services:**
- `StatisticsService`: Implements business logic for statistics
  - Retrieving revenue statistics
  - Analyzing trending keywords

**Repositories:**
- `IStatisticsRepository`: Interface defining data access methods
- `StatisticsRepository`: Implementation handling database operations
  - Revenue data retrieval
  - Keyword trend analysis

**Controllers:**
- `StatisticsController`: Handles HTTP requests for statistics operations
  - Revenue statistics endpoints
  - Trending keywords endpoints

**Routes:**
- Statistics-related API endpoints

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: Microsoft SQL Server
- **Caching**: Redis
- **Search**: ElasticSearch
- **Authentication**: JWT, Firebase Auth
- **API Communication**: REST, GraphQL, gRPC
- **Testing**: Jest
- **Documentation**: Swagger

## Key Features

- User authentication and authorization
- Course management
- Lesson management
- Enrollment tracking
- Learning progress monitoring
- Discussion forums
- AI integration
- Statistics and reporting
- Redis caching for improved performance

## Installation

1. Clone the repository

2. Navigate to the server directory
```bash
cd server
```

3. Install dependencies
```bash
yarn install
```

4. Create a `.env` file based on `.env.example`

5. Start the development server
```bash
yarn dev
```

## Available Scripts

- `yarn start`: Start the production server
- `yarn build`: Build the TypeScript project
- `yarn ts:start`: Start with ts-node
- `yarn dev`: Start development server with hot-reload
- `yarn debug`: Start in debug mode
- `yarn format`: Format code with Prettier
- `yarn test`: Run tests

## API Documentation

API documentation is available via Swagger UI at `/api-docs` when the server is running.

## Testing

The project uses Jest for testing. Run tests with:

```bash
yarn test
```

## Docker

A Dockerfile is provided for containerization. Build and run with:

```bash
docker build -t dental-clinic-server .
docker run -p 5001:5001 dental-clinic-server
```

## License

MIT
