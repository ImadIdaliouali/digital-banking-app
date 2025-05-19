# Digital Banking Application - Backend

This repository contains the backend implementation of a Digital Banking Application developed with Spring Boot.

## Table of Contents

- [Technologies](#technologies)
- [Features](#features)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Database Configuration](#database-configuration)
- [Getting Started](#getting-started)
- [Security](#security)

## Technologies

- Java 17
- Spring Boot 3.x
- Spring Data JPA
- Spring Security (JWT Authentication)
- MySQL Database
- Maven
- Lombok

## Features

- Customer management
- Account management (Current accounts and Savings accounts)
- Banking operations (Debit, Credit, Transfer)
- Account statements and history
- Secure API with JWT authentication
- Exception handling with custom responses

## Project Structure

The project follows a layered architecture:

- **entities**: Domain models representing database tables
- **dtos**: Data Transfer Objects for API communication
- **repositories**: Spring Data JPA repositories
- **services**: Business logic implementation
- **web**: REST controllers exposing API endpoints
- **exceptions**: Custom exception handling
- **security**: JWT authentication and authorization

## API Endpoints

### Authentication

- `POST /auth/login`: User login
- `POST /auth/register`: User registration (if applicable)

### Customers

- `GET /customers`: Get all customers
- `GET /customers/{id}`: Get customer by ID
- `GET /customers/search`: Search customers by keyword
- `POST /customers`: Create a new customer
- `PUT /customers/{id}`: Update a customer
- `DELETE /customers/{id}`: Delete a customer

### Accounts

- `GET /operations/{id}`: Get account by ID
- `GET /accounts`: Get all accounts
- `GET /customers/{customerId}/accounts`: Get accounts by customer ID
- `POST /accounts`: Create a new account

### Operations

- `GET /operations/{accountId}/operations`: Get operations for an account
- `GET /operations/{accountId}/pageOperations`: Get paginated operations for an account
- `POST /operations/debit`: Perform a debit operation
- `POST /operations/credit`: Perform a credit operation
- `POST /operations/transfer`: Perform a transfer between accounts

## Database Configuration

Configure your database settings in `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/bank-db
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
```

## Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/digital-banking-app.git
   cd digital-banking-app/backend
   ```

2. **Configure the database** in `application.properties`

3. **Build and run the application**:

   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

4. The application will start on port 8080 (default)

## Security

The application uses JWT (JSON Web Token) for authentication and authorization:

- Token-based authentication system
- Role-based access control (ADMIN, USER roles)
- Protected endpoints requiring authentication
- Secure password handling
