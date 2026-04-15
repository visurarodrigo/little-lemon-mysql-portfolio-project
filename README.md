# Little Lemon MySQL Project

This is an undergraduate-level restaurant database project built with MySQL and a simple Node.js API.

## Project Scope

- Create and manage a relational database
- Run SQL tasks from basic to intermediate level
- Practice views and stored procedures
- Connect the database to a basic REST API

## Tech Stack

- MySQL 8
- Node.js + Express
- mysql2 + dotenv

## Current Project Structure

```text
src/                 API code
sql/                 SQL scripts (run in order)
outputs/             Query result screenshots
README.md            Main guide
QUICKSTART.md        Fast setup guide
API_DOCUMENTATION.md API endpoint details
CONTRIBUTING.md      Contribution notes
```

## Database

- Database name: `little_lemon_portfolio`
- Main tables:
	- `customers`
	- `dining_tables`
	- `bookings`
	- `menu_items`
	- `delivery_addresses`

ER diagram:

![ER Diagram](ER%20Diagram.jpg)

## Setup (Local MySQL)

1. Clone repository

```bash
git clone https://github.com/visurarodrigo/little-lemon-mysql-portfolio-project.git
cd little-lemon-mysql-portfolio-project
```

2. Create `.env`

Linux/macOS:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

3. Update `.env` with your local MySQL credentials.

4. Run scripts in order:

```sql
source sql/00_setup.sql;
source sql/01_schema.sql;
source sql/02_seed.sql;
source sql/03_core_queries.sql;
```

Optional additional tasks:

- `sql/04_structure_and_updates.sql`
- `sql/05_subqueries_and_views.sql`
- `sql/06_procedures_and_strings.sql`

## Run API

```bash
npm install
npm run dev
```

- Base URL: `http://localhost:3001/api`
- Health: `GET /health`
- Main endpoints: `/customers`, `/bookings`, `/menu`

See `API_DOCUMENTATION.md` for full endpoint examples.

## Environment Variables

Copy `.env.example` and set values:

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=your_mysql_user
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=little_lemon_portfolio
API_PORT=3001
NODE_ENV=development
```

## Learning Outcomes

- SQL filtering, joins, and grouping
- Table updates and schema changes
- Subqueries, views, and procedures
- Building a beginner-friendly API over MySQL

## Output Screenshots

All SQL task screenshots are in `outputs/`.

## License

MIT License. See `LICENSE`.
