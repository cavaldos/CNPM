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

## Detailed Component Documentation

### 1. Client

Frontend application built with React, Vite, and Redux Toolkit, providing the user interface for the online learning platform.

**Key Features:**
- Multi-role user system (Admin, Instructor, Student, Guest)
- Course management and learning platform
- Real-time chat functionality
- Discussion forums for courses
- Admin dashboard with user management and statistics

**Detailed Documentation:** [client/README.md](client/README.md)

### 2. Server

Main backend API built with Node.js, Express, and TypeScript, following Domain-Driven Design (DDD) architecture.

**Key Features:**
- User authentication and authorization
- Course and lesson management
- Enrollment and learning progress tracking
- AI integration and statistics
- Redis caching for improved performance

**Detailed Documentation:** [server/README.md](server/README.md)

### 3. ChatServer

Specialized service for real-time communication and AI integration, using Socket.IO, gRPC, and GraphQL.

**Key Features:**
- Real-time chat via Socket.IO
- AI integration with Groq API
- gRPC API for AI services
- GraphQL API for data queries

**Detailed Documentation:** [chatserver/LEARN.md](chatserver/LEARN.md)

### 4. Kubernetes (k8s)

Configuration and scripts to deploy the application on a Kubernetes cluster with 1 master node and 3 worker nodes.

**Key Features:**
- Cluster installation and configuration scripts
- Deployment files for services
- Ingress configuration for traffic routing
- Monitoring tools (Prometheus, K8s Dashboard)

**Detailed Documentation:** [k8s/README.md](k8s/README.md)

### 5. Load Balancer

Load balancing service built with Rust and Axum framework, distributing requests to server instances.

**Key Features:**
- Load balancing between backend servers
- Request routing to available servers
- Error and timeout handling
- Debug mode support

### 6. Nginx

Nginx configuration for reverse proxy and additional load balancing.

**Key Features:**
- Load balancing between backend servers
- Reverse proxy configuration
- Server health checks
- Status monitoring

### 7. Proto

Directory containing Protocol Buffers definitions for gRPC communication between services.

**Key Features:**
- AI service and message definitions
- Support for communication between Server and ChatServer

## Deployment

The system can be deployed in two ways:

### 1. Docker Compose

```bash
# Deploy the entire system
docker-compose up -d

# Deploy a specific service
docker-compose up -d client
```

### 2. Kubernetes

```bash
# Set up the cluster
cd k8s
./setup-cluster.sh

# Deploy the application
./deploy-app.sh
```

## Technologies Used

- **Frontend**: React, Redux Toolkit, TailwindCSS, Material-UI
- **Backend**: Node.js, Express, TypeScript, Domain-Driven Design
- **Database**: Microsoft SQL Server, MongoDB
- **Caching**: Redis
- **Search**: ElasticSearch
- **API Communication**: REST, GraphQL, gRPC
- **Real-time**: Socket.IO
- **Load Balancing**: Rust/Axum, Nginx
- **Containerization**: Docker, Kubernetes
- **AI Integration**: Groq API

## License

This project is distributed under the MIT license. See the `LICENSE` file for more details.
