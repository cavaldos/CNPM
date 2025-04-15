# Coursera Clone - Online Learning Platform

![Coursera Clone](https://img.shields.io/badge/Coursera%20Clone-Online%20Learning-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)

A comprehensive online learning platform inspired by Coursera, built with modern web technologies. This system allows students to enroll in courses, instructors to create and manage educational content, and administrators to oversee the entire platform.

## System Architecture

The application follows a microservices architecture with three main components:

- **Client**: React-based frontend application
- **Server**: TypeScript-based backend API service
- **ChatServer**: Dedicated service for real-time communication and AI features

## Domain-Driven Design Architecture

The backend is structured following Domain-Driven Design (DDD) principles, which organizes the codebase around business domains and concepts. This approach enhances maintainability, scalability, and aligns the code structure with the business requirements.

### DDD Module Structure

Each module in the system follows a consistent structure with these layers:

#### 1. Domain Layer

The core of the module containing business logic and rules:

- **Entities**: Core business objects (e.g., `Course`, `Lesson`, `Enrollment`)
- **Value Objects**: Immutable objects representing concepts with no identity (e.g., `CourseTitle`, `LessonComplexity`)
- **Domain Services**: Services that operate on multiple entities (e.g., `CourseService`, `LearningService`)
- **Domain Events**: Events that occur within the domain

#### 2. Application Layer

Coordinates application activities and delegates work to domain objects:

- **Application Services**: Orchestrate the execution of domain logic
- **DTOs (Data Transfer Objects)**: Objects for transferring data between layers

#### 3. Infrastructure Layer

Provides technical capabilities to support the higher layers:

- **Repositories**: Data access implementations (e.g., `CourseRepository`, `LessonRepository`)
- **External Services**: Integration with external systems (e.g., AI services, gRPC clients)

#### 4. Presentation Layer

Handles user interaction and displays information:

- **Controllers**: Handle HTTP requests and responses (e.g., `CourseController`, `AIController`)
- **Routes**: Define API endpoints (e.g., `courseRoutes`, `aiRoutes`)

### Available Modules

1. **Course Module**
   - Manages course creation, retrieval, and management
   - Key components: `Course`, `CourseTitle`, `CourseDescription`, `CoursePrice`, `CourseService`, `CourseFactory`, `CourseRepository`, `CourseController`

2. **Lesson Module**
   - Handles lesson content and structure within courses
   - Key components: `Lesson`, `LessonTitle`, `LessonComplexity`, `LessonType`, `LessonService`, `LessonFactory`, `LessonRepository`

3. **AI Module**
   - Provides AI-powered features and integrations
   - Key components: `AIService`, `AIController`, `AIMessage`
   - Integrates with external AI services via gRPC and GraphQL

4. **Learning Module**
   - Manages student learning experiences
   - Key components: `LearningProgress`, `Enrollment`, `ProcessStatus`, `LearningService`, `LearningFactory`, `LearningRepository`, `LearningController`

5. **Enrollment Module**
   - Handles course enrollment processes
   - Key components: `Enrollment`, `EnrollmentStatus`, `EnrollmentService`, `EnrollmentFactory`, `EnrollmentRepository`, `EnrollmentController`

6. **LearnProgress Module**
   - Tracks student progress through course materials
   - Key components: `LearnProgress`, `ProcessStatus`, `LearnProgressService`, `LearnProgressFactory`, `LearnProgressRepository`, `LearnProgressController`

7. **Statistics Module**
   - Provides analytics and reporting features
   - Key components: `StatisticsService`, `StatisticsController`, `StatisticsRepository`
   - DTOs: `RevenueStatisticsDTO`, `KeywordTrendDTO`, `MonthlyRevenueDTO`, `CourseRevenueDTO`

### Module Integration

Modules are integrated through a central routing system:

```typescript
// DDD Routes integration
const DddRouter = Router();

DddRouter.use('/course', courseRoutes);
DddRouter.use('/ai', aiRoutes);
DddRouter.use('/learning', learningRoutes);
DddRouter.use('/enrollment', enrollmentRoutes);
DddRouter.use('/learn-progress', learnProgressRoutes);
DddRouter.use('/statistics', statisticsRoutes);

// Mount Domain routes to main API
router.use("/apiv2", DomainRouter);
```

### Example: Course Module Structure

```
modules/course/
├── controllers/           # Presentation layer
│   └── course.co.ts       # Course controller
├── domain/                # Domain layer
│   ├── course.ts          # Course entity and value objects
│   ├── course.service.ts  # Course domain service
│   └── factories/         # Factory methods
│       └── course.factory.ts
├── dto/                   # Data Transfer Objects
│   └── course.dto.ts
├── repositories/          # Infrastructure layer
│   ├── ICourse.repo.ts    # Repository interface
│   └── Implement/
│       └── Course.repo.ts # Repository implementation
├── routes/                # API routes
│   └── course.route.ts
└── index.ts              # Module exports
```

## Technology Stack

### Frontend
- React with Redux for state management
- Vite as the build tool
- Tailwind CSS for styling
- End-to-end testing with Selenium WebDriver

### Backend
- Node.js with Express
- TypeScript for type safety
- PostgreSQL database
- MongoDB for chat and messaging features

### Communication
- RESTful APIs
- GraphQL
- gRPC for service-to-service communication
- Socket.IO for real-time features

### AI Integration
- Groq AI integration for intelligent features

### Deployment
- Docker containerization
- Kubernetes orchestration
- Nginx as a load balancer

## Features

### For Students
- Browse and search courses
- Enroll in courses
- Track learning progress
- Participate in discussion forums
- Access AI-powered learning assistance

### For Instructors
- Create and manage courses
- Upload lesson materials
- Monitor student progress
- Engage with students through forums

### For Administrators
- User management
- Course oversight
- Revenue statistics and analytics
- System monitoring and maintenance

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/                # Source code
│   ├── e2e/                # End-to-end tests
│   └── public/             # Static assets
├── server/                 # Backend API service
│   ├── src/                # Source code
│   │   ├── api/            # API routes and controllers
│   │   ├── config/         # Configuration files
│   │   └── modules/        # DDD modules
│   └── tests/              # Test files
├── chatserver/             # Chat and real-time service
│   ├── src/                # Source code
│   │   ├── api/            # API routes
│   │   ├── graphql/        # GraphQL schema and resolvers
│   │   ├── grpc/           # gRPC service definitions
│   │   ├── model/          # MongoDB models
│   │   └── socket/         # Socket.IO implementation
│   └── tests/              # Test files
├── k8s/                    # Kubernetes configuration
│   └── deployments/        # Kubernetes deployment files
├── nginx/                  # Nginx configuration
└── docker-compose.yml      # Docker Compose configuration
```

## Installation and Setup

### Prerequisites
- Node.js (v18.12.1 or higher)
- npm (v8.19.2 or higher) or yarn (v1.22.19 or higher)
- PostgreSQL (v12.11 or higher)
- MongoDB
- Docker and Docker Compose (for containerized deployment)

### Local Development Setup

#### 1. Clone the repository
```bash
git clone https://github.com/yourusername/coursera-clone.git
cd coursera-clone
```

#### 2. Client Setup
```bash
cd client
npm install
npm run dev
```
The client will be available at http://localhost:5173

#### 3. Server Setup
```bash
cd server
npm install
npm run dev
```
The server will be available at http://localhost:5001

#### 4. ChatServer Setup
```bash
cd chatserver
npm install
npm run dev
```
The chat server will be available at http://localhost:5003 with Socket.IO on port 5004 and gRPC on port 50051

### Docker Deployment

To deploy the entire application using Docker Compose:

```bash
docker-compose up -d
```

This will start all services and make them available through the Nginx load balancer on port 80.

### Kubernetes Deployment

The `k8s` directory contains scripts and configuration files for deploying the application on a Kubernetes cluster:

```bash
chmod +x k8s/setup-cluster.sh
./k8s/setup-cluster.sh
```

After deployment, the application will be available at http://coursera.zapto.org

## Testing

### Running Client Tests
```bash
cd client
npm test           # Run unit tests
npm run test:e2e    # Run end-to-end tests
```

### Running Server Tests
```bash
cd server
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by Coursera's learning platform
- Built with modern web technologies and best practices
- Designed with scalability and maintainability in mind
