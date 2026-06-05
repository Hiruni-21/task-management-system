# Backend MySQL API Test - Part 03

## Purpose

This part tested whether the Spring Boot backend can connect with the MySQL database and whether the Task APIs are working correctly.

## Database

MySQL was started using Homebrew.

Database used:

task_manager

## Backend

The backend was started using:

./mvnw spring-boot:run

Backend URL:

http://localhost:8080

## Tested APIs

### 1. Create Task

Command used:

curl -X POST http://localhost:8080/api/tasks \
-H "Content-Type: application/json" \
-d '{
  "title": "Study Spring Boot",
  "description": "Learn backend API development",
  "status": "PENDING"
}'

Result:

A new task was created successfully.

### 2. Get All Tasks

Command used:

curl http://localhost:8080/api/tasks

Result:

The created task was returned successfully from the MySQL database.

## Test Result

The backend successfully connected to MySQL and the Task APIs worked correctly.
