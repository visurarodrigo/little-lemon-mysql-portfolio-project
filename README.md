# Little Lemon MySQL Portfolio Project

Little Lemon is a restaurant management database project built with MySQL and exposed through a Node.js and Express REST API. The repository demonstrates schema design, data seeding, query patterns, and API-based data access in a single, reproducible local setup.

## Highlights

- Normalized relational schema for core restaurant operations
- SQL scripts for setup, schema creation, seed data, and query exercises
- REST API for customers, bookings, and menu resources
- Local environment configuration via `.env`

## Technology Stack

- MySQL 8+
- Node.js + Express
- mysql2
- dotenv

## Project Structure

```text
src/                 API source code
sql/                 SQL scripts (execute in sequence)
outputs/             Query result screenshots
README.md            Project overview and setup
QUICKSTART.md        Fast start instructions
API_DOCUMENTATION.md API endpoint details
CONTRIBUTING.md      Contribution guidelines
```

## Database Overview

- Database: `little_lemon_portfolio`
- Core tables:
	- `customers`
	- `dining_tables`
	- `bookings`
	- `menu_items`
	- `delivery_addresses`

ER diagram:

![ER Diagram](ER%20Diagram.jpg)

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/visurarodrigo/little-lemon-mysql-portfolio-project.git
cd little-lemon-mysql-portfolio-project
```

### 2. Create environment file

Linux/macOS:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Update `.env` with your local MySQL credentials.

### 3. Initialize database

Run scripts in this order:

```sql
source sql/00_setup.sql;
source sql/01_schema.sql;
source sql/02_seed.sql;
source sql/03_core_queries.sql;
```

Optional advanced SQL scripts:

- `sql/04_structure_and_updates.sql`
- `sql/05_subqueries_and_views.sql`
- `sql/06_procedures_and_strings.sql`

### 4. Start the API

```bash
npm install
npm run dev
```

## API Access

- Base URL: `http://localhost:3001/api`
- Health endpoint: `GET /health`
- Main resources:
	- `/customers`
	- `/bookings`
	- `/menu`

For complete request and response examples, see `API_DOCUMENTATION.md`.

## Environment Variables

Required values in `.env`:

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=your_mysql_user
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=little_lemon_portfolio
API_PORT=3001
NODE_ENV=development
```

## SQL Coverage

The SQL scripts include:

- Filtering, joins, and aggregations
- Data updates and schema changes
- Subqueries and views
- Stored procedures and string handling

## Artifacts

Query output screenshots are available in `outputs/`.

## License

This project is licensed under the MIT License. See `LICENSE` for details.
