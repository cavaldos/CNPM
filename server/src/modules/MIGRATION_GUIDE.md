# DDD Migration Guide

This guide outlines the steps to gradually migrate the existing codebase to a Domain-Driven Design (DDD) architecture.

## Current Progress

We have created the following DDD modules:

1. **User Module**
   - Domain entities and value objects
   - Repository layer
   - Service layer with business logic
   - Controller layer for HTTP handling
   - Routes for API endpoints

2. **Course Module**
   - Domain entities and value objects
   - Repository layer
   - Service layer with business logic
   - Controller layer for HTTP handling
   - Routes for API endpoints

3. **AI Module**
   - Domain entities
   - Service layer for gRPC integration
   - Controller layer for HTTP handling
   - Routes for API endpoints

4. **Review Module**
   - Domain entities
   - Repository layer

5. **Lesson Module**
   - Domain entities and value objects

## Integration with Existing Code

The DDD modules are integrated with the existing codebase through:

- A new `/ddd` route prefix in the main API router
- Keeping all existing code intact for backward compatibility

## Next Steps

To continue the migration to DDD, follow these steps:

1. **Complete the remaining modules**:
   - Forum
   - Invoice
   - LearnProgress
   - Auth

2. **For each module, create**:
   - Domain entities and value objects in `domain/`
   - Repository layer in `repositories/`
   - Service layer in `services/`
   - Controller layer in `controllers/`
   - Routes in `routes/`

3. **Gradually migrate existing endpoints**:
   - Identify endpoints in the existing routes
   - Create corresponding endpoints in the DDD modules
   - Test both implementations side by side
   - Once confident, switch to using only the DDD implementation

4. **Refine domain models**:
   - Add domain-specific validation
   - Implement domain events
   - Create aggregates for complex domain relationships

5. **Add unit and integration tests**:
   - Test domain logic
   - Test repositories
   - Test services
   - Test API endpoints

## Best Practices

1. **Keep domain logic in domain entities**:
   - Validation rules
   - Business rules
   - State transitions

2. **Use value objects for immutable concepts**:
   - Enums for fixed values
   - Complex values that don't have identity

3. **Use repositories for data access**:
   - Abstract database operations
   - Return domain entities, not raw data

4. **Use services for operations that span multiple entities**:
   - Complex business processes
   - Operations that don't naturally belong to a single entity

5. **Keep controllers thin**:
   - Validate input
   - Call services
   - Format response
   - No business logic

## Example Workflow

To implement a new feature in the DDD architecture:

1. Identify the domain entities and their relationships
2. Create or update domain models
3. Implement repository methods for data access
4. Implement service methods for business logic
5. Create controller methods for HTTP handling
6. Define routes for API endpoints
7. Test the implementation
8. Update documentation
