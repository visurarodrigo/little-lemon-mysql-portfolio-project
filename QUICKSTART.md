# Quick Start Guide (Local MySQL)

Use this guide to run the project without Docker.

## Prerequisites

- MySQL 8+ installed locally
- Node.js 14+ and npm
- Git

## Setup Steps

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

3. Update `.env` with your local MySQL username and password.

4. Open MySQL and run scripts in order:

```sql
source sql/00_setup.sql;
source sql/01_schema.sql;
source sql/02_seed.sql;
source sql/03_core_queries.sql;
```

5. Install API packages and start server

```bash
npm install
npm run dev
```

API should run at: `http://localhost:3001`

## Verify API

```bash
curl.exe http://localhost:3001/health
curl.exe http://localhost:3001/api/customers
```

## Common Test Request

Create a customer (PowerShell):

```powershell
Invoke-WebRequest -Uri http://localhost:3001/api/customers -Method POST -ContentType "application/json" -Body '{"full_name":"Nimal Perera","phone":"+94701234567"}' -UseBasicParsing | Select-Object -ExpandProperty Content
```

## Stop API

Press `Ctrl + C` in the terminal where API is running.

## Documentation

- `README.md`
- `API_DOCUMENTATION.md`
- `CONTRIBUTING.md`
