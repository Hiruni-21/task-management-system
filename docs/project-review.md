# Project Review - Part 01

## Current Project Status

The project already has a React + Vite frontend and a Spring Boot backend.

## Frontend

The frontend is created using React and Vite. It currently contains the default React files.

Current frontend files:
- App.jsx
- main.jsx
- App.css
- index.css

The frontend runs successfully using:

npm run dev

## Backend

The backend is created using Spring Boot.

Current backend features:
- Basic Task model
- Basic Task controller
- Task repository
- Basic security configuration
- MySQL database configuration

Current backend API features:
- Get all tasks
- Create task
- Delete task
- Update task status

## Issues Found

1. TaskRepository file location does not match its package name.
2. Backend does not have login/signup yet.
3. Backend does not have JWT authentication yet.
4. Backend does not have Admin/User roles yet.
5. Frontend is still mostly the default Vite UI.
6. Docker and GitHub Actions are not added yet.

## Next Improvements

1. Fix backend package structure.
2. Improve task model and task API.
3. Add MySQL database connection properly.
4. Add user authentication.
5. Add role-based access control.
6. Build React frontend screens.
7. Add Docker and Docker Compose.
8. Add GitHub Actions CI.
