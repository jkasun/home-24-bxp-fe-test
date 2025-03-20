# Home 24 BXP Front End Test

## Front End

### Overview

This project is a front-end implementation for Home 24 BXP test. The application displays a hierarchical category structure with parent-child relationships. The current implementation fetches parent categories individually using their parentId from the API, which could be optimized for better performance.

The application is primarily designed for desktop usage, as it's intended to be a dashboard application. However, the Products page has been optimized to demonstrate responsive design capabilities, showcasing the ability to adapt the interface for mobile devices while maintaining functionality.

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Environment Configuration
The application uses environment variables for configuration. A `.env` file is required in the `app` directory. You can use the provided `example.env` as a template.

1. Copy the example environment file:
   ```bash
   cp app/example.env app/.env
   ```

2. Configure the following variables in `.env`:

   ```env
   # API Configuration
   VITE_API_BASE_URL=http://localhost:8080

   # Service Configuration
   VITE_USE_MOCK_SERVICES=false

   # Mock Service Configuration (only used when VITE_USE_MOCK_SERVICES is true)
   VITE_MOCK_API_DELAY=500
   VITE_MOCK_TEST_USERNAME=test
   VITE_MOCK_TEST_PASSWORD=test
   ```

   - `VITE_API_BASE_URL`: The base URL for the API server
   - `VITE_USE_MOCK_SERVICES`: Set to `true` to use mock services instead of real API calls
   - `VITE_MOCK_API_DELAY`: Simulated API delay in milliseconds (only used with mock services)
   - `VITE_MOCK_TEST_USERNAME`: Username for mock authentication (only used with mock services)
   - `VITE_MOCK_TEST_PASSWORD`: Password for mock authentication (only used with mock services)

### Technologies Used
- React.js
- TypeScript
- Jest for unit testing
- React Testing Library

### Setting up the Project
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## Possible Improvements of the Project

### Performance Optimizations
1. **Category Data Fetching**
   - Current implementation fetches parent categories one by one using parentId
   - Could be improved by:
     - Implementing batch fetching for parent categories
     - Caching parent category data
     - Using a more efficient data structure for parent-child relationships

2. **React Performance**
   - Additional memoization could be implemented using:
     - `useCallback` for function memoization
     - `useMemo` for computed value memoization
   - These optimizations were not fully implemented due to time constraints

### Testing
- Currently only one unit test is implemented as a demonstration
- Future improvements could include:
  - Comprehensive unit test coverage
  - Integration tests
  - End-to-end tests
  - Test coverage for edge cases and error scenarios


## Mock API

### Overview
The project includes a mock API server built using `json-server` to simulate backend functionality. The API provides endpoints for categories, products, and authentication.

### Setup
1. Navigate to the mock-api directory:
   ```bash
   cd mock-api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the mock API server:
   ```bash
   npm start
   ```
   The server will start on port 8080.

### Available Endpoints

#### Authentication
- **POST /login**
  - Authenticates user credentials
  - Request body:
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
  - Returns JWT token on successful authentication

#### Categories
- **GET /categories**
  - Retrieves all categories
- **GET /categories/:id**
  - Retrieves a specific category by ID
- **POST /categories**
  - Creates a new category
  - Request body:
    ```json
    {
      "name": "string",
      "parentId": "number (optional)"
    }
    ```
- **PUT /categories/:id**
  - Updates an entire category
  - Request body:
    ```json
    {
      "name": "string",
      "parentId": "number (optional)"
    }
    ```
- **PATCH /categories/:id**
  - Partially updates a category
  - Request body:
    ```json
    {
      "name": "string (optional)",
      "parentId": "number (optional)"
    }
    ```
- **DELETE /categories/:id**
  - Deletes a category by ID

#### Products
- **GET /products**
  - Retrieves all products
- **GET /products/:id**
  - Retrieves a specific product by ID
- **POST /products**
  - Creates a new product
  - Request body:
    ```json
    {
      "name": "string",
      "categoryId": "number",
      "price": "number",
      "description": "string"
    }
    ```
- **PUT /products/:id**
  - Updates an entire product
  - Request body:
    ```json
    {
      "name": "string",
      "categoryId": "number",
      "price": "number",
      "description": "string"
    }
    ```
- **PATCH /products/:id**
  - Partially updates a product
  - Request body:
    ```json
    {
      "name": "string (optional)",
      "categoryId": "number (optional)",
      "price": "number (optional)",
      "description": "string (optional)"
    }
    ```
- **DELETE /products/:id**
  - Deletes a product by ID

### Project Structure
- `db.js`: Main database configuration file that combines categories and products data
- `login.middleware.js`: Custom middleware for handling authentication
- `routes.json`: Route configuration for the API endpoints
- `data/`: Directory containing mock data files (categories, products, users)

### Dependencies
- json-server: v0.17.4
  - Provides a REST API with zero coding
  - Supports custom routes and middleware
  - Enables full CRUD operations

