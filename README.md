# API Starter Template

This is a starter template for building an API using Node.js with TypeScript. It includes JWT authentication, email sending with Nodemailer, and an SQLite database.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Endpoints](#endpoints)
- [Authentication](#authentication)
- [Email Sending](#email-sending)
- [Project Structure](#project-structure)
- [License](#license)

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

## Running the Server

To start the development server, use:

```bash
npm run dev
```

## MORE INFO SOON
