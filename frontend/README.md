# Digital Banking App Frontend

This is the frontend application for the Digital Banking system, built with Angular. This application provides a user interface for managing bank accounts, customer information, and performing banking operations.

## Features

- Dashboard with summary of accounts and recent operations
- Customer management (view, add, edit, delete)
- Account management (view, create, update accounts)
- Banking operations:
  - Debit operations
  - Credit operations
  - Transfer between accounts
- Operation history and details
- Responsive design for desktop and mobile devices

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── accounts/         # Account management components
│   │   ├── customers/        # Customer management components
│   │   ├── dashboard/        # Dashboard components
│   │   ├── models/           # TypeScript models/interfaces
│   │   ├── operations/       # Operation components
│   │   ├── services/         # Angular services for API communication
│   │   ├── shared/           # Shared components, directives, and pipes
│   │   ├── app.component.*   # Root component
│   │   ├── app.module.ts     # Root module
│   │   └── app-routing.module.ts # Application routes
│   ├── assets/               # Static assets (images, icons)
│   ├── environments/         # Environment configuration
│   └── styles/               # Global styles
└── angular.json              # Angular configuration
```

## Setup and Installation

### Prerequisites

- Node.js (v14 or higher)
- NPM (v6 or higher)
- Angular CLI (v12 or higher)

### Installation Steps

1. Clone the repository

   ```bash
   git clone https://github.com/ImadIdaliouali/digital-banking-app.git
   cd digital-banking-app/frontend
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Configure the environment

   Edit `src/environments/environment.ts` and set the `backendHost` to point to your backend server:

   ```typescript
   export const environment = {
     production: false,
     backendHost: "http://localhost:8085", // Change to your backend URL
   };
   ```

4. Run the development server

   ```bash
   ng serve
   ```

5. Open your browser and navigate to `http://localhost:4200`

## Models

The application uses the following data models:

- **CustomerDTO**: Represents customer data
- **BankAccountDTO**: Basic bank account information
- **AccountDetails**: Detailed account information with operations
- **AccountOperationDTO**: Banking operations (debit, credit, transfer)

## API Communication

The application communicates with the backend through services defined in the `services` directory:

- **AccountsService**: Handles account-related operations
- **CustomersService**: Manages customer data
- **AuthService**: Handles authentication (if implemented)

## Building for Production

To build the application for production, run:

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.
