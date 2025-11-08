# Backend API - VibeCart

A production-ready RESTful API built with Node.js, Express, and MongoDB for the VibeCart e-commerce application.

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [API Endpoints](#-api-endpoints)
- [Database Models](#-database-models)
- [Authentication](#-authentication)
- [Error Handling](#-error-handling)
- [Development](#-development)
- [Production](#-production)

## 🚀 Tech Stack

- **Runtime:** Node.js 18+
- **Framework:** Express.js 5.1.0
- **Database:** MongoDB with Mongoose 8.19.3
- **Authentication:** JWT (jsonwebtoken 9.0.2)
- **Password Hashing:** bcryptjs 3.0.3
- **HTTP Client:** Axios 1.13.2
- **Logging:** Morgan 1.10.1
- **Environment:** dotenv 17.2.3

## ✨ Features

- 🔐 JWT-based authentication (register, login, protected routes)
- 🛒 User-specific shopping cart management
- 📦 Product catalog with Fake Store API integration
- 💳 Mock checkout system
- 🗄️ MongoDB data persistence
- 🛡️ Error handling middleware
- 🔄 Async/await error wrapper
- 📝 Request logging with Morgan
- 🌐 CORS enabled for frontend integration

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   │   ├── db.js        # MongoDB connection
│   │   └── env.js       # Environment variables
│   ├── controllers/      # Route controllers
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   └── productController.js
│   ├── middleware/       # Express middleware
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   ├── models/          # Mongoose schemas
│   │   ├── CartItem.js
│   │   ├── Product.js
│   │   └── User.js
│   ├── routes/          # API routes
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── checkoutRoutes.js
│   │   ├── productRoutes.js
│   │   └── index.js
│   ├── services/        # Business logic
│   │   ├── cartService.js
│   │   ├── productService.js
│   │   └── userService.js
│   ├── utils/          # Utility functions
│   │   ├── asyncHandler.js
│   │   └── token.js
│   ├── app.js          # Express app configuration
│   └── server.js       # Server entry point
├── env.example         # Environment variables template
├── package.json
└── README.md
```

## 🔧 Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- MongoDB instance (local or cloud)
  - Local: MongoDB Community Server
  - Cloud: MongoDB Atlas (recommended for production)

## 📦 Installation

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```

4. **Configure your `.env` file** (see Configuration section)

5. **Start MongoDB:**
   - Local: Ensure MongoDB service is running
   - Cloud: Use your MongoDB Atlas connection string

6. **Start the development server:**
   ```bash
   npm run dev
   ```

The server will automatically:
- Connect to MongoDB
- Seed products from Fake Store API (with fallback data)
- Create a demo user account

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port number | `5000` | No |
| `NODE_ENV` | Environment mode | `development` | No |
| `MONGO_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/mock-ecom-cart` | Yes |
| `JWT_SECRET` | Secret key for JWT tokens | `supersecretmockkey` | Yes (change in production!) |
| `JWT_EXPIRES_IN` | JWT token expiration time | `2h` | No |
| `FAKE_STORE_URL` | Fake Store API endpoint | `https://fakestoreapi.com/products?limit=8` | No |

### Example `.env` file:

```env
PORT=5000
NODE_ENV=development

MONGO_URI=mongodb://127.0.0.1:27017/mock-ecom-cart

JWT_SECRET=your_super_secret_key_here_change_in_production
JWT_EXPIRES_IN=2h

FAKE_STORE_URL=https://fakestoreapi.com/products?limit=8
```

### MongoDB Connection

**Local MongoDB:**
```env
MONGO_URI=mongodb://127.0.0.1:27017/mock-ecom-cart
```

**MongoDB Atlas:**
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mock-ecom-cart?retryWrites=true&w=majority
```

## 🔌 API Endpoints

Base URL: `http://localhost:5000/api`

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "message": "Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "demo@vibecommerce.com",
  "password": "Password123!"
}
```

**Response (200):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Demo Shopper",
    "email": "demo@vibecommerce.com"
  }
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Demo Shopper",
    "email": "demo@vibecommerce.com"
  }
}
```

### Product Endpoints

#### Get All Products
```http
GET /api/products
```

**Response (200):**
```json
{
  "products": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Product Name",
      "description": "Product description",
      "price": 29.99,
      "image": "https://example.com/image.jpg",
      "category": "electronics",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Cart Endpoints (Protected)

All cart endpoints require authentication via Bearer token.

#### Get User Cart
```http
GET /api/cart
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "items": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "product": {
        "_id": "507f1f77bcf86cd799439012",
        "title": "Product Name",
        "price": 29.99,
        "image": "https://example.com/image.jpg"
      },
      "quantity": 2
    }
  ],
  "total": 59.98
}
```

#### Add Item to Cart
```http
POST /api/cart
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "507f1f77bcf86cd799439012",
  "qty": 1
}
```

**Response (201):**
```json
{
  "item": {
    "_id": "507f1f77bcf86cd799439011",
    "product": { ... },
    "quantity": 1
  }
}
```

#### Remove Item from Cart
```http
DELETE /api/cart/:id
Authorization: Bearer <token>
```

**Response (204):** No content

### Checkout Endpoint (Protected)

#### Process Checkout
```http
POST /api/checkout
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "cartItems": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "quantity": 2,
      "product": {
        "_id": "507f1f77bcf86cd799439012",
        "title": "Product Name",
        "price": 29.99
      }
    }
  ]
}
```

**Response (200):**
```json
{
  "message": "Checkout successful",
  "total": 59.98,
  "timestamp": "2024-01-01T12:00:00.000Z",
  "receipt": {
    "customer": {
      "name": "John Doe",
      "email": "john@example.com"
    },
    "items": [ ... ]
  }
}
```

## 🗄️ Database Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (required, hashed),
  timestamps: true
}
```

