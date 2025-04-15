# Dental Clinic Management System
## Client

This is the frontend application for the Dental Clinic Management System, built with React and Vite.

## Project Structure

```
client/
├── public/                # Static assets
├── src/                   # Source code
│   ├── components/        # Reusable UI components
│   │   ├── auth/          # Authentication components
│   │   ├── Layout/        # Layout components for different user roles
│   │   │   ├── admin/     # Admin layout components
│   │   │   ├── guest/     # Guest layout components
│   │   │   ├── instructor/# Instructor layout components
│   │   │   └── student/   # Student layout components
│   │   └── ui/            # UI components
│   │       ├── chat/      # Chat interface components
│   │       ├── course/    # Course-related components
│   │       ├── Learning/  # Learning experience components
│   │       ├── Learn/     # Learning content components
│   │       └── utilize/   # Utility components
│   ├── config/            # Configuration files
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   │   ├── admin/         # Admin pages
│   │   ├── guest/         # Guest/public pages
│   │   ├── instructor/    # Instructor pages
│   │   └── student/       # Student pages
│   ├── redux/             # Redux state management
│   │   └── features/      # Redux slices
│   ├── routes/            # Route definitions
│   ├── services/          # API services
│   │   └── chat/          # Chat API services
│   ├── App.jsx            # Main application component
│   └── main.jsx           # Application entry point
├── e2e/                   # End-to-end tests
├── __tests__/             # Unit tests
├── __mocks__/             # Test mocks
└── vite.config.js         # Vite configuration
```

## Technology Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Styling**: TailwindCSS, Material-UI, Styled Components
- **Routing**: React Router DOM
- **Authentication**: Firebase Auth, Auth0
- **API Communication**: Axios
- **Real-time Communication**: Socket.io
- **Testing**: Jest, React Testing Library, Selenium WebDriver
- **Code Quality**: ESLint, Prettier

## Key Features

- Multi-role user system (Admin, Instructor, Student, Guest)
- Course management and learning platform
- Real-time chat functionality
- Discussion forums for courses
- Admin dashboard with user management and statistics
- Responsive layouts for different device sizes

## Installation
1. Move to client folder
```bash
cd client
```
2. Run the following command to install the dependencies
```bash
yarn install
```
3. Run the following command to start the development server
```bash
yarn dev
```
4. Build the project for production
```bash
yarn build
```
5. Open the following link in your browser
```bash
http://localhost:5173
```

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier
- `yarn test` - Run unit tests
- `yarn test:coverage` - Run tests with coverage report
- `yarn test:e2e` - Run end-to-end tests
