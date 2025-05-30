Express User Management API
This is a simple user management API built with Express.js. It follows standard industrial practices in structuring an Express application and implements core user operations such as registration, login, update, and deletion.

🚀 Features
Register a new user

Login a user

Get all users

Update a user account

Delete a user account


📡 API Endpoints
| Method | Endpoint           | Description          |
| ------ | ------------------ | -------------------- |
| POST   | `/api/users`       | Create/register user |
| POST   | `/api/users/login` | Login user           |
| GET    | `/api/users`       | Get all users        |
| PUT    | `/api/users/:id`   | Update user by ID    |
| DELETE | `/api/users/:id`   | Delete user by ID    |


🧠 Folder Breakdown
/models/userModel.js
Defines the User schema with fields:

name: String

email: String

password: String

isAdmin: Boolean

hobbies: Array of Strings

/controllers/userController.js
Handles:

Creating a user

Logging in a user

Fetching all users

Updating a user

Deleting a user

/routes/userRoutes.js
Routes HTTP requests to the appropriate controller methods.




