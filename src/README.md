# Source Folder

This folder contains the application code for the Little Lemon API.

## Contents

- `server.js` - Main entry point for the Express server
- `public/` - Static dashboard UI files (HTML, CSS, JavaScript)
- `api/` - API code organized by purpose
  - `controllers/` - Request handling and database logic
  - `routes/` - API route definitions
  - `middleware/` - Error handling and shared middleware
  - `db/` - MySQL connection setup

## Notes

- Start the app from the project root with `npm run dev`
- The server reads settings from `.env`
- The root URL (`/`) serves the dashboard UI from `src/public/`
- Keep new API code inside this folder to stay organized
