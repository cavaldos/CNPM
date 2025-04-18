# Coursera Clone - Online Learning Platform

![Coursera Clone](https://img.shields.io/badge/Coursera%20Clone-Online%20Learning-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## Project Overview

Coursera Clone is an online learning platform designed with a microservices architecture, providing features similar to Coursera. The system includes multiple independent components that interact with each other through protocols such as REST, GraphQL, and gRPC.

## Project Structure

```
.
├── chatserver/         # Real-time chat service and AI integration
├── client/             # React frontend application
├── gateway/            # API Gateway service
├── k8s/                # Kubernetes configuration and scripts
├── load_balancer/      # Load balancer built with Rust
├── nginx/              # Nginx configuration for reverse proxy
├── proto/              # Protocol Buffers definitions for gRPC
└── server/             # Main backend API with DDD architecture
```

## System Architecture

### Main Components

- **Client**: Frontend application based on React, Vite, and Redux Toolkit
- **Server**: Backend API service based on TypeScript, Express, and Domain-Driven Design
- **ChatServer**: Specialized service for real-time communication and AI integration
- **Load Balancer**: Load balancing between server instances using Rust and Axum framework
- **Nginx**: Reverse proxy and additional load balancing
- **Kubernetes**: Container deployment and management on a cluster

### Data Flow

1. Users interact with the React interface (Client)
2. Requests are routed through Nginx or Kubernetes Ingress
3. Load Balancer distributes requests to Server instances
4. Server processes API requests and interacts with ChatServer when needed
5. ChatServer provides real-time chat services and AI integration

## Development View

The project follows a modular microservices architecture with clear separation of concerns. Below is the directory structure showing the main components and their organization:

```
.
├── chatserver               # Real-time chat and AI service
│   ├── proto                # Protocol definitions
│   └── src                  # Source code
│       ├── api              # API endpoints
│       ├── config           # Configuration files
│       ├── graphql          # GraphQL schema and resolvers
│       ├── grpc             # gRPC service implementations
│       ├── model            # Data models
│       ├── services         # Business logic services
│       └── utils            # Utility functions
├── client                   # Frontend application
│   ├── __mocks__            # Test mocks
│   ├── __tests__            # Unit tests
│   ├── e2e                  # End-to-end tests
│   ├── public               # Static assets
│   └── src                  # Source code
│       ├── components       # React components
│       ├── hooks            # Custom React hooks
│       ├── pages            # Page components
│       ├── redux            # State management
│       ├── routes           # Routing configuration
│       └── services         # API service clients
├── gateway                  # API Gateway service
│   ├── __test__             # Tests
│   └── src                  # Source code
├── k8s                      # Kubernetes configuration
│   └── deployments          # Deployment manifests
├── load_balancer            # Rust-based load balancer
│   └── src                  # Source code
│       ├── config           # Configuration
│       ├── handlers         # Request handlers
│       └── load             # Load balancing algorithms
├── nginx                    # Nginx configuration
│   ├── conf.d               # Configuration files
│   └── logs                 # Log files
├── proto                    # Shared Protocol Buffers
└── server                   # Main backend API
    ├── __test__             # Tests
    ├── docs                 # Documentation
    ├── src                  # Source code
    │   ├── api              # API endpoints
    │   ├── config           # Configuration
    │   ├── middleware       # Express middleware
    │   ├── modules          # Domain modules (DDD)
    │   ├── routes           # Route definitions
    │   └── utils            # Utility functions
    └── types                # TypeScript type definitions
```

### Key Development Aspects

1. **Setup database**:
```bash
docker-compose -f docker-compose-database.yml up -d --build
``` 

2. **Setup Mornitoring**:
```bash
docker-compose -f docker-compose-grafana.yml up -d --build
``` 

```
.
├── chatserver               # Real-time chat and AI service
│   ├── proto                # Protocol definitions
│   └── src                  # Source code
│       ├── api              # API endpoints
│       ├── config           # Configuration files
│       ├── graphql          # GraphQL schema and resolvers
│       ├── grpc             # gRPC service implementations
│       ├── model            # Data models
│       ├── services         # Business logic services
│       └── utils            # Utility functions
├── client                   # Frontend application
│   ├── __mocks__            # Test mocks
│   ├── __tests__            # Unit tests
│   ├── e2e                  # End-to-end tests
│   ├── public               # Static assets
│   └── src                  # Source code
│       ├── components       # React components
│       ├── hooks            # Custom React hooks
│       ├── pages            # Page components
│       ├── redux            # State management
│       ├── routes           # Routing configuration
│       └── services         # API service clients
├── gateway                  # API Gateway service
│   ├── __test__             # Tests
│   └── src                  # Source code
├── k8s                      # Kubernetes configuration
│   └── deployments          # Deployment manifests
├── load_balancer            # Rust-based load balancer
│   └── src                  # Source code
│       ├── config           # Configuration
│       ├── handlers         # Request handlers
│       └── load             # Load balancing algorithms
├── nginx                    # Nginx configuration
│   ├── conf.d               # Configuration files
│   └── logs                 # Log files
├── proto                    # Shared Protocol Buffers
└── server                   # Main backend API
    ├── __test__             # Tests
    ├── docs                 # Documentation
    ├── src                  # Source code
    │   ├── api              # API endpoints
    │   ├── config           # Configuration
    │   ├── middleware       # Express middleware
    │   ├── modules          # Domain modules (DDD)
    │   ├── routes           # Route definitions
    │   └── utils            # Utility functions
    └── types                # TypeScript type definitions
```