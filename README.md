# Kosten
Expense tracker for all.
Track expenses, manage budgets, and gain insights into your spending habits with our simple and intuitive expense tracker.

- FrontEnd -> Typescript(Next.js)
- BackEnd -> Java(Spring Boot)

## Preview
<!-- https://github.com/user-attachments/assets/934c7aa3-cab2-4f59-b2cc-2af524b0b3a5 -->
https://github.com/user-attachments/assets/41c48086-2cc2-444d-acff-f342799fa73c

## Authorization Strategy
users basic authorization to verify if an user is who he says he is
every transaction api requires an header Authorization  with value
Basic user_id:user_email:hashedPassword if every value is a match with the user with user_id
then the user is deamed valid and access the api

The server uses a custom Basic Authorization mechanism to verify that a user is who they claim to be before allowing access to protected APIs.

### Authorization Header Format
All transaction-related APIs require an Authorization header with the following format:
`Authorization: Basic user_id:user_email:hashedPassword`
Where:
- user_id — Unique identifier of the user in the database
- user_email — Email address associated with the user
- hashedPassword — Stored (hashed) password of the user

### Validation Flow
- The client sends a request to a protected API endpoint with the Authorization header.
- The server extracts user_id, user_email, and hashedPassword from the header.
- The server looks up the user by user_id.
- The request is considered authorized only if all of the following match the stored user record:
  - User ID
  - Email
  - Hashed password
- If validation succeeds, the user is treated as authenticated, and the request is allowed to proceed.
- If any value does not match, the request is rejected with an unauthorized error.

### Scope of Protection
All transaction-related endpoints require this authorization header.
Requests without the header or with invalid credentials are denied.

> [!Note]
> This approach provides identity verification but does not implement session management or
> token-based authentication. It is intended for simplicity and controlled environments 
> rather than public-facing production use.

## Future Plan
- Use JWT Authentication and Authorization insted of this basic authentication model
- Create Reporting Element on User Dashboard
- Date wise transactions implementation for transaction
- Sanitise codebase removing/abstracting duplicate codes
- user form validation library instead of hand rolled implementation.

## Backend REST API
```make
    POST http://127.0.0.1:8080/api/auth/signin # for sign in
    POST http://127.0.0.1:8080/api/auth/signup # for sign up
    GET http://127.0.0.1:8080/api/transaction/get # get all transactions
    GET http://127.0.0.1:8080/api/transaction/expense/get # get all expense
    POST http://127.0.0.1:8080/api/transaction/expense/create # create expense
    GET http://127.0.0.1:8080/api/transaction/expense/total/sum # get expense total amount
    GET http://127.0.0.1:8080/api/transaction/expense/total/count # get total count of expense
    GET http://127.0.0.1:8080/api/transaction/income/get # get all income
    POST http://127.0.0.1:8080/api/transaction/income/create # create income
    GET http://127.0.0.1:8080/api/transaction/income/total/sum # get income total amount
    GET http://127.0.0.1:8080/api/transaction/income/total/count # get income count of income
    DELETE http://127.0.0.1:8080/api/transaction/delete/__id__ # delete transaction with identifier id
```

## Database Schema
### User Schema
```java
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Size(min = 3, max = 20)
  private String name;

  @NotBlank
  @Email
  private String email;

  @NotBlank
  private String hashedPassword;

  private boolean active;

  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
}
```
### Transaction Schema
```java
public class Transaction {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  private String name;

  private String label;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @NotBlank
  @Column(name = "transaction_category")
  private String transactionCategory;

  @NotNull
  @Enumerated(EnumType.STRING)
  @Column(name = "transaction_type")
  private TransactionType transactionType;

  @Enumerated(EnumType.STRING)
  @Column(name = "transaction_frequency")
  private TransactionFrequency transactionFrequency;

  @NotNull
  private BigDecimal amount;

  @NotNull
  @Column(name = "transaction_date")
  private LocalDate transactionDate;

  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
}
```

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