### Product Model
```javascript
{
  title: String (required),
  description: String,
  price: Number (required, min: 0),
  image: String,
  category: String (default: 'general'),
  externalId: String (unique, sparse),
  timestamps: true
}
```

### CartItem Model
```javascript
{
  user: ObjectId (required, ref: 'User'),
  product: ObjectId (required, ref: 'Product'),
  quantity: Number (required, default: 1, min: 1),
  timestamps: true
}
```

**Indexes:**
- Unique compound index on `(user, product)` to prevent duplicate items

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### How it works:

1. **Registration/Login:** User receives a JWT token
2. **Protected Routes:** Include token in `Authorization` header:
   ```
   Authorization: Bearer <token>
   ```
3. **Token Validation:** Middleware verifies token and attaches user to request
4. **Token Expiration:** Tokens expire after 2 hours (configurable)

### Demo Credentials

- **Email:** `demo@vibecommerce.com`
- **Password:** `Password123!`

This account is automatically created on server startup.

## ⚠️ Error Handling

The API uses centralized error handling:

- **400 Bad Request:** Invalid input data
- **401 Unauthorized:** Missing or invalid token
- **404 Not Found:** Resource not found
- **409 Conflict:** Duplicate resource (e.g., email already exists)
- **500 Internal Server Error:** Server errors

**Error Response Format:**
```json
{
  "message": "Error message here",
  "stack": "Error stack (development only)"
}
```

## 🛠️ Development

### Available Scripts:

```bash
# Start development server with hot reload
npm run dev

# Start production server
npm start

# Run linter (placeholder)
npm run lint
```

### Development Features:

- **Hot Reload:** Uses nodemon for automatic server restart
- **Request Logging:** Morgan middleware logs all HTTP requests
- **Error Stack Traces:** Full error details in development mode
- **CORS:** Enabled for frontend development

## 🚀 Production

### Build Steps:

1. **Set production environment:**
   ```env
   NODE_ENV=production
   ```

2. **Use strong JWT secret:**
   ```env
   JWT_SECRET=your_very_strong_random_secret_key_here
   ```

3. **Configure MongoDB Atlas:**
   ```env
   MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
   ```

4. **Start server:**
   ```bash
   npm start
   ```

### Production Considerations:

- ✅ Use environment variables for all secrets
- ✅ Enable HTTPS
- ✅ Set up proper CORS origins
- ✅ Use MongoDB Atlas or managed database
- ✅ Implement rate limiting
- ✅ Add request validation
- ✅ Set up monitoring and logging
- ✅ Use process manager (PM2, etc.)

## 📝 Notes

- Products are automatically seeded from Fake Store API on first run
- If Fake Store API fails, fallback products are used
- Cart items are user-specific and persist across sessions
- Checkout clears the user's cart after successful processing
- All timestamps are automatically managed by Mongoose

## 🤝 Contributing

This is a screening project for Vibe Commerce. Feel free to fork and extend for your own use.

## 📄 License

ISC

---

Built with ❤️ for Vibe Commerce

