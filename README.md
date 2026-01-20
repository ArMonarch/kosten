# Kosten
Expense tracker for all.
Track expenses, manage budgets, and gain insights into your spending habits with our simple and intuitive expense tracker.

- FrontEnd -> Typescript(Next.js)
- BackEnd -> Java(Spring Boot)

## Preview
https://github.com/user-attachments/assets/934c7aa3-cab2-4f59-b2cc-2af524b0b3a5

## Project Structure
```
├──  apps # Contains all application-level source code for the project.
│   ├──  kosten-client # Frontend application responsible for the user interface and user interactions(expense, income, client-side state handling).
│   └──  kosten-server # Backend application that provides REST APIs, handles business logic, authentication.
└── 󰂺 README.md # Defines this project readme
```

### Kosten Client Structure 
```
├──  public # Static assets served directly by the frontend (images, icons, etc.).
├── 󰣞 src # Main source code for the client application.
│   ├──  app # Next.js App Router structure defining routes, layouts, and pages.
│   │   ├──  auth # Authentication-related routes and pages.
│   │   │   ├──  login # User login
│   │   │   └──  signup # User signup
│   │   ├──  dashboard # Application dashboard and feature-specific views.
│   │   │   ├──  dashboard # Overview and summary views
│   │   │   ├──  expenses # Expense management pages
│   │   │   ├──  incomes # Income management pages
│   │   │   └──  transactions # Combined view of all transactions
│   │   ├──  favicon.ico # Application favicon.
│   │   ├──  globals.css # Global CSS styles applied across the app.
│   │   ├──  layout.tsx # Root layout component shared across all routes.
│   │   └──  page.tsx # Application entry (landing) page.
│   ├──  components # Reusable UI components used throughout the application.
│   ├──  hooks # Custom React hooks encapsulating business logic and data fetching.
│   │   ├──  useAuth.ts # Authentication state and actions
│   │   ├──  useExpense.ts # Expense-related logic
│   │   ├──  useIncome.ts # Income-related logic
│   │   ├──  useMobile.ts # Responsive and device detection logic
│   │   └──  useTransaction.ts # Unified transaction handling
│   ├──  lib # Shared utilities, helpers, and configuration logic.
│   ├──  store # Global state management (e.g., client-side stores).
│   └──  types # Shared TypeScript type definitions and interfaces.
├──  bun.lock # Dependency lock file for Bun.
├──  eslint.config.mjs # ESLint configuration for code quality and consistency.
├──  flake.lock/ flake.nix Nix flake configuration for reproducible development environments.
├──  next.config.ts # Next.js framework configuration.
├──  package.json # Project metadata, scripts, and dependencies.
├──  postcss.config.mjs # PostCSS configuration for CSS processing.
├── 󰂺 README.md # Client-side project documentation and setup instructions.
└──  tsconfig.json # TypeScript compiler configuration.
```

### Kosten Server Structure 
```
├── 󰣞 src # Root
│   ├──  main/java/armonarch/kosten # Root package containing all backend source code.
│   │   ├──  controllers # REST controllers exposing HTTP endpoints for authentication, transactions, and basic health/greeting checks.
│   │   │   ├──  AuthenticationController.java
│   │   │   ├──  GreetingController.java
│   │   │   └──  TransactionController.java
│   │   ├──  dto # Data Transfer Objects used for request/response payloads and standardized API responses.
│   │   │   ├──  ApiErrorResponse.java
│   │   │   ├──  ApiResponse.java
│   │   │   ├──  AuthResponse.java
│   │   │   ├──  GreetingResponse.java
│   │   │   ├──  SignInRequest.java
│   │   │   ├──  SignUpRequest.java
│   │   │   ├──  TransactionRequest.java
│   │   │   └──  TransactionResponse.java
│   │   ├──  enums # Enumerations defining fixed domain values such as transaction type and frequency.
│   │   │   ├──  TransactionFrequency.java
│   │   │   └──  TransactionType.java
│   │   ├──  exceptions # Custom exception classes representing domain-specific and authorization errors.
│   │   │   ├──  TransactionNotFoundException.java
│   │   │   ├──  UnauthorizedException.java
│   │   │   └──  UserNotFoundException.java
│   │   ├──  handlers # Centralized exception handlers mapping exceptions to consistent HTTP responses.
│   │   │   ├──  AuthExceptionHandler.java
│   │   │   ├──  GlobalExceptionHandler.java
│   │   │   ├──  TransactionExceptionHandler.java
│   │   │   └──  UserExceptionHandler.java
│   │   ├──  models # JPA entity classes representing core domain objects (User, Transaction).
│   │   │   ├──  Transaction.java
│   │   │   └──  User.java
│   │   ├──  repository # Spring Data repositories for database access and persistence.
│   │   │   ├──  TransactionRepository.java
│   │   │   └──  UserRepository.java
│   │   ├──  services # Business logic layer handling authentication, user management, and transaction operations.
│   │   │   ├──  AuthenticationService.java
│   │   │   ├──  TransactionService.java
│   │   │   └──  UserService.java
│   │   ├──  KostenApplication.java # Spring Boot application entry point.
│   │   └──  resources
│   │       └──  application.properties # Application configuration (database, server, and environment settings).
│   └──  test # Unit and integration tests for backend components.
├──  flake.lock/flake.nix Nix configuration for reproducible backend development environments.
└──  pom.xml # Maven build configuration, dependencies, and project metadata.
```

## Installation
### Client Installation
#### Prerequisites
- Bun (for package management and running the app)
- (Optional) Nix (for reproducible development environment)
#### Setup (without Nix)
```bash
cd apps/kosten-client
bun install
bun run dev
```
Build for production:
```bash
bun run build
```
#### Setup (with nix)
Automatically install required dependencies and drops you into an shell with the required dependencies installed and added to path temporarily,
doesn't pollute your environment.
```bash
nix develop
bun install
bun run dev
```

### Server Installation
#### Prerequisites
- JDK 25
- Maven
- PostgreSQL (database created with valid username and password)
Ensure the database credentials and connection URL are configured in `src/main/resources/application.properties`.
```bash
cd apps/kosten-server
nix develop (if using nix)
mvn spring-boot:run
```
