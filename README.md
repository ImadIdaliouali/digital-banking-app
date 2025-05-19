# Digital Banking Application

## Project Overview

A full-stack digital banking application that provides a modern, secure interface for customers to manage their bank accounts. The application includes features for account management, transactions, and customer operations.

## Features

- Customer management (add, update, delete, search)
- Account management (create, view accounts)
- Transaction processing (deposits, withdrawals, transfers)
- Account statement generation
- Secure authentication and authorization
- Responsive user interface

## Architecture

The project follows a microservices architecture with:

- **Backend**: Spring Boot REST API
- **Frontend**: Angular-based responsive web application
- **Database**: SQL database for persistent storage

## Technologies

### Backend

- Java with Spring Boot
- Spring Data JPA for database access
- Spring Security for authentication
- RESTful API design
- Maven for dependency management

### Frontend

- Angular framework
- Bootstrap for responsive design
- TypeScript
- HTML/CSS

### Tools

- Git for version control

## Setup Instructions

### Prerequisites

- Java JDK 11+
- Node.js and npm
- Angular CLI
- Maven
- MySQL or H2 database

### Backend Setup

1. Clone the repository

```
git clone https://github.com/ImadIdaliouali/digital-banking-app.git
cd digital-banking-app/backend
```

2. Configure the database connection in `application.properties`

3. Build and run the Spring Boot application

```
mvn clean install
mvn spring-boot:run
```

The backend server will start on http://localhost:8085

### Frontend Setup

1. Navigate to the frontend directory

```
cd ../frontend
```

2. Install dependencies

```
npm install
```

3. Start the Angular development server

```
ng serve
```

The application will be accessible at http://localhost:4200
