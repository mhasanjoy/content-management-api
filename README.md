# Content Management API

## Authentication

This section provides the details of the Authentication API for user registration, login and token refresh functionality.

## **Routes**

### 1. **User Registration**

- **Route**: `/api/auth/register`
- **Method**: `POST`
- **Description**: Registers a new user.

#### Request Body:

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "strongpassword"
}
```

#### Response (Success - 201 Created):

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "unique-user-id",
    "name": "John Doe",
    "email": "john.doe@example.com"
  }
}
```

#### Response (Error - 500 Internal Server Error):

```json
{
  "success": false,
  "message": "User registration failed"
}
```

### 2. **User Login**

- **Route**: `/api/auth/login`
- **Method**: `POST`
- **Description**: Logs in an existing user and returns JWT tokens.

#### Request Body:

```json
{
  "email": "john.doe@example.com",
  "password": "strongpassword"
}
```

#### Response (Success - 200 OK):

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "your-access-token",
    "refreshToken": "your-refresh-token"
  }
}
```

#### Response (Error - 401 Unauthorized):

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### 3. **Token Refresh**

- **Route**: `/api/auth/refresh-token`
- **Method**: `POST`
- **Description**: Refreshes the JWT token using the refresh token provided.

#### Request Body:

```json
{
  "refreshToken": "your-refresh-token"
}
```

#### Response (Success - 201 Created):

```json
{
  "success": true,
  "message": "Token refreshed",
  "data": {
    "accessToken": "new-access-token"
  }
}
```

#### Response (Error - 403 Forbidden):

```json
{
  "success": false,
  "message": "Invalid or expired refresh token"
}
```

# User

This section provides the details of the User API for fetching user profiles and updating them.

---

## **Routes**

### 1. **Get All Users**

- **Route**: `/api/users`
- **Method**: `GET`
- **Description**: Fetches a list of all users.

#### Response (Success - 200 OK):

```json
{
  "success": true,
  "data": [
    {
      "id": "user-id-1",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "bio": "This is a bio"
    },
    {
      "id": "user-id-2",
      "name": "Jane Doe",
      "email": "jane.doe@example.com",
      "bio": "This is another bio"
    }
  ]
}
```

#### Response (Error - 500 Internal Server Error):

```json
{
  "success": false,
  "message": "Failed to fetch users"
}
```

### 2. **Get User Profile (Logged-in User)**

- **Route**: `/api/users/profile`
- **Method**: `GET`
- **Description**: Fetches the profile of the logged-in user.

#### Response (Success - 200 OK):

```json
{
  "success": true,
  "data": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "bio": "This is the logged-in user's bio",
    "contents": [
      {
        "id": "content-id-1",
        "title": "Sample Content 1",
        "youtubeUrl": "https://youtube.com/sample1",
        "publiclyViewable": true
      },
      {
        "id": "content-id-2",
        "title": "Sample Content 2",
        "youtubeUrl": "https://youtube.com/sample2",
        "publiclyViewable": false
      }
    ]
  }
}
```

#### Response (Error - 401 Unauthorized):

```json
{
  "success": false,
  "message": "Authorization required"
}
```

### 3. **Get User Profile (Public User)**

- **Route**: `/api/users/:id`
- **Method**: `GET`
- **Description**: Fetches the profile of a user by their user ID (publicly accessible).

#### Response (Success - 200 OK):

```json
{
  "success": true,
  "data": {
    "id": "user-id",
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "bio": "This is Jane's bio",
    "contents": [
      {
        "id": "content-id-1",
        "title": "Sample Content 1",
        "youtubeUrl": "https://youtube.com/sample1",
        "publiclyViewable": true
      }
    ]
  }
}
```

#### Response (Error - 404 Not Found):

```json
{
  "success": false,
  "message": "User not found"
}
```

### 4. **Update User Profile**

- **Route**: `/api/users/profile`
- **Method**: `PUT`
- **Description**: Updates the profile of the logged-in user.

#### Request Body:

```json
{
  "name": "Updated Name",
  "email": "updated.email@example.com",
  "bio": "Updated bio"
}
```

#### Response (Success - 200 OK):

```json
{
  "success": true,
  "message": "Profile updated successfully"
}
```

#### Response (Error - 403 Forbidden):

```json
{
  "success": false,
  "message": "Access denied"
}
```

# Content

This section provides the details of the Content API for creating, updating and deleting content.

---

## **Routes**

### 1. **Create Content**

- **Route**: `/api/contents`
- **Method**: `POST`
- **Description**: Creates new content for the logged-in user.

#### Request Body:

```json
{
  "title": "Sample Content Title",
  "youtubeUrl": "https://youtube.com/sample-url",
  "publiclyViewable": true
}
```

#### Response (Success - 201 Created):

```json
{
  "success": true,
  "message": "Content created successfully",
  "data": {
    "id": "content-id",
    "title": "Sample Content Title",
    "youtubeUrl": "https://youtube.com/sample-url",
    "publiclyViewable": true,
    "userId": "user-id"
  }
}
```

#### Response (Error - 500 Internal Server Error):

```json
{
  "success": false,
  "message": "Content creation failed"
}
```

### 2. **Update Content**

- **Route**: `/api/contents/:id`
- **Method**: `PUT`
- **Description**: Updates the content by its id for the logged-in user.

#### Request Body:

```json
{
  "title": "Updated Content Title",
  "youtubeUrl": "https://youtube.com/updated-url",
  "publiclyViewable": false
}
```

#### Response (Success - 200 OK):

```json
{
  "success": true,
  "message": "Content updated successfully"
}
```

#### Response (Error - 404 Not Found):

```json
{
  "success": false,
  "message": "Content not found"
}
```

### 3. **Delete Content**

- **Route**: `/api/contents/:id`
- **Method**: `DELETE`
- **Description**: Deletes the content by its id for the logged-in user.

#### Response (Success - 200 OK):

```json
{
  "success": true,
  "message": "Content deleted successfully"
}
```

#### Response (Error - 403 Forbidden):

```json
{
  "success": false,
  "message": "Access denied"
}
```

## Error Codes

The API responds with appropriate status codes depending on the outcome of the request. Below are some common error responses:

- 400 Bad Request: The request is invalid. This can happen if required fields are missing or the data format is incorrect.

- 401 Unauthorized: Authentication failed. The user provided an invalid or missing token.

- 403 Forbidden: The user does not have permission to update or delete the resource.

- 404 Not Found: The requested resource was not found on the server.

- 500 Internal Server Error: Something went wrong on the server. Contact the admin.
