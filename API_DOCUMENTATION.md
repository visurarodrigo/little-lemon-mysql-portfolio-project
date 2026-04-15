# Little Lemon API Documentation

This document describes the REST API used by the Little Lemon MySQL project.

## Overview

The API is built with Node.js and Express. It connects to the local MySQL database and provides basic CRUD operations for customers, bookings, and menu items.

## Base URL

```text
http://localhost:3001/api
```

## Running the API

1. Make sure MySQL is running locally.
2. Configure `.env` with your local database credentials.
3. Install dependencies and start the server.

```bash
npm install
npm run dev
```

Health check:

```text
GET /health
```

## Project Layout

```text
src/server.js
src/api/db/connection.js
src/api/middleware/errorHandler.js
src/api/controllers/
src/api/routes/
```

## General Notes

- All requests and responses use JSON.
- The API returns a 404 response for routes that do not exist.
- Database errors are handled in the error middleware.

## Resources

### 1. Customers

Base path:

```text
/customers
```

#### Get all customers

```http
GET /customers
```

#### Get one customer

```http
GET /customers/:id
```

#### Create a customer

```http
POST /customers
Content-Type: application/json

{
  "full_name": "Nimal Perera",
  "phone": "+94701234567"
}
```

#### Update a customer

```http
PUT /customers/:id
Content-Type: application/json

{
  "full_name": "Nimal Perera",
  "phone": "+94709999999"
}
```

#### Delete a customer

```http
DELETE /customers/:id
```

### 2. Bookings

Base path:

```text
/bookings
```

#### Get all bookings

```http
GET /bookings
```

#### Get one booking

```http
GET /bookings/:id
```

#### Create a booking

```http
POST /bookings
Content-Type: application/json

{
  "booking_date": "2024-12-25",
  "booking_time": "19:00",
  "table_number": 5,
  "number_of_guests": 4,
  "customer_id": 1
}
```

#### Update a booking

```http
PUT /bookings/:id
Content-Type: application/json

{
  "booking_time": "20:00",
  "number_of_guests": 5
}
```

#### Delete a booking

```http
DELETE /bookings/:id
```

### 3. Menu

Base path:

```text
/menu
```

#### Get all menu items

```http
GET /menu
```

#### Filter menu items by category

```http
GET /menu?category=Main
```

Valid categories:

- Starter
- Main
- Dessert
- Drink

#### Get one menu item

```http
GET /menu/:id
```

#### Create a menu item

```http
POST /menu
Content-Type: application/json

{
  "item_name": "Lamprais",
  "category": "Main",
  "cost": 850.00,
  "ingredients": "Rice, meat, curry leaves"
}
```

#### Update a menu item

```http
PUT /menu/:id
Content-Type: application/json

{
  "cost": 900.00
}
```

#### Delete a menu item

```http
DELETE /menu/:id
```

## Example Responses

### Success

```json
{
  "message": "Customer updated successfully"
}
```

### Error

```json
{
  "error": "Route not found"
}
```

Common error responses:

- `400` - Invalid or missing input
- `404` - Resource not found
- `409` - Duplicate entry
- `500` - Server error

## Example API Calls

### List customers

```bash
curl.exe http://localhost:3001/api/customers
```

### Add a customer

```powershell
Invoke-WebRequest -Uri http://localhost:3001/api/customers -Method POST -ContentType "application/json" -Body '{"full_name":"Nimal Perera","phone":"+94701234567"}' -UseBasicParsing | Select-Object -ExpandProperty Content
```

### List bookings

```bash
curl.exe http://localhost:3001/api/bookings
```

### List menu items

```bash
curl.exe http://localhost:3001/api/menu
```

## Environment Variables

Set these values in `.env`:

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=your_mysql_user
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=little_lemon_portfolio
API_PORT=3001
NODE_ENV=development
```

## Testing

Recommended checks:

1. Start the API with `npm run dev`.
2. Open `http://localhost:3001/health`.
3. Test each endpoint with cURL or Postman.

## Support

For setup instructions, see [README.md](README.md). For a shorter checklist, see [QUICKSTART.md](QUICKSTART.md).
