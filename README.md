# API Starter Template

This is a starter template for building an API using Node.js with TypeScript. It includes JWT authentication, email sending with Nodemailer, and an SQLite database.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Endpoints](#endpoints)
- [Authentication](#authentication)
- [Email Sending](#email-sending)
- [Project Structure](#project-structure)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/frtcorreia/nodejs-api-template
   cd api-starter-template
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the root of the project and add the following environment variables:

   ```
   DATABASE_URL=******url******
   PORT=3000
   JWT_SECRET=your_secret_key
   EMAIL_HOST=smtp.example.com
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ENVIRONMENT_URL=when is running
   ```

2. Set up the database:
   ```bash
   npx prisma migrate dev --name init
   ```

### Running the Server

To start the development server, use:

```bash
npm run start
```

## Endpoints

### Authentication

- **POST /auth/register** - Register a new user
- **POST /auth/login** - User login
- **POST /auth/activate** - Activate user account
- **POST /auth/forgot-password** - Initiate password reset process
- **POST /auth/reset-password** - Reset user password

### Todos

- **POST /todos/** - Create a new todo (requires authentication)
- **GET /todos/** - Get all todos (requires authentication)
- **GET /todos/**- Get a specific todo by ID (requires authentication)
- **PUT /todos/**- Update a specific todo by ID (requires authentication)
- **DELETE /todos/**- Delete a specific todo by ID (requires authentication)

### Users

- **GET /user/** - Get user data (requires authentication)
- **PUT /user/** - Update user data (requires authentication)

## Authentication

This API uses JWT (JSON Web Tokens) for authentication. After logging in, a token is returned which should be included in all subsequent requests in the headers as `Authorization: Bearer <your_token>`.

## Email Sending

The email sending functionality is managed by Nodemailer. Make sure to correctly configure the email-related environment variables in the `.env` file.

##

src/

├── controllers/

│   ├── index.ts

│   ├── authController.ts

│   ├── todoController.ts

│   └── userController.ts

├── helpers/

│   └── prismaClient.ts

│   └── tokenGenerator.ts

├── middleware/

│   └── auth.middleware.ts

├── routes/

│   ├── authRoutes.ts

│   ├── todoRoutes.ts

│   └── userRoutes.ts

├── services/

│   └── email.service.ts

├── index.ts

└── server.ts

prisma/

└── schema.prisma

└── deb.dev
