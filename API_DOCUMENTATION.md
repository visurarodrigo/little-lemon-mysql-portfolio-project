# Little Lemon API Documentation

## Overview

This API is a simple student-friendly backend for the Little Lemon database project. It is built with Node.js and Express and connects to MySQL.

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Ensure .env is configured
# Copy from .env.example if needed

# 3. Ensure local MySQL is running and credentials are set in .env

# 4. Start API server
npm run dev
```

Server runs at: `http://localhost:3001`

## Project Layout

```
src/server.js                      # Main server file
├── src/api/
│   ├── db/connection.js          # MySQL connection
│   ├── middleware/
│   │   └── errorHandler.js       # Global error handling
│   ├── controllers/              # Business logic
│   │   ├── customersController.js
│   │   ├── bookingsController.js
│   │   └── menuController.js
│   └── routes/                   # HTTP route handlers
│       ├── customers.js
│       ├── bookings.js
│       └── menu.js
```

## Endpoints

### Base URL
```
http://localhost:3001/api
```

### 1. Customers Resource

#### List all customers
```http
GET /customers
```

**Response:**
```json
[
  {
    "customer_id": 1,
    "full_name": "Keshan Silva",
    "phone": "+94701234567"
  },
  {
    "customer_id": 2,
    "full_name": "Dishan Mendis",
    "phone": "+94765432109"
  }
]
```

#### Get single customer
```http
GET /customers/:id
```

**Response:**
```json
{
  "customer_id": 1,
  "full_name": "Keshan Silva",
  "phone": "+94701234567"
}
```

#### Create customer
```http
POST /customers
Content-Type: application/json

{
  "full_name": "Shanika Perera",
  "phone": "+94721234567"
}
```

**Response (201):**
```json
{
  "customer_id": 3,
  "full_name": "Shanika Perera",
  "phone": "+94721234567"
}
```

#### Update customer
```http
PUT /customers/:id
Content-Type: application/json

{
  "full_name": "Shanika Perera Updated",
  "phone": "+94729999999"
}
```

**Response:**
```json
{
  "message": "Customer updated successfully"
}
```

#### Delete customer
```http
DELETE /customers/:id
```

**Response:**
```json
{
  "message": "Customer deleted successfully"
}
```

---

### 2. Bookings Resource

#### List all bookings
```http
GET /bookings
```

**Response:**
```json
[
  {
    "booking_id": 1,
    "booking_date": "2024-12-25",
    "booking_time": "19:00:00",
    "table_number": 5,
    "number_of_guests": 4,
    "customer_id": 1,
    "full_name": "Keshan Silva",
    "phone": "+94701234567",
    "seating_capacity": 4,
    "created_at": "2024-11-01T10:30:00.000Z"
  }
]
```

#### Get single booking
```http
GET /bookings/:id
```

**Response:**
```json
{
  "booking_id": 1,
  "booking_date": "2024-12-25",
  "booking_time": "19:00:00",
  "table_number": 5,
  "number_of_guests": 4,
  "customer_id": 1,
  "full_name": "Keshan Silva",
  "phone": "+94701234567",
  "seating_capacity": 4,
  "created_at": "2024-11-01T10:30:00.000Z"
}
```

#### Create booking
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

**Response (201):**
```json
{
  "booking_id": 2,
  "booking_date": "2024-12-25",
  "booking_time": "19:00",
  "table_number": 5,
  "number_of_guests": 4,
  "customer_id": 1
}
```

#### Update booking
```http
PUT /bookings/:id
Content-Type: application/json

{
  "booking_time": "20:00",
  "number_of_guests": 5
}
```

**Response:**
```json
{
  "message": "Booking updated successfully"
}
```

#### Cancel booking
```http
DELETE /bookings/:id
```

**Response:**
```json
{
  "message": "Booking deleted successfully"
}
```

---

### 3. Menu Resource

#### List all menu items
```http
GET /menu
```

**Response:**
```json
[
  {
    "item_id": 1,
    "item_name": "Lamprais",
    "category": "Main",
    "cost": "850.00",
    "ingredients": "Rice, meat, curry leaves"
  },
  {
    "item_id": 2,
    "item_name": "Kottu Roti",
    "category": "Main",
    "cost": "550.00",
    "ingredients": "Roti, meat, vegetables"
  }
]
```

#### Filter by category
```http
GET /menu?category=Starter
```

**Valid categories:** Starter, Main, Dessert, Drink

#### Get single menu item
```http
GET /menu/:id
```

#### Add menu item
```http
POST /menu
Content-Type: application/json

{
  "item_name": "Deviled Dishes",
  "category": "Main",
  "cost": 650.00,
  "ingredients": "Chili, onions, Sri Lankan spices"
}
```

**Response (201):**
```json
{
  "item_id": 3,
  "item_name": "Deviled Dishes",
  "category": "Main",
  "cost": 650.00,
  "ingredients": "Chili, onions, Sri Lankan spices"
}
```

#### Update menu item
```http
PUT /menu/:id
Content-Type: application/json

{
  "cost": 700.00
}
```

#### Delete menu item
```http
DELETE /menu/:id
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request succeeded |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Duplicate entry (e.g., phone number) |
| 500 | Internal Server Error |

## Error Handling

The API returns consistent error messages:

```json
{
  "error": "Description of the error"
}
```

**Common errors:**

- `"Customer not found"` - Customer ID doesn't exist
- `"Duplicate entry - resource already exists"` - Phone number already registered
- `"Foreign key constraint violation"` - Referenced resource doesn't exist
- `"All booking fields are required"` - Missing required fields
- `"Invalid category. Must be one of: Starter, Main, Dessert, Drink"` - Invalid menu category

## Testing with cURL

### Create a customer
```bash
curl -X POST http://localhost:3001/api/customers \
  -H "Content-Type: application/json" \
  -d '{"full_name": "Test User", "phone": "+94770000000"}'
```

### List all bookings
```bash
curl http://localhost:3001/api/bookings
```

### Get menu items by category
```bash
curl "http://localhost:3001/api/menu?category=Main"
```

### Update a booking
```bash
curl -X PUT http://localhost:3001/api/bookings/1 \
  -H "Content-Type: application/json" \
  -d '{"number_of_guests": 6}'
```

## Testing with Postman (or similar)

1. Import the API endpoints into Postman
2. Create a collection for each resource
3. Set up authentication if needed
4. Test each CRUD operation

## Environment Configuration

Configure API behavior via `.env`:

```env
# Database
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=lemon_user
MYSQL_PASSWORD=lemon_pass
MYSQL_DATABASE=little_lemon_portfolio

# API
API_PORT=3001
NODE_ENV=development|production
```

## Performance Considerations

- **Connection Pooling**: The API uses a MySQL connection pool (10 concurrent connections)
- **Query Optimization**: JOIN queries for related data retrieval
- **Error Recovery**: Automatic connection release on errors

## Future Enhancements

- [ ] Authentication & Authorization (JWT)
- [ ] Request validation (Joi/Yup)
- [ ] API rate limiting
- [ ] Pagination for large result sets
- [ ] Advanced filtering and sorting
- [ ] API documentation with Swagger/OpenAPI
- [ ] Unit and integration tests
- [ ] GraphQL alternative

## Support

For issues or questions, refer to the main README or create an issue in the repository.
