# Domain-Driven Design Modules

This directory contains the DDD-structured modules for the application. Each module represents a bounded context in the domain model.

## Module Structure

Each module follows this structure:

```
module/
├── controllers/      # HTTP request handlers
├── services/         # Business logic and use cases
├── repositories/     # Data access layer
├── domain/           # Domain entities, value objects, aggregates
└── routes/           # API route definitions
```

## Available Modules

- User: User management (admin, instructor, student)
- Course: Course management and operations
- Lesson: Lesson content and management
- Review: Course reviews and ratings
- Forum: Discussion forums for courses
- Invoice: Payment and billing
- LearnProgress: Student learning progress tracking
- AI: AI integration services

## Usage

These modules are designed to be used alongside the existing codebase, allowing for a gradual migration to a DDD architecture.
