# Quick Start Guide

This guide shows the shortest path to running the project locally.

## Requirements

- MySQL 8 or newer
- Node.js 14 or newer
- npm
- Git

## Steps

### 1. Clone the repository

```bash
git clone https://github.com/visurarodrigo/little-lemon-mysql-portfolio-project.git
cd little-lemon-mysql-portfolio-project
```

### 2. Create your environment file

Linux/macOS:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Open `.env` and set your local MySQL username and password.

### 3. Run the SQL scripts

Open MySQL and run these files in order:

```sql
source sql/00_setup.sql;
source sql/01_schema.sql;
source sql/02_seed.sql;
source sql/03_core_queries.sql;
```

Optional practice scripts:

- `sql/04_structure_and_updates.sql`
- `sql/05_subqueries_and_views.sql`
- `sql/06_procedures_and_strings.sql`

### 4. Start the API

```bash
npm install
npm run dev
```

The API should run at `http://localhost:3001`.

## Test the API

```bash
curl.exe http://localhost:3001/health
curl.exe http://localhost:3001/api/customers
```

Create a customer test request:

```powershell
Invoke-WebRequest -Uri http://localhost:3001/api/customers -Method POST -ContentType "application/json" -Body '{"full_name":"Nimal Perera","phone":"+94701234567"}' -UseBasicParsing | Select-Object -ExpandProperty Content
```

## Stop the API

Press `Ctrl + C` in the terminal where the server is running.

## Documentation

- `README.md`
- `API_DOCUMENTATION.md`
- `CONTRIBUTING.md`
