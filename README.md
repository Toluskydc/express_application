<<<<<<< HEAD

# Blog Post Project: User Authentication, KYC, and Post Management

This project demonstrates the implementation of **User Authentication**, **KYC (Know Your Customer)** process, and **Post Management** in a **Node.js** application using **MongoDB**. The project includes user registration, login functionality, authorization middleware, and relationships between **User**, **KYC**, and **Post** models.

## Features

1. **User Authentication**:
   - User registration and login with JWT token-based authentication.

2. **Model Relationships**:
   - One-to-one relationship between `User` and `KYC` models.
   - One-to-many relationship between `User` and `Post` models.

3. **Authorization Middleware**:
   - Middleware to ensure that only authenticated users can access certain routes.

## Setup and Installation

### 1. Clone the Repository
```bash
git clone https://github.com/toluskydc/express_application.git
cd your-project-name
```

### 2. Install Dependencies
Make sure you have **Node.js** installed. Run the following command to install the necessary dependencies:

```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root of the project and add the following variables:

```bash
MONGO_URI=mongodb://localhost:27017/your-database-name
JWT_SECRET=your-jwt-secret-key
```

### 4. Run the Application
Start the server using:

```bash
npm start
```

The server will run on `http://localhost:4000`.

