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

## 🔐 Authentication

The application now includes comprehensive JWT-based authentication with role-based access control:

- **JWT Token Authentication**: Secure token-based authentication
- **Role-based Access Control (RBAC)**: Differentiated ADMIN and USER experiences
- **Protected Routes**: Frontend routes protected by role-specific guards
- **HTTP Interceptors**: Automatic token attachment to API requests
- **Dynamic Navigation**: Menu changes based on user role
- **Data Filtering**: Users see only their own data, admins see everything

### User Role Differences:

- **Admin Users**: Full dashboard, customer management, all accounts, system operations
- **Regular Users**: Personal dashboard, own accounts only, limited transfers

**📋 RBAC Details**: See [RBAC_IMPLEMENTATION_GUIDE.md](RBAC_IMPLEMENTATION_GUIDE.md) for comprehensive documentation.

### Default Credentials

The application comes with pre-configured users:

| Username | Password | Role  |
| -------- | -------- | ----- |
| admin    | admin123 | ADMIN |
| user     | user123  | USER  |

### Authentication Endpoints

- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration

## 📚 API Documentation

Once the backend is running, access the Swagger UI at:
`http://localhost:8085/swagger-ui.html`

**🔐 For Swagger Authentication**: See [SWAGGER_AUTHENTICATION.md](SWAGGER_AUTHENTICATION.md) for detailed instructions on how to authenticate and test protected endpoints in Swagger UI.

**🔧 Swagger UI Issues**: If you encounter 404 errors with Swagger UI, see [SWAGGER_UI_FIX_GUIDE.md](SWAGGER_UI_FIX_GUIDE.md) for troubleshooting steps.

### Key API Endpoints

#### Authentication

- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration

#### Customers

- `GET /api/customers` - Get all customers
- `POST /api/customers` - Create customer
- `GET /api/customers/{id}` - Get customer by ID
- `PUT /api/customers/{id}` - Update customer
- `DELETE /api/customers/{id}` - Delete customer
- `GET /api/customers/search?keyword={keyword}` - Search customers

#### Accounts

- `GET /api/accounts` - Get all accounts
- `GET /api/accounts/{id}` - Get account by ID
- `GET /api/accounts/{id}/operations` - Get account operations
- `GET /api/accounts/{id}/pageOperations` - Get paginated operations

#### Operations

- `POST /api/accounts/credit` - Credit account
- `POST /api/accounts/debit` - Debit account
- `POST /api/accounts/transfer` - Transfer between accounts

## 🎨 Frontend Features

The Angular frontend includes:

- **Modern UI**: Bootstrap 5 with custom styling
- **Responsive Design**: Mobile-first approach
- **Dashboard**: Overview of customers, accounts, and balances
- **Customer Management**: Full CRUD operations with search
- **Account Management**: View accounts and balances
- **Banking Operations**: Credit, debit, and transfer operations
- **Authentication**: Login/logout with JWT
- **Navigation**: Sidebar navigation with user profile
- **Form Validation**: Real-time validation with error messages
- **Loading States**: Spinners and loading indicators

## 🔧 Configuration

### Backend Configuration

Edit `backend/src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/bank-db
spring.datasource.username=bank_user
spring.datasource.password=bank_pass

# JWT Configuration
app.jwtSecret=mySecretKey123456789012345678901234567890
app.jwtExpirationMs=86400000

# Server Configuration
server.port=8085
```

### Frontend Configuration

Edit `frontend/src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:8085/api",
};
```

## 🚀 Quick Start

1. **Start the Backend**:

   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```

2. **Start the Frontend**:

   ```bash
   cd frontend
   npm install
   npm start
   ```

3. **Access the Application**:

   - Frontend: `http://localhost:4200`
   - Backend API: `http://localhost:8085`
   - Swagger UI: `http://localhost:8085/swagger-ui.html`

4. **Login**: Use the default credentials with username/password format:
   - **Admin**: Username: `admin`, Password: `admin123` (Full access)
   - **User**: Username: `user`, Password: `user123` (Limited access)

## 🛠️ Development

### Backend Development

- The backend uses Spring Boot with auto-reload enabled
- API documentation is available via Swagger
- Database schema is auto-generated via Hibernate

### Frontend Development

- Angular CLI provides hot reload during development
- Bootstrap components are used for consistent styling
- Services handle API communication with error handling

## 📱 Application Structure

```
digital-banking-app/
├── backend/                 # Spring Boot backend
│   ├── src/main/java/
│   │   ├── entities/       # JPA entities
│   │   ├── repositories/   # Data repositories
│   │   ├── services/       # Business logic
│   │   ├── web/           # REST controllers
│   │   ├── security/      # JWT security config
│   │   └── dtos/          # Data transfer objects
│   └── src/main/resources/
│       └── application.properties
├── frontend/               # Angular frontend
│   ├── src/app/
│   │   ├── core/          # Core services and models
│   │   ├── features/      # Feature modules
│   │   ├── shared/        # Shared components
│   │   └── environments/  # Environment configs
│   └── src/assets/
└── README.md
```
